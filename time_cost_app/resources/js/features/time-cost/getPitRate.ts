import pitCsv from "../../assets/headline-pit.csv?raw";
import { getCountryName } from "../../shared/components/CountrySelect";

const FALLBACK_PERCENT = 30;
const MIN_PERCENT = 0;
const MAX_PERCENT = 60;

const MANUAL_ISO_TO_PIT_TERRITORY: Record<string, string> = {
  US: "United States",
  KR: "Korea, Republic of",
  CN: "China, People's Republic of",
  HK: "Hong Kong SAR",
  MO: "Macau SAR",
  CZ: "Czech Republic",
  SK: "Slovak Republic",
  GB: "United Kingdom",
  UK: "United Kingdom",
  BN: "Brunei Darussalam",
  LC: "Saint Lucia",
  TT: "Trinidad and Tobago",
  BA: "Bosnia and Herzegovina",
  CG: "Congo, Republic of",
  CD: "Congo, Democratic Republic of the",
  MM: "Myanmar",
  CI: "Ivory Coast (Côte d'Ivoire)",
};

function normalizeCountryName(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/'/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function parsePitLine(line: string): [string, number] | null {
  const t = line.trim();

  if (!t) {
    return null;
  }

  let territory: string;
  let rest: string;

  if (t.startsWith('"')) {
    let end = 1;

    while (end < t.length) {
      if (t[end] === '"') {
        if (t[end + 1] === '"') {
          end += 2;
          continue;
        }

        break;
      }

      end++;
    }

    if (end >= t.length || t[end] !== '"') {
      return null;
    }

    territory = t.slice(1, end).replace(/""/g, '"');

    if (t[end + 1] !== ",") {
      return null;
    }

    rest = t.slice(end + 2);
  } else {
    const c = t.indexOf(",");

    if (c === -1) {
      return null;
    }

    territory = t.slice(0, c).trim();
    rest = t.slice(c + 1);
  }

  const rate = Number(rest.trim());

  if (!Number.isFinite(rate)) {
    return null;
  }

  return [territory, rate];
}

function parsePitCsv(text: string): Map<string, number> {
  const map = new Map<string, number>();
  const lines = text.trim().split(/\r?\n/);
  let started = false;

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    if (!started) {
      if (line.includes("Territory") && line.includes("Headline")) {
        started = true;
      }

      continue;
    }

    const parsed = parsePitLine(line);

    if (!parsed) {
      continue;
    }

    const [territory, rate] = parsed;
    map.set(normalizeCountryName(territory), rate);
  }

  return map;
}

let cachedMap: Map<string, number> | null = null;

function getPitMap(): Map<string, number> {
  if (!cachedMap) {
    cachedMap = parsePitCsv(pitCsv);
  }

  return cachedMap;
}

function clampPercent(n: number): number {
  return Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, n));
}

export type PitRateInfo = {
  percent: number;
  usedFallback: boolean;
};

export function getPitRateInfo(countryCode: string): PitRateInfo {
  if (!countryCode?.trim()) {
    return { percent: clampPercent(FALLBACK_PERCENT), usedFallback: true };
  }

  const code = countryCode.trim().toUpperCase();
  const map = getPitMap();
  const manual = MANUAL_ISO_TO_PIT_TERRITORY[code];

  if (manual !== undefined) {
    const p = map.get(normalizeCountryName(manual));

    if (p !== undefined) {
      return { percent: clampPercent(p), usedFallback: false };
    }
  }

  const name = getCountryName(code);

  if (name === "—") {
    return { percent: clampPercent(FALLBACK_PERCENT), usedFallback: true };
  }

  if (name === code && code.length === 2) {
    return { percent: clampPercent(FALLBACK_PERCENT), usedFallback: true };
  }

  const p = map.get(normalizeCountryName(name));

  if (p !== undefined) {
    return { percent: clampPercent(p), usedFallback: false };
  }

  return { percent: clampPercent(FALLBACK_PERCENT), usedFallback: true };
}

export function getPitPercentForCountryCode(countryCode: string): number {
  return getPitRateInfo(countryCode).percent;
}
