import { useState, useCallback, KeyboardEvent, ChangeEvent } from 'react';

import { BeforeMaskedValueChangeFunction, FormatChars } from '../types';
import {
  getDefaultFormatChars,
  formatValue,
  getFilledLength,
  getSelection,
  isValidMask,
} from '../utils/maskUtils';

interface UseMaskProps {
  mask: string;
  value: string;
  maskChar?: string;
  formatChars?: FormatChars;
  beforeMaskedValueChange?: BeforeMaskedValueChangeFunction;
  showPlaceholder?: boolean;
  placeholderChar?: string;
}

export function useMask({
  mask,
  value = '',
  maskChar = '_',
  formatChars = getDefaultFormatChars(),
  beforeMaskedValueChange,
  showPlaceholder = true,
  placeholderChar,
}: UseMaskProps) {
  const [lastValue, setLastValue] = useState(value);

  if (!isValidMask(mask)) {
    console.error('Invalid mask format provided to MaskField');
  }

  const formatValueWithMask = useCallback(
    (val: string) => {
      const effectiveMaskChar = showPlaceholder ? placeholderChar || maskChar : '';

      return formatValue({
        value: val,
        mask,
        maskChar: effectiveMaskChar,
        formatChars,
      });
    },
    [mask, maskChar, formatChars, showPlaceholder, placeholderChar]
  );

  const maskedValue = formatValueWithMask(value || '');
  const effectiveMaskChar = showPlaceholder ? placeholderChar || maskChar : '';
  const rawValue = maskedValue.replace(new RegExp(`[${effectiveMaskChar}]`, 'g'), '');

  const setSelection = useCallback(
    (input: HTMLInputElement, selection: { start: number; end: number }) => {
      try {
        input.setSelectionRange(selection.start, selection.end);
      } catch (error) {
        console.error('Error setting selection range:', error);
      }
    },
    []
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const inputValue = input.value;
      const selection = getSelection(input);

      const newMaskedValue = formatValueWithMask(inputValue);

      const filledLength = getFilledLength(newMaskedValue, maskChar);
      const cursorPosition = Math.min(selection.start || 0, filledLength);
      const newSelection = { start: cursorPosition, end: cursorPosition };

      if (beforeMaskedValueChange) {
        const oldState = {
          value: lastValue,
          selection: { start: null, end: null },
        };

        const newState = {
          value: newMaskedValue,
          selection: newSelection,
        };

        const userInput = inputValue;

        const transformedState = beforeMaskedValueChange(newState, oldState, userInput, {
          mask,
          maskChar,
          formatChars,
        });

        e.target.value = transformedState.value;

        if (transformedState.selection.start !== null && transformedState.selection.end !== null) {
          setSelection(input, {
            start: transformedState.selection.start,
            end: transformedState.selection.end,
          });
        }

        setLastValue(transformedState.value);
      } else {
        e.target.value = newMaskedValue;
        setSelection(input, newSelection);
        setLastValue(newMaskedValue);
      }
    },
    [
      formatValueWithMask,
      maskChar,
      beforeMaskedValueChange,
      lastValue,
      mask,
      formatChars,
      setSelection,
    ]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const selStart = input.selectionStart || 0;

      if (e.key === 'ArrowRight') {
        const nextPlaceholderPos = maskedValue.indexOf(maskChar, selStart);

        if (
          nextPlaceholderPos !== -1 &&
          nextPlaceholderPos === selStart &&
          selStart < maskedValue.length
        ) {
          e.preventDefault();
          setSelection(input, {
            start: nextPlaceholderPos + 1,
            end: nextPlaceholderPos + 1,
          });
        }
      }
    },
    [maskedValue, maskChar, setSelection]
  );

  const setInputValue = useCallback((input: HTMLInputElement, value: string) => {
    input.value = value;
  }, []);

  return {
    maskedValue,
    rawValue,
    handleChange,
    handleKeyDown,
    setInputValue,
    setSelection,
  };
}
