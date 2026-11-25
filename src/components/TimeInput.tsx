import React, { forwardRef, useCallback } from 'react';
import type { ForwardRefRenderFunction } from 'react';

import { MaskField } from './MaskField';
import type { BeforeMaskedValueChangeFunction, FormatChars, MaskFieldProps } from '../types';
import { clampTimeRaw, type TimeFormat } from '../utils/dateTime';

export type TimeSeparator = ':' | '.';

export interface TimeInputProps extends Omit<MaskFieldProps, 'mask'> {
  /**
   * Time format. Default `'12h'` (with an AM/PM suffix).
   */
  format?: TimeFormat | undefined;

  /**
   * Whether to include seconds. Default false.
   */
  showSeconds?: boolean | undefined;

  /**
   * Separator between hours, minutes and seconds. Default `':'`.
   */
  separator?: TimeSeparator | undefined;

  /**
   * Clamp hours (00-23, or 01-12 for 12h), minutes and seconds (00-59) as the
   * user types, and upper-case AM/PM. Default true.
   */
  enableTimeValidation?: boolean | undefined;
}

/** `a` = A/P, `m` = M — so "AM"/"PM" can be typed in the two letter slots. */
const TIME_FORMAT_CHARS: Readonly<FormatChars> = Object.freeze({
  '9': '[0-9]',
  a: '[aApP]',
  m: '[mM]',
});

function getTimeMask(format: TimeFormat, showSeconds: boolean, separator: TimeSeparator): string {
  const base = showSeconds ? `99${separator}99${separator}99` : `99${separator}99`;
  return format === '12h' ? `${base} am` : base;
}

const TimeInputComponent: ForwardRefRenderFunction<HTMLInputElement, TimeInputProps> = (
  {
    format = '12h',
    showSeconds = false,
    separator = ':',
    enableTimeValidation = true,
    beforeMaskedValueChange,
    ...props
  },
  ref
) => {
  const mask = getTimeMask(format, showSeconds, separator);

  const handleBeforeMaskedValueChange = useCallback<BeforeMaskedValueChangeFunction>(
    (newState, oldState, userInput, maskOptions) => {
      const result = beforeMaskedValueChange
        ? beforeMaskedValueChange(newState, oldState, userInput, maskOptions)
        : newState;
      if (!enableTimeValidation) return result;

      // Strip separators/placeholders to get the raw value; MaskField re-conforms the result.
      const raw = result.value.replace(/[^0-9A-Za-z]/g, '');
      return { ...result, value: clampTimeRaw(raw, format, showSeconds) };
    },
    [beforeMaskedValueChange, enableTimeValidation, format, showSeconds]
  );

  return (
    <MaskField
      inputMode={format === '12h' ? 'text' : 'numeric'}
      autoComplete="off"
      formatChars={TIME_FORMAT_CHARS}
      {...props}
      mask={mask}
      beforeMaskedValueChange={handleBeforeMaskedValueChange}
      ref={ref}
    />
  );
};

export const TimeInput = forwardRef(TimeInputComponent);

TimeInput.displayName = 'TimeInput';
