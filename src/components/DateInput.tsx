import React, { forwardRef, useCallback } from 'react';
import type { ForwardRefRenderFunction } from 'react';

import { MaskField } from './MaskField';
import type { BeforeMaskedValueChangeFunction, MaskFieldProps } from '../types';
import { clampDateDigits, type DateOrder } from '../utils/dateTime';

export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'MM-DD-YYYY' | 'DD-MM-YYYY';
export type DateSeparator = '/' | '-' | '.';

export interface DateInputProps extends Omit<MaskFieldProps, 'mask'> {
  /**
   * Date format to use. Default `'MM/DD/YYYY'`.
   */
  format?: DateFormat | undefined;

  /**
   * Separator character. Defaults to the separator in `format`.
   */
  separator?: DateSeparator | undefined;

  /**
   * Clamp month to 01-12 and day to the days of that month (leap years
   * included) as the user types. Default true.
   */
  enableDateValidation?: boolean | undefined;
}

function orderOf(format: DateFormat): DateOrder {
  if (format.startsWith('MM')) return 'MDY';
  if (format.startsWith('DD')) return 'DMY';
  return 'YMD';
}

function getDateMask(format: DateFormat, separator?: DateSeparator): string {
  const sep = separator ?? (format.includes('/') ? '/' : '-');
  const groups: Record<DateOrder, readonly string[]> = {
    MDY: ['99', '99', '9999'],
    DMY: ['99', '99', '9999'],
    YMD: ['9999', '99', '99'],
  };
  return groups[orderOf(format)].join(sep);
}

const DateInputComponent: ForwardRefRenderFunction<HTMLInputElement, DateInputProps> = (
  {
    format = 'MM/DD/YYYY',
    separator,
    enableDateValidation = true,
    beforeMaskedValueChange,
    ...props
  },
  ref
) => {
  const mask = getDateMask(format, separator);
  const order = orderOf(format);

  const handleBeforeMaskedValueChange = useCallback<BeforeMaskedValueChangeFunction>(
    (newState, oldState, userInput, maskOptions) => {
      const result = beforeMaskedValueChange
        ? beforeMaskedValueChange(newState, oldState, userInput, maskOptions)
        : newState;
      if (!enableDateValidation) return result;

      // The date mask is digits only, so the digits are the raw value. The
      // returned value is re-conformed to the mask by MaskField.
      const digits = result.value.replace(/\D/g, '');
      return { ...result, value: clampDateDigits(digits, order) };
    },
    [beforeMaskedValueChange, enableDateValidation, order]
  );

  return (
    <MaskField
      inputMode="numeric"
      autoComplete="off"
      {...props}
      mask={mask}
      beforeMaskedValueChange={handleBeforeMaskedValueChange}
      ref={ref}
    />
  );
};

export const DateInput = forwardRef(DateInputComponent);

DateInput.displayName = 'DateInput';
