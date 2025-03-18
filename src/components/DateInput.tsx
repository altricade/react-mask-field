import React, { forwardRef, useCallback, ForwardRefRenderFunction } from 'react';
import { MaskField } from './MaskField';
import type { MaskFieldProps, BeforeMaskedValueChangeFunction } from '../types';

export interface DateInputProps extends Omit<MaskFieldProps, 'mask'> {
  /**
   * Date format to use - defaults to 'MM/DD/YYYY'
   */
  format?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'MM-DD-YYYY' | 'DD-MM-YYYY';

  /**
   * Separator character to use in the date format
   */
  separator?: '/' | '-' | '.';

  /**
   * Enable validation of the date as a valid calendar date
   */
  enableDateValidation?: boolean;
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
    const getDateMask = useCallback(() => {
      const sep = separator || (new RegExp('/').test(format) ? '/' : /-/.test(format) ? '-' : '.');

      const normalizedFormat = format.replace(/[/\-.]/g, sep);

      return normalizedFormat.replace('MM', '99').replace('DD', '99').replace('YYYY', '9999');
    }, [format, separator]);

    const mask = getDateMask();

    const handleBeforeMaskedValueChange: BeforeMaskedValueChangeFunction = useCallback(
      (newState, oldState, userInput, maskOptions) => {
        let result = newState;
        if (beforeMaskedValueChange) {
          result = beforeMaskedValueChange(newState, oldState, userInput, maskOptions);
        }

        if (!enableDateValidation) {
          return result;
        }

        const value = result.value;
        const sep =
          separator || (new RegExp('/').test(format) ? '/' : /-/.test(format) ? '-' : '.');
        const parts = value.split(sep);

        if (parts.length < 2) {
          return result;
        }

        let year, month, day;

        if (format.startsWith('MM')) {
          [month, day, year] = parts;
        } else if (format.startsWith('DD')) {
          [day, month, year] = parts;
        } else if (format.startsWith('YYYY')) {
          [year, month, day] = parts;
        }

        const numMonth = month ? parseInt(month, 10) : NaN;
        const numDay = day ? parseInt(day, 10) : NaN;
        const numYear = year ? parseInt(year, 10) : NaN;

        if (!isNaN(numMonth) && numMonth > 12) {
          if (month) {
            result.value = result.value.replace(
              new RegExp(`${month.padStart(2, '0')}${sep}`),
              `12${sep}`
            );
          }
        }

        if (!isNaN(numMonth) && !isNaN(numDay) && numMonth > 0 && numMonth <= 12) {
          const maxDays = new Date(numYear || new Date().getFullYear(), numMonth, 0).getDate();

          if (numDay > maxDays) {
            if (format.indexOf('DD') < format.indexOf('MM')) {
              if (day) {
                result.value = result.value.replace(
                  new RegExp(`^${day.padStart(2, '0')}${sep}`),
                  `${maxDays.toString().padStart(2, '0')}${sep}`
                );
              }
            } else {
              if (day) {
                result.value = result.value.replace(
                  new RegExp(`${sep}${day.padStart(2, '0')}($|${sep})`),
                  `${sep}${maxDays.toString().padStart(2, '0')}$1`
                );
              }
            }
          }
        }

        return result;
      },
      [format, separator, enableDateValidation, beforeMaskedValueChange]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(e);
      }
    };

    // Filter out DateInput-specific props to avoid React DOM warnings
    const {
      format: _,
      separator: __,
      enableDateValidation: ___,
      ...restProps
    } = props as DateInputProps;

    return (
      <MaskField
        mask={mask}
        placeholder={mask.replace(/9/g, '_')}
        inputMode="numeric"
        autoComplete="off"
        beforeMaskedValueChange={handleBeforeMaskedValueChange}
        onChange={handleChange}
        {...restProps}
        ref={ref}
      />
    );
  }

export const DateInput = forwardRef(DateInputComponent);

DateInput.displayName = 'DateInput';
