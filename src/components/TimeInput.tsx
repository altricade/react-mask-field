import React, { forwardRef, useCallback, ForwardRefRenderFunction } from 'react';
import { MaskField } from './MaskField';
import type { MaskFieldProps, BeforeMaskedValueChangeFunction } from '../types';

export interface TimeInputProps extends Omit<MaskFieldProps, 'mask'> {
  /**
   * Time format to use
   */
  format?: '12h' | '24h';

  /**
   * Whether to show seconds
   */
  showSeconds?: boolean;

  /**
   * Separator character to use between hours, minutes, and seconds
   */
  separator?: ':' | '.';

  /**
   * Enable validation of time values (e.g., hours 0-23, minutes 0-59)
   */
  enableTimeValidation?: boolean;
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
    const getTimeMask = useCallback(() => {
      const is12Hour = format === '12h';
      const hoursMask = '99';
      const baseFormat = `${hoursMask}${separator}99`;

      if (showSeconds) {
        return `${baseFormat}${separator}99${is12Hour ? ' aa' : ''}`;
      }

      return is12Hour ? `${baseFormat} aa` : baseFormat;
    }, [format, showSeconds, separator]);

    const mask = getTimeMask();

    const handleBeforeMaskedValueChange: BeforeMaskedValueChangeFunction = useCallback(
      (newState, oldState, userInput, maskOptions) => {
        let result = newState;
        if (beforeMaskedValueChange) {
          result = beforeMaskedValueChange(newState, oldState, userInput, maskOptions);
        }

        if (!enableTimeValidation) {
          return result;
        }

        const value = result.value;

        let match;
        if (format === '12h') {
          match = value.match(
            new RegExp(
              `^(\\d{1,2})\\${separator}(\\d{1,2})(?:\\${separator}(\\d{1,2}))?(\\s+([aApP][mM]))?`
            )
          );
        } else {
          match = value.match(
            new RegExp(`^(\\d{1,2})\\${separator}(\\d{1,2})(?:\\${separator}(\\d{1,2}))?`)
          );
        }

        if (!match) {
          return result;
        }

        const [, hours, minutes, seconds, , ampm] = match;

        const maxHours = format === '24h' ? 23 : 12;
        const hourValue = parseInt(hours, 10);

        if (hourValue > maxHours) {
          result.value = result.value.replace(
            new RegExp(`^${hours.padStart(2, '0')}`),
            maxHours.toString().padStart(2, '0')
          );
        } else if (format === '12h' && hourValue === 0) {
          result.value = result.value.replace(/^00/, '12');
        }

        if (minutes && parseInt(minutes, 10) > 59) {
          result.value = result.value.replace(
            new RegExp(`\\${separator}${minutes.padStart(2, '0')}`),
            `${separator}59`
          );
        }

        if (seconds && parseInt(seconds, 10) > 59) {
          result.value = result.value.replace(
            new RegExp(`\\${separator}${seconds.padStart(2, '0')}\\s`),
            `${separator}59 `
          );
        }

        if (format === '12h' && ampm) {
          if (!['am', 'pm', 'AM', 'PM'].includes(ampm)) {
            result.value = result.value.replace(/\s+[a-zA-Z]+$/, ' AM');
          }
        }

        return result;
      },
      [format, separator, enableTimeValidation, beforeMaskedValueChange]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(e);
      }
    };

    // Filter out TimeInput-specific props to avoid React DOM warnings
    const {
      format: _,
      showSeconds: __,
      separator: ___,
      enableTimeValidation: ____,
      ...restProps
    } = props as TimeInputProps;

    return (
      <MaskField
        mask={mask}
        placeholder={mask.replace(/9/g, '_').replace(/a/g, '_')}
        inputMode="numeric"
        autoComplete="off"
        beforeMaskedValueChange={handleBeforeMaskedValueChange}
        formatChars={{
          '9': '[0-9]',
          a: '[aApP]',
        }}
        onChange={handleChange}
        {...restProps}
        ref={ref}
      />
    );
  }

export const TimeInput = forwardRef(TimeInputComponent);

TimeInput.displayName = 'TimeInput';
