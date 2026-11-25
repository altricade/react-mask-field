import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import type { BeforeMaskedValueChangeFunction, FormatChars } from '../types';
import {
  applyEdit,
  defaultFormatChars,
  formatRaw,
  isComplete as isRawComplete,
  isValidMask,
  parseMask,
  toRaw,
  type DeleteDirection,
  type EditState,
} from '../utils/maskUtils';

// useLayoutEffect warns during SSR on React < 18; fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export interface UseMaskProps {
  /** Mask pattern. An empty mask disables masking (the value passes through). */
  mask: string;
  /** Current value — masked or unmasked; it is conformed to the mask. */
  value: string;
  /** Placeholder for empty slots when `alwaysShowMask` is on. Default `_`. */
  maskChar?: string | undefined;
  formatChars?: Readonly<FormatChars> | undefined;
  /** Render every slot (empty ones as `maskChar`) instead of only what was typed. */
  alwaysShowMask?: boolean | undefined;
  beforeMaskedValueChange?: BeforeMaskedValueChangeFunction | undefined;
  /** Generate a `placeholder` string from the mask. Default true. */
  showPlaceholder?: boolean | undefined;
  /** Character used in the generated placeholder. Defaults to `maskChar`, then `_`. */
  placeholderChar?: string | undefined;
}

export interface UseMaskResult {
  /** The value to render in the input. */
  maskedValue: string;
  /** Only the characters the user filled in (no literals, no placeholders). */
  rawValue: string;
  /** Generated placeholder (e.g. `(___) ___-____`), or undefined when disabled. */
  placeholder: string | undefined;
  /** True when every slot of the mask is filled. */
  isComplete: boolean;
  /**
   * Conforms the edit, writes the masked value to `e.target.value` and moves
   * the caret. Read `e.target.value` afterwards for the new masked value.
   */
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Tracks Backspace/Delete so deletions over literals go the right way. */
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  setInputValue: (input: HTMLInputElement, value: string) => void;
  setSelection: (input: HTMLInputElement, selection: { start: number; end: number }) => void;
}

interface Selection {
  start: number | null;
  end: number | null;
}

interface PendingKey {
  direction: DeleteDirection | null;
  selection: Selection | null;
}

const NO_KEY: PendingKey = { direction: null, selection: null };

function directionFromInputType(nativeEvent: Event): DeleteDirection | null {
  if (!('inputType' in nativeEvent) || typeof nativeEvent.inputType !== 'string') return null;
  if (nativeEvent.inputType.startsWith('deleteContentForward')) return 'forward';
  if (nativeEvent.inputType.startsWith('delete')) return 'backward';
  return null;
}

function isFocused(input: HTMLInputElement): boolean {
  return input.ownerDocument.activeElement === input;
}

function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(value, max));
}

function setSelectionSafely(input: HTMLInputElement, selection: { start: number; end: number }) {
  // Moving the selection of an unfocused input focuses it in some browsers (Safari).
  if (!isFocused(input)) return;
  try {
    input.setSelectionRange(selection.start, selection.end);
  } catch {
    // Input types without selection support (email, number) throw; nothing to do.
  }
}

export function useMask({
  mask,
  value,
  maskChar = '_',
  formatChars = defaultFormatChars,
  alwaysShowMask = false,
  beforeMaskedValueChange,
  showPlaceholder = true,
  placeholderChar,
}: UseMaskProps): UseMaskResult {
  // parseMask caches by content, so this is referentially stable even when
  // formatChars is passed inline (a new object every render).
  const parsed = isValidMask(mask) ? parseMask(mask, formatChars) : null;

  const rawValue = parsed ? toRaw(parsed, value, maskChar) : value;
  const maskedValue = parsed ? formatRaw(parsed, rawValue, maskChar, alwaysShowMask) : value;
  const placeholder =
    parsed && showPlaceholder
      ? formatRaw(parsed, '', placeholderChar || maskChar || '_', true)
      : undefined;

  // What is currently rendered; the next edit is diffed against it.
  const renderedRef = useRef<EditState>({ raw: rawValue, display: maskedValue });
  useIsomorphicLayoutEffect(() => {
    renderedRef.current = { raw: rawValue, display: maskedValue };
  });

  // Latest object/function props, read at event time so inline values don't
  // recreate handleChange on every render.
  const latestRef = useRef({ formatChars, beforeMaskedValueChange });
  useIsomorphicLayoutEffect(() => {
    latestRef.current = { formatChars, beforeMaskedValueChange };
  });

  const keyRef = useRef<PendingKey>(NO_KEY);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const selection = { start: input.selectionStart, end: input.selectionEnd };
    if (e.key === 'Delete') {
      keyRef.current = { direction: 'forward', selection };
    } else if (e.key === 'Backspace') {
      keyRef.current = { direction: 'backward', selection };
    } else {
      keyRef.current = { direction: null, selection };
    }
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!parsed) return;

      const input = e.target;
      const previous = renderedRef.current;
      const pendingKey = keyRef.current;
      keyRef.current = NO_KEY;

      const edit = applyEdit(parsed, {
        previous,
        next: input.value,
        caret: input.selectionEnd,
        direction: directionFromInputType(e.nativeEvent) ?? pendingKey.direction ?? 'backward',
        maskChar,
        fill: alwaysShowMask,
      });

      let display = edit.display;
      let selection = { start: edit.caret, end: edit.caret };

      const latest = latestRef.current;
      if (latest.beforeMaskedValueChange) {
        const transformed = latest.beforeMaskedValueChange(
          { value: edit.display, selection: { start: edit.caret, end: edit.caret } },
          {
            value: previous.display,
            selection: pendingKey.selection ?? { start: null, end: null },
          },
          edit.inserted,
          { mask, maskChar, formatChars: { ...latest.formatChars } }
        );
        // Whatever the callback returns is conformed again, so it can't break the mask.
        display = formatRaw(
          parsed,
          toRaw(parsed, transformed.value, maskChar),
          maskChar,
          alwaysShowMask
        );
        const start = clamp(transformed.selection.start ?? display.length, display.length);
        const end = clamp(transformed.selection.end ?? start, display.length);
        selection = { start, end };
      }

      input.value = display;
      setSelectionSafely(input, selection);
    },
    [parsed, mask, maskChar, alwaysShowMask]
  );

  const setInputValue = useCallback((input: HTMLInputElement, next: string) => {
    input.value = next;
  }, []);

  return {
    maskedValue,
    rawValue,
    placeholder,
    isComplete: parsed ? isRawComplete(parsed, rawValue) : true,
    handleChange,
    handleKeyDown,
    setInputValue,
    setSelection: setSelectionSafely,
  };
}
