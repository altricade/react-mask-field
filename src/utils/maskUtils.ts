import type { FormatChars } from '../types';

/**
 * Pure, framework-agnostic mask engine.
 *
 * Model: a mask is parsed once into a list of slots (fixed literals and
 * pattern positions). The *raw* value is the sequence of characters that fill
 * the pattern slots, contiguous from the first one. The *display* value is
 * derived from the raw value. Positions in the display string map 1:1 to slot
 * indices, which is what makes caret arithmetic exact.
 */

export type MaskSlot =
  | { readonly kind: 'literal'; readonly char: string }
  | { readonly kind: 'pattern'; readonly test: RegExp };

export interface ParsedMask {
  readonly slots: readonly MaskSlot[];
  /** Slot index of every pattern slot, in order. Its length is the raw capacity. */
  readonly patternPositions: readonly number[];
  /** Literal text that precedes the first pattern slot (e.g. `+1 (`). */
  readonly prefix: string;
}

export type DeleteDirection = 'backward' | 'forward';

const DEFAULT_FORMAT_CHARS: Readonly<FormatChars> = Object.freeze({
  '9': '[0-9]',
  a: '[A-Za-z]',
  '*': '[A-Za-z0-9]',
});

/** Returns a fresh copy of the default format characters. */
export function getDefaultFormatChars(): FormatChars {
  return { ...DEFAULT_FORMAT_CHARS };
}

/** The shared, frozen default — use as a stable default to keep memoisation intact. */
export const defaultFormatChars = DEFAULT_FORMAT_CHARS;

export function isValidMask(mask: unknown): mask is string {
  return typeof mask === 'string' && mask.length > 0;
}

// ---------------------------------------------------------------------------
// Parsing (cached)
// ---------------------------------------------------------------------------

const MAX_CACHE_ENTRIES = 200;
const parseCache = new Map<string, ParsedMask>();
const regexCache = new Map<string, RegExp>();

function hasOwn(obj: Readonly<FormatChars>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function compilePattern(key: string, source: string): RegExp {
  const cached = regexCache.get(source);
  if (cached) return cached;
  try {
    // Anchored: each pattern is tested against exactly one character.
    const compiled = new RegExp(`^(?:${source})$`);
    regexCache.set(source, compiled);
    return compiled;
  } catch (error: unknown) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid formatChars pattern for "${key}" (${source}): ${reason}`);
  }
}

function cacheKey(mask: string, formatChars: Readonly<FormatChars>): string {
  const entries = Object.keys(formatChars)
    .sort()
    .map(key => `${key}\u0001${formatChars[key] ?? ''}`);
  return `${mask}\u0000${entries.join('\u0002')}`;
}

function buildSlots(mask: string, formatChars: Readonly<FormatChars>): MaskSlot[] {
  const slots: MaskSlot[] = [];
  let escaped = false;
  for (const char of mask.split('')) {
    if (escaped) {
      slots.push({ kind: 'literal', char });
      escaped = false;
    } else if (char === '\\') {
      escaped = true;
    } else {
      const source = hasOwn(formatChars, char) ? formatChars[char] : undefined;
      slots.push(
        source === undefined
          ? { kind: 'literal', char }
          : { kind: 'pattern', test: compilePattern(char, source) }
      );
    }
  }
  // A trailing lone backslash is kept as a literal backslash.
  if (escaped) slots.push({ kind: 'literal', char: '\\' });
  return slots;
}

export function parseMask(
  mask: string,
  formatChars: Readonly<FormatChars> = DEFAULT_FORMAT_CHARS
): ParsedMask {
  const key = cacheKey(mask, formatChars);
  const cached = parseCache.get(key);
  if (cached) return cached;

  const slots = buildSlots(mask, formatChars);
  const patternPositions = slots.flatMap((slot, index) => (slot.kind === 'pattern' ? [index] : []));
  const firstPattern = patternPositions[0] ?? slots.length;
  const prefix = slots
    .slice(0, firstPattern)
    .map(slot => (slot.kind === 'literal' ? slot.char : ''))
    .join('');

  const parsed: ParsedMask = { slots, patternPositions, prefix };

  if (parseCache.size >= MAX_CACHE_ENTRIES) {
    const oldest = parseCache.keys().next();
    if (!oldest.done) parseCache.delete(oldest.value);
  }
  parseCache.set(key, parsed);
  return parsed;
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

/** Effective placeholder character: first character of `maskChar`, or '' for none. */
function placeholderOf(maskChar: string): string {
  return maskChar.charAt(0);
}

/**
 * Render a raw value through the mask.
 *
 * - `fill === false` (lazy): output stops right after the last filled pattern
 *   slot, so an empty raw value renders as ''.
 * - `fill === true`: every slot is rendered; empty pattern slots show `maskChar`.
 *   Falls back to lazy when `maskChar` is empty, since an empty placeholder
 *   would break the position ↔ slot mapping.
 */
export function formatRaw(parsed: ParsedMask, raw: string, maskChar = '_', fill = false): string {
  const placeholder = placeholderOf(maskChar);
  const filled = fill && placeholder !== '';
  const lastIndex =
    parsed.patternPositions[Math.min(raw.length, parsed.patternPositions.length) - 1];
  const end = filled ? parsed.slots.length : lastIndex === undefined ? 0 : lastIndex + 1;

  let rawIndex = 0;
  return parsed.slots
    .slice(0, end)
    .map(slot => {
      if (slot.kind === 'literal') return slot.char;
      const char = raw.charAt(rawIndex);
      rawIndex += 1;
      return char === '' ? placeholder : char;
    })
    .join('');
}

/** Raw capacity: number of characters the mask can hold. */
export function capacityOf(parsed: ParsedMask): number {
  return parsed.patternPositions.length;
}

export function isComplete(parsed: ParsedMask, raw: string): boolean {
  return raw.length >= capacityOf(parsed);
}

// ---------------------------------------------------------------------------
// Conforming arbitrary strings
// ---------------------------------------------------------------------------

function patternAt(parsed: ParsedMask, rawIndex: number): RegExp | undefined {
  const position = parsed.patternPositions[rawIndex];
  if (position === undefined) return undefined;
  const slot = parsed.slots[position];
  return slot?.kind === 'pattern' ? slot.test : undefined;
}

/**
 * Walk `input` against the mask starting at slot `startPos` with `startRaw`
 * characters already placed before it. A character that equals the literal at
 * the current position consumes it; otherwise literals are skipped up to the
 * next pattern slot and the character is tested there. Invalid characters are
 * dropped. Returns only the newly accepted raw characters.
 */
function walk(
  parsed: ParsedMask,
  input: string,
  startPos: number,
  startRaw: number,
  maskChar: string
): string {
  const placeholder = placeholderOf(maskChar);
  const accepted: string[] = [];
  let pos = startPos;

  for (const char of input.split('')) {
    const rawIndex = startRaw + accepted.length;
    const nextPattern = parsed.patternPositions[rawIndex];
    if (nextPattern === undefined) break;

    const slot = parsed.slots[pos];
    if (slot?.kind === 'literal' && pos < nextPattern) {
      if (char === slot.char) {
        pos += 1;
        continue;
      }
      pos = nextPattern;
    }
    if (placeholder !== '' && char === placeholder) continue;

    const test = patternAt(parsed, rawIndex);
    if (test?.test(char)) {
      accepted.push(char);
      pos = nextPattern + 1;
    }
  }
  return accepted.join('');
}

/** Keep characters that fit their pattern slot (starting at `startRaw`), up to capacity. */
function refit(parsed: ParsedMask, chars: string, startRaw: number): string {
  const accepted: string[] = [];
  for (const char of chars.split('')) {
    const test = patternAt(parsed, startRaw + accepted.length);
    if (test === undefined) break;
    if (test.test(char)) accepted.push(char);
  }
  return accepted.join('');
}

function stripPrefix(prefix: string, value: string): string {
  if (prefix === '') return value;
  if (value.startsWith(prefix)) return value.slice(prefix.length);
  // The whole value is a partial prefix, e.g. "+1" for "+1 (999)".
  if (prefix.startsWith(value)) return '';
  return value;
}

/**
 * Extract the raw value from any string: an already-masked value (lazy or
 * filled), an unmasked value (`"5551234567"`), or a mix. Idempotent:
 * `toRaw(formatRaw(toRaw(x)))` equals `toRaw(x)`.
 */
export function toRaw(parsed: ParsedMask, value: string, maskChar = '_'): string {
  const input = stripPrefix(parsed.prefix, value);
  const startPos = parsed.patternPositions[0] ?? parsed.slots.length;
  return walk(parsed, input, startPos, 0, maskChar);
}

/** Convenience: conform any string to its masked display form. */
export function conformValue(
  parsed: ParsedMask,
  value: string,
  maskChar = '_',
  fill = false
): string {
  return formatRaw(parsed, toRaw(parsed, value, maskChar), maskChar, fill);
}

// ---------------------------------------------------------------------------
// Edits
// ---------------------------------------------------------------------------

function commonPrefixLength(a: string, b: string): number {
  const limit = Math.min(a.length, b.length);
  let i = 0;
  while (i < limit && a.charCodeAt(i) === b.charCodeAt(i)) i += 1;
  return i;
}

function commonSuffixLength(a: string, b: string, limit: number): number {
  let i = 0;
  while (i < limit && a.charCodeAt(a.length - 1 - i) === b.charCodeAt(b.length - 1 - i)) i += 1;
  return i;
}

export interface TextDiff {
  /** Start of the changed region (same in both strings). */
  readonly start: number;
  /** End (exclusive) of the removed region in the previous string. */
  readonly removedEnd: number;
  /** Text inserted at `start`. */
  readonly inserted: string;
}

/**
 * Work out what a browser edit did. `caret` is the selection end *after* the
 * edit; when it is consistent it disambiguates repeated characters (typing "1"
 * in front of "11"). Without it, a greedy prefix/suffix diff is used.
 */
export function diffText(previous: string, next: string, caret: number | null): TextDiff {
  const prefix = commonPrefixLength(previous, next);

  if (caret !== null && caret >= 0 && caret <= next.length) {
    const tail = next.slice(caret);
    if (tail.length <= previous.length && previous.endsWith(tail)) {
      const suffix = tail.length;
      const start = Math.min(prefix, caret, previous.length - suffix);
      return {
        start,
        removedEnd: previous.length - suffix,
        inserted: next.slice(start, caret),
      };
    }
  }

  const suffix = commonSuffixLength(
    previous,
    next,
    Math.min(previous.length, next.length) - prefix
  );
  return {
    start: prefix,
    removedEnd: previous.length - suffix,
    inserted: next.slice(prefix, next.length - suffix),
  };
}

/** Number of raw characters that sit in pattern slots strictly before display `position`. */
function rawCountBefore(parsed: ParsedMask, rawLength: number, position: number): number {
  const before = parsed.patternPositions.filter(slotIndex => slotIndex < position).length;
  return Math.min(before, rawLength);
}

export interface EditState {
  readonly raw: string;
  readonly display: string;
}

export interface EditInput {
  /** State that was rendered before the browser applied the edit. */
  readonly previous: EditState;
  /** The input's value after the browser applied the edit. */
  readonly next: string;
  /** `selectionEnd` after the edit, or null if unknown. */
  readonly caret: number | null;
  /** Direction for deletions that only touched literals. Defaults to backward. */
  readonly direction?: DeleteDirection;
  readonly maskChar?: string;
  readonly fill?: boolean;
}

export interface EditResult extends EditState {
  readonly caret: number;
  /** The text the user inserted (before filtering), or null for pure deletions. */
  readonly inserted: string | null;
}

/** Apply a browser edit to the masked state and compute the new caret. */
export function applyEdit(parsed: ParsedMask, input: EditInput): EditResult {
  const { previous, next, caret, direction = 'backward', maskChar = '_', fill = false } = input;
  const { start, removedEnd, inserted } = diffText(previous.display, next, caret);

  const rawLength = previous.raw.length;
  let keepBefore = rawCountBefore(parsed, rawLength, start);
  let resumeAt = rawCountBefore(parsed, rawLength, removedEnd);
  let caretOverride: number | null = null;

  // Deleting only literals / placeholders would otherwise be a no-op that
  // traps the caret ("123-|4" + Backspace). Remove the adjacent raw char.
  const onlyNonRawRemoved = inserted === '' && removedEnd > start && keepBefore === resumeAt;
  if (onlyNonRawRemoved) {
    if (direction === 'backward' && keepBefore > 0) {
      keepBefore -= 1;
      caretOverride = parsed.patternPositions[keepBefore] ?? null;
    } else if (direction === 'forward' && resumeAt < rawLength) {
      resumeAt += 1;
      caretOverride = start;
    }
  }

  const before = previous.raw.slice(0, keepBefore);
  const firstOpenSlot = parsed.patternPositions[keepBefore] ?? parsed.slots.length;
  const added = walk(parsed, inserted, Math.min(start, firstOpenSlot), keepBefore, maskChar);
  const after = refit(parsed, previous.raw.slice(resumeAt), keepBefore + added.length);

  const raw = before + added + after;
  const display = formatRaw(parsed, raw, maskChar, fill);

  let nextCaret: number;
  if (added.length > 0) {
    const lastSlot = parsed.patternPositions[keepBefore + added.length - 1] ?? display.length - 1;
    nextCaret = lastSlot + 1;
    while (nextCaret < display.length && parsed.slots[nextCaret]?.kind === 'literal') {
      nextCaret += 1;
    }
  } else {
    nextCaret = caretOverride ?? start;
  }

  return {
    raw,
    display,
    caret: Math.max(0, Math.min(nextCaret, display.length)),
    inserted: inserted === '' ? null : inserted,
  };
}
