<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TimeInflationService
{
    private string $inflationIndicator = 'FP.CPI.TOTL.ZG';
    private string $wageIndicator = 'EAR_EHRA_SEX_NB_A';
    private string $wageSex = 'SEX_T';
    private string $worldRefArea = 'X01';

    public function calculate(string $countryIso, float $hoursPerDay, int $yearsEnd): array
    {
        $traceId = bin2hex(random_bytes(8));
        $debugEnabled = app()->isLocal();

        $countryIso3 = $this->normalizeIso3($countryIso);

        $yearsStart = $yearsEnd - 3;
        $chartYears = range($yearsStart, $yearsEnd);
        $wageYearsFrom = $yearsStart - 1;
        $wageYearsTo = $yearsEnd;

        $inflationError = null;
        $countryWageError = null;
        $worldRefWageError = null;
        $globalAvgWageError = null;

        if ($debugEnabled) {
            Log::info('time_inflation.calculate.start', [
                'traceId' => $traceId,
                'countryIsoInput' => $countryIso,
                'countryIso3' => $countryIso3,
                'hoursPerDay' => $hoursPerDay,
                'yearsEnd' => $yearsEnd,
                'yearsStart' => $yearsStart,
            ]);
        }

        try {
            $inflation = $this->fetchWorldBankInflationSeries($countryIso3, $yearsStart, $yearsEnd);
        } catch (\Throwable $e) {
            $inflationError = $e->getMessage();

            if ($debugEnabled) {
                Log::error('time_inflation.worldbank.inflation_failed', [
                    'traceId' => $traceId,
                    'countryIso3' => $countryIso3,
                    'yearsStart' => $yearsStart,
                    'yearsEnd' => $yearsEnd,
                    'error' => $inflationError,
                ]);
            }

            return [
                'success' => false,
                'message' => 'World Bank inflation fetch failed.',
                'debug' => $debugEnabled ? [
                    'traceId' => $traceId,
                    'countryIso3' => $countryIso3,
                    'inflationError' => $inflationError,
                ] : null,
            ];
        }

        $missingInflationYears = array_values(array_filter($chartYears, fn (int $y): bool => !array_key_exists($y, $inflation)));

        $wageLevelsCountry = [];
        $wageGrowthCountry = [];
        $countryWageFetchFailed = false;
        try {
            $wageLevelsCountry = $this->fetchIlostatWageLevels($this->wageIndicator, $countryIso3, $this->wageSex, $wageYearsFrom, $wageYearsTo);
            $wageGrowthCountry = $this->computeNominalWageGrowthPercent($wageLevelsCountry, $chartYears);
        } catch (\Throwable $e) {
            $countryWageFetchFailed = true;
            $countryWageError = $e->getMessage();

            if ($debugEnabled) {
                Log::warning('time_inflation.ilostat.country_wages_failed', [
                    'traceId' => $traceId,
                    'countryIso3' => $countryIso3,
                    'yearsFrom' => $wageYearsFrom,
                    'yearsTo' => $wageYearsTo,
                    'error' => $countryWageError,
                ]);
            }
        }

        $missingWageYearsCountry = array_values(array_filter($chartYears, fn (int $y): bool => !array_key_exists($y, $wageGrowthCountry)));

        $countryHasAll = !$countryWageFetchFailed
            && $this->hasAllYears($wageGrowthCountry, $chartYears)
            && $this->hasAllYears($inflation, $chartYears);

        $fallbackUsed = !$countryHasAll;

        $usedWorldSource = null;
        $usedWageSource = 'ILOSTAT_country';
        $usedWageGrowth = $wageGrowthCountry;

        if ($fallbackUsed) {
            $usedWorldSource = 'ILOSTAT_world_ref_area';
            $worldNominalGrowth = [];

            try {
                $wageLevelsWorld = $this->fetchIlostatWageLevels($this->wageIndicator, $this->worldRefArea, $this->wageSex, $wageYearsFrom, $wageYearsTo);
                $worldNominalGrowth = $this->computeNominalWageGrowthPercent($wageLevelsWorld, $chartYears);
            } catch (\Throwable $e) {
                $worldRefWageError = $e->getMessage();
                $worldNominalGrowth = [];

                if ($debugEnabled) {
                    Log::warning('time_inflation.ilostat.world_ref_area_failed', [
                        'traceId' => $traceId,
                        'yearsFrom' => $wageYearsFrom,
                        'yearsTo' => $wageYearsTo,
                        'error' => $worldRefWageError,
                    ]);
                }
            }

            if (!$this->hasAllYears($worldNominalGrowth, $chartYears)) {
                $usedWorldSource = 'ILOSTAT_global_average_all_countries';
                try {
                    $wageLevelsWorld = $this->fetchIlostatGlobalAverageLevels($this->wageIndicator, $this->wageSex, $wageYearsFrom, $wageYearsTo);
                    $worldNominalGrowth = $this->computeNominalWageGrowthPercent($wageLevelsWorld, $chartYears);
                } catch (\Throwable $e) {
                    $globalAvgWageError = $e->getMessage();
                    $worldNominalGrowth = [];

                    if ($debugEnabled) {
                        Log::warning('time_inflation.ilostat.global_average_failed', [
                            'traceId' => $traceId,
                            'yearsFrom' => $wageYearsFrom,
                            'yearsTo' => $wageYearsTo,
                            'error' => $globalAvgWageError,
                        ]);
                    }
                }
            }

            if (!$this->hasAllYears($worldNominalGrowth, $chartYears)) {
                return [
                    'success' => false,
                    'message' => 'Wage data is missing for all available fallbacks for the requested window.',
                ];
            }

            $usedWageSource = 'ILOSTAT_fallback_' . $usedWorldSource;
            $usedWageGrowth = $worldNominalGrowth;
        }

        $rows = [];
        $cpiIndex = [];
        $earningsIndex = [];
        $realIndex = [];
        $hoursNeeded = [];

        foreach ($chartYears as $y) {
            $cpiIndex[$y] = null;
            $earningsIndex[$y] = null;
            $realIndex[$y] = null;
            $hoursNeeded[$y] = null;
        }

        $startYear = $yearsStart;
        $cpiIndex[$startYear] = 100.0;
        $earningsIndex[$startYear] = 100.0;
        $realIndex[$startYear] = 100.0;
        $hoursNeeded[$startYear] = $hoursPerDay;

        for ($i = 0; $i < count($chartYears); $i++) {
            $y = $chartYears[$i];
            $infl = array_key_exists($y, $inflation) ? $inflation[$y] : null;
            $gw = array_key_exists($y, $usedWageGrowth) ? $usedWageGrowth[$y] : null;

            $prevY = $y - 1;
            if ($y > $startYear) {
                $prevHours = $hoursNeeded[$prevY] ?? null;
                $prevCpi = $cpiIndex[$prevY] ?? null;
                $prevEarn = $earningsIndex[$prevY] ?? null;
                $prevReal = $realIndex[$prevY] ?? null;

                if ($infl !== null && $gw !== null && $prevHours !== null) {
                    $wageFactor = 1.0 + $gw / 100.0;
                    if ($wageFactor != 0.0) {
                        $hoursNeeded[$y] = $prevHours * ((1.0 + $infl / 100.0) / $wageFactor);
                    }
                }

                if ($infl !== null && $prevCpi !== null) {
                    $cpiIndex[$y] = $prevCpi * (1.0 + $infl / 100.0);
                }

                if ($gw !== null && $prevEarn !== null) {
                    $earningsIndex[$y] = $prevEarn * (1.0 + $gw / 100.0);
                }

                if ($infl !== null && $gw !== null && $prevReal !== null && (1.0 + $infl / 100.0) != 0.0) {
                    $realIndex[$y] = $prevReal * ((1.0 + $gw / 100.0) / (1.0 + $infl / 100.0));
                }
            }

            $diff = null;
            $lostPp = null;
            $realGrowth = null;
            if ($infl !== null && $gw !== null) {
                $diff = $gw - $infl;
                $lostPp = $diff < 0;

                $infFactor = 1.0 + $infl / 100.0;
                if ($infFactor != 0.0) {
                    $realGrowth = ((1.0 + $gw / 100.0) / $infFactor - 1.0) * 100.0;
                }
            }

            $extraHours = $hoursNeeded[$y] !== null ? $hoursNeeded[$y] - $hoursPerDay : null;

            $rows[] = [
                'year' => $y,
                'inflation_pct' => $infl,
                'wage_growth_nominal_pct' => $gw,
                'diff_pct' => $diff,
                'lost_pp' => $lostPp,
                'real_wage_growth_pct' => $realGrowth,
                'cpi_index' => $cpiIndex[$y],
                'earnings_index' => $earningsIndex[$y],
                'real_index' => $realIndex[$y],
                'hours_needed_per_day' => $hoursNeeded[$y],
                'extra_hours_per_day' => $extraHours,
            ];
        }

        $pastHoursForBasket = $hoursNeeded[$yearsStart] ?? null;
        $todayHoursForBasket = $hoursNeeded[$yearsEnd] ?? null;

        $cpiChangePct = $cpiIndex[$yearsEnd] !== null ? ($cpiIndex[$yearsEnd] / 100.0 - 1.0) * 100.0 : null;
        $earningsChangePct = $earningsIndex[$yearsEnd] !== null ? ($earningsIndex[$yearsEnd] / 100.0 - 1.0) * 100.0 : null;
        $realChangePct = $realIndex[$yearsEnd] !== null ? ($realIndex[$yearsEnd] / 100.0 - 1.0) * 100.0 : null;

        if ($debugEnabled) {
            Log::info('time_inflation.decision', [
                'traceId' => $traceId,
                'countryIso3' => $countryIso3,
                'countryHasAll' => $countryHasAll,
                'fallbackUsed' => $fallbackUsed,
                'usedWageSource' => $usedWageSource,
                'missingInflationYears' => $missingInflationYears,
                'missingWageYearsCountry' => $missingWageYearsCountry,
            ]);
        }

        return [
            'success' => true,
            'yearsStart' => $yearsStart,
            'yearsEnd' => $yearsEnd,
            'chartYears' => $chartYears,
            'usedWageSource' => $usedWageSource,
            'missingWageYears' => $missingWageYearsCountry,
            'missingInflationYears' => $missingInflationYears,
            'cpiChangePct' => $cpiChangePct,
            'earningsChangePct' => $earningsChangePct,
            'realChangePct' => $realChangePct,
            'pastHoursForBasket' => $pastHoursForBasket,
            'todayHoursForBasket' => $todayHoursForBasket,
            'rows' => $rows,
            'debug' => $debugEnabled ? [
                'traceId' => $traceId,
                'countryIso3' => $countryIso3,
                'countryWageFetchFailed' => $countryWageFetchFailed,
                'inflationError' => $inflationError,
                'countryWageError' => $countryWageError,
                'worldRefWageError' => $worldRefWageError,
                'globalAvgWageError' => $globalAvgWageError,
                'countryHasAll' => $countryHasAll,
                'fallbackUsed' => $fallbackUsed,
                'usedWageSource' => $usedWageSource,
                'missingWageYearsCountry' => $missingWageYearsCountry,
                'missingInflationYears' => $missingInflationYears,
            ] : null,
        ];
    }

    private function normalizeIso3(string $countryIso): string
    {
        $code = strtoupper(trim($countryIso));
        if (strlen($code) === 3) {
            return $code;
        }

        if (strlen($code) !== 2) {
            return $code;
        }

        try {
            $resp = Http::timeout(15)->withHeaders(['User-Agent' => 'Mozilla/5.0'])->get("https://restcountries.com/v3.1/alpha/{$code}?fields=cca3");
            if ($resp->ok()) {
                $data = $resp->json();

                if (is_array($data)) {
                    if (isset($data['cca3']) && is_string($data['cca3'])) {
                        return strtoupper($data['cca3']);
                    }

                    if (isset($data[0]['cca3']) && is_string($data[0]['cca3'])) {
                        return strtoupper($data[0]['cca3']);
                    }
                }
            }
        } catch (\Throwable) {
        }

        return $code;
    }

    private function fetchWorldBankInflationSeries(string $countryIso3, int $yearFrom, int $yearTo): array
    {
        $url = "https://api.worldbank.org/v2/country/{$countryIso3}/indicator/{$this->inflationIndicator}?format=json&per_page=200";
        $resp = Http::timeout(30)->withHeaders(['User-Agent' => 'Mozilla/5.0'])->get($url);
        if (!$resp->ok()) {
            throw new \RuntimeException('World Bank request failed.');
        }

        $obj = $resp->json();
        $rows = is_array($obj) && isset($obj[1]) && is_array($obj[1]) ? $obj[1] : [];
        $out = [];
        foreach ($rows as $r) {
            $y = $r['date'] ?? null;
            $v = $r['value'] ?? null;
            if ($y === null || $v === null) {
                continue;
            }
            $yi = (int) $y;
            if ($yi < $yearFrom || $yi > $yearTo) {
                continue;
            }
            if (!is_numeric($v)) {
                continue;
            }
            $out[$yi] = (float) $v;
        }

        return $out;
    }

    private function fetchIlostatWageLevels(string $indicatorId, string $refArea, string $sex, int $yearFrom, int $yearTo): array
    {
        $params = [
            'id' => $indicatorId,
            'ref_area' => $refArea,
            'sex' => $sex,
            'timefrom' => (string) $yearFrom,
            'timeto' => (string) $yearTo,
            'format' => '.json',
        ];

        $url = 'https://rplumber.ilo.org/data/indicator?' . http_build_query($params);
        $resp = Http::timeout(60)->withHeaders(['User-Agent' => 'Mozilla/5.0'])->get($url);
        if (!$resp->ok()) {
            throw new \RuntimeException('ILOSTAT request failed.');
        }

        $obj = $resp->json();
        $times = $obj['time'] ?? [];
        $values = $obj['obs_value'] ?? [];
        $statuses = $obj['obs_status'] ?? [];

        $out = [];
        for ($i = 0; $i < count($times); $i++) {
            $t = $times[$i];
            if ($t === null) {
                continue;
            }
            $yi = (int) $t;
            if ($yi < $yearFrom || $yi > $yearTo) {
                continue;
            }
            $v = $values[$i] ?? null;
            $s = $statuses[$i] ?? '';
            if ($v === null || $v === '') {
                continue;
            }
            if (!is_numeric($v)) {
                continue;
            }
            $out[$yi] = [
                'value' => (float) $v,
                'obs_status' => is_string($s) ? $s : '',
            ];
        }

        return $out;
    }

    private function fetchIlostatGlobalAverageLevels(string $indicatorId, string $sex, int $yearFrom, int $yearTo): array
    {
        $params = [
            'id' => $indicatorId,
            'sex' => $sex,
            'timefrom' => (string) $yearFrom,
            'timeto' => (string) $yearTo,
            'format' => '.json',
        ];

        $url = 'https://rplumber.ilo.org/data/indicator?' . http_build_query($params);
        $resp = Http::timeout(60)->withHeaders(['User-Agent' => 'Mozilla/5.0'])->get($url);
        if (!$resp->ok()) {
            throw new \RuntimeException('ILOSTAT global-average request failed.');
        }

        $obj = $resp->json();
        $times = $obj['time'] ?? [];
        $values = $obj['obs_value'] ?? [];

        $byYear = [];
        for ($i = 0; $i < count($times); $i++) {
            $t = $times[$i];
            if ($t === null) {
                continue;
            }
            $yi = (int) $t;
            if ($yi < $yearFrom || $yi > $yearTo) {
                continue;
            }
            $v = $values[$i] ?? null;
            if ($v === null || $v === '' || !is_numeric($v)) {
                continue;
            }
            $byYear[$yi][] = (float) $v;
        }

        $out = [];
        foreach ($byYear as $y => $vals) {
            if (count($vals) === 0) {
                continue;
            }
            $out[(int) $y] = [
                'value' => array_sum($vals) / count($vals),
                'obs_status' => '',
            ];
        }

        return $out;
    }

    private function computeNominalWageGrowthPercent(array $wageLevelsByYear, array $chartYears): array
    {
        $out = [];
        foreach ($chartYears as $y) {
            $prevY = $y - 1;
            if (!array_key_exists($y, $wageLevelsByYear) || !array_key_exists($prevY, $wageLevelsByYear)) {
                continue;
            }
            $vPrev = $wageLevelsByYear[$prevY]['value'] ?? null;
            $v = $wageLevelsByYear[$y]['value'] ?? null;
            if ($vPrev === null || $v === null) {
                continue;
            }
            if ((float) $vPrev === 0.0) {
                continue;
            }
            $out[$y] = ((float) $v / (float) $vPrev - 1.0) * 100.0;
        }

        return $out;
    }

    private function hasAllYears(array $mapYearToValue, array $years): bool
    {
        foreach ($years as $y) {
            if (!array_key_exists($y, $mapYearToValue)) {
                return false;
            }
        }
        return true;
    }
}

