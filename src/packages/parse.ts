export type Units = {
  y: number;
  mo: number;
  w: number;
  d: number;
  h: number;
  m: number;
  s: number;
  ms: number;
  us: number;
  ns: number;
  [key: string]: number;
};

export const durationRE = /(\d+(?:\.\d+)?)(y|mo|w|d|h|m|s|ms|us|ns)/g;

export const units: Units = {
  y: 31557600000,
  mo: 2629800000,
  w: 604800000,
  d: 86400000,
  h: 3600000,
  m: 60000,
  s: 1000,
  ms: 1,
  us: 1e-3,
  ns: 1e-6,
};

export function parse(str?: string, format: keyof Units = "ms"): number | null {
  if (!str) return null;
  let totalMs = 0;
  let match;

  while ((match = durationRE.exec(str)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2];
    if (!units[unit]) return null;
    totalMs += value * units[unit];
  }

  return totalMs ? totalMs / (units[format] || 1) : null;
}

export default parse;
