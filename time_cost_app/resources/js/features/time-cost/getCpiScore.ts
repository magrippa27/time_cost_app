import cpiCsv from "../../assets/cpi.csv?raw";
import { getCountryName } from "../../shared/components/CountrySelect";

const FALLBACK = 42;

const MANUAL_ISO_TO_CSV_NAME: Record<string, string> = {
  US: "United States of America",
  KR: "Korea, South",
  KP: "Korea, North",
  HK: "Hong Kong",
  BN: "Brunei Darussalam",
  VC: "Saint Vincent and the Grenadines",
  LC: "Saint Lucia",
  ST: "Sao Tome and Principe",
  CI: "Cote d'Ivoire",
  TT: "Trinidad and Tobago",
  BA: "Bosnia and Herzegovina",
  CG: "Congo",
  CD: "Democratic Republic of the Congo",
  MM: "Myanmar",
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

function parseCpiCsv(text: string): Map<string, number> {
  const map = new Map<string, number>();
  const lines = text.trim().split(/\r?\n/);

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (!line.trim()) {
continue;
}

    const firstComma = line.indexOf(",");

    if (firstComma === -1) {
continue;
}

    const score = Number(line.slice(0, firstComma));

    if (!Number.isFinite(score)) {
continue;
}

    let country = line.slice(firstComma + 1);

    if (country.startsWith('"')) {
      country = country.slice(1, -1).replace(/""/g, '"');
    }

    map.set(normalizeCountryName(country), score);
  }

  return map;
}

let cachedMap: Map<string, number> | null = null;

function getCpiMap(): Map<string, number> {
  if (!cachedMap) {
    cachedMap = parseCpiCsv(cpiCsv);
  }

  return cachedMap;
}

export function getCpiScoreForCountryCode(countryCode: string): number {
  if (!countryCode?.trim()) {
    return FALLBACK;
  }

  const code = countryCode.trim().toUpperCase();
  const map = getCpiMap();
  const manual = MANUAL_ISO_TO_CSV_NAME[code];

  if (manual !== undefined) {
    const manualScore = map.get(normalizeCountryName(manual));

    if (manualScore !== undefined) {
      return manualScore;
    }
  }

  const name = getCountryName(code);

  if (name === "—") {
    return FALLBACK;
  }

  if (name === code && code.length === 2) {
    return FALLBACK;
  }

  const score = map.get(normalizeCountryName(name));

  if (score !== undefined) {
    return score;
  }

  return FALLBACK;
}
