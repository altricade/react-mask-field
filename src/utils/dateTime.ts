/**
 * Pure validation helpers for DateInput / TimeInput. They operate on raw mask
 * values (only the characters that fill pattern slots), replace characters in
 * place and never change the length — so the caret position stays valid.
 * Only complete segments are clamped, so partially typed values are untouched.
 */

export type DateOrder = 'MDY' | 'DMY' | 'YMD';

type DatePart = 'M' | 'D' | 'Y';

const PART_LENGTH: Readonly<Record<DatePart, number>> = { M: 2, D: 2, Y: 4 };

const ORDER_PARTS: Readonly<Record<DateOrder, readonly [DatePart, DatePart, DatePart]>> = {
  MDY: ['M', 'D', 'Y'],
  DMY: ['D', 'M', 'Y'],
  YMD: ['Y', 'M', 'D'],
};

/** A leap year, used when the year is not fully typed yet so Feb 29 stays allowed. */
const LEAP_YEAR = 2000;

export function daysInMonth(month: number, year: number): number {
  // Day 0 of the next month is the last day of this month. Date.UTC maps years
  // 0-99 to 1900-1999, so use setUTCFullYear to keep small years literal.
  const date = new Date(Date.UTC(2000, 0, 1));
  date.setUTCFullYear(year, month, 0);
  return date.getUTCDate();
}

interface Segment {
  readonly start: number;
  readonly text: string;
}

function segmentOf(raw: string, order: DateOrder, part: DatePart): Segment {
  const parts = ORDER_PARTS[order];
  const start = parts
    .slice(0, parts.indexOf(part))
    .reduce((sum, previous) => sum + PART_LENGTH[previous], 0);
  return { start, text: raw.slice(start, start + PART_LENGTH[part]) };
}

function replaceAt(raw: string, start: number, text: string): string {
  return raw.slice(0, start) + text + raw.slice(start + text.length);
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * Clamp a raw date (digits only, e.g. `"02302023"` for MDY) to a valid
 * calendar date: month 01-12, day 01-(days in month). Feb 29 is kept until the
 * year is complete, then clamped to 28 for non-leap years.
 */
export function clampDateDigits(raw: string, order: DateOrder): string {
  const M = segmentOf(raw, order, 'M');
  const D = segmentOf(raw, order, 'D');
  const Y = segmentOf(raw, order, 'Y');
  let result = raw;

  let month: number | null = null;
  if (M.text.length === 2) {
    month = Math.min(Math.max(Number(M.text), 1), 12);
    result = replaceAt(result, M.start, pad2(month));
  }

  if (D.text.length === 2) {
    const year = Y.text.length === 4 ? Number(Y.text) : LEAP_YEAR;
    const maxDay = month === null ? 31 : daysInMonth(month, year);
    const day = Math.min(Math.max(Number(D.text), 1), maxDay);
    result = replaceAt(result, D.start, pad2(day));
  }

  return result;
}

export type TimeFormat = '12h' | '24h';

/**
 * Clamp a raw time (`HHMM[SS][AM]`, e.g. `"2599"` or `"1375pm"`):
 * hours 00-23 (24h) or 01-12 (12h, `00` becomes `12`), minutes and seconds
 * 00-59, and the AM/PM letters upper-cased.
 */
export function clampTimeRaw(raw: string, format: TimeFormat, showSeconds: boolean): string {
  let result = raw;

  const hours = raw.slice(0, 2);
  if (hours.length === 2) {
    const value = Number(hours);
    const clamped = format === '24h' ? Math.min(value, 23) : value === 0 ? 12 : Math.min(value, 12);
    result = replaceAt(result, 0, pad2(clamped));
  }

  const clampSixty = (start: number) => {
    const text = raw.slice(start, start + 2);
    if (text.length === 2) result = replaceAt(result, start, pad2(Math.min(Number(text), 59)));
  };
  clampSixty(2);
  if (showSeconds) clampSixty(4);

  if (format === '12h') {
    const periodStart = showSeconds ? 6 : 4;
    result = result.slice(0, periodStart) + result.slice(periodStart).toUpperCase();
  }

  return result;
}
