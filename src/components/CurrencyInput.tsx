import React, { forwardRef, useState, useCallback } from 'react';
import { MaskField } from './MaskField';
import type { MaskFieldProps } from '../types';

export interface CurrencyInputProps extends Omit<MaskFieldProps, 'mask'> {
  /**
   * Currency symbol to display
   */
  symbol?: string;

  /**
   * Decimal separator character
   */
  decimalSeparator?: '.' | ',';

  /**
   * Thousand separator character
   */
  thousandSeparator?: ',' | '.' | ' ' | '';

  /**
   * Number of decimal places
   */
  precision?: number;

  /**
   * Position of the currency symbol
   */
  symbolPosition?: 'prefix' | 'suffix';

  /**
   * Allow negative values
   */
  allowNegative?: boolean;

  /**
   * Keep trailing zeros in decimal part
   */
  keepTrailingZeros?: boolean;

  /**
   * Callback when the raw numeric value changes
   */
  onValueChange?: (value: number | null) => void;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      symbol = '$',
      decimalSeparator = '.',
      thousandSeparator = ',',
      precision = 2,
      symbolPosition = 'prefix',
      allowNegative = true,
      keepTrailingZeros = true,
      onChange,
      onValueChange,
      value,
      ...props
    },
    ref
  ) => {
    // Track the raw numeric value internally
    const [rawValue, setRawValue] = useState<number | null>(() => {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') {
        const parsed = parseFloat(value.replace(/[^\d.-]/g, ''));
        return isNaN(parsed) ? null : parsed;
      }
      return null;
    });

    // Format numeric value to display format
    const formatValue = useCallback(
      (num: number | null): string => {
        if (num === null) return '';

        // Handle negative values
        const isNegative = num < 0;
        const absValue = Math.abs(num);

        // Convert to string with fixed precision
        let numStr = absValue.toFixed(precision);

        // Remove trailing zeros if not keeping them
        if (!keepTrailingZeros && precision > 0) {
          numStr = numStr.replace(/\.?0+$/, '');
        }

        // Split integer and decimal parts
        const parts = numStr.split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1] || '';

        // Add thousand separators
        let formattedInteger = '';
        if (thousandSeparator) {
          for (let i = 0; i < integerPart.length; i++) {
            if (i > 0 && (integerPart.length - i) % 3 === 0) {
              formattedInteger += thousandSeparator;
            }
            formattedInteger += integerPart[i];
          }
        } else {
          formattedInteger = integerPart;
        }

        // Combine parts
        let result = '';
        if (decimalPart) {
          result = `${formattedInteger}${decimalSeparator}${decimalPart}`;
        } else {
          result = formattedInteger;
        }

        // Add negative sign if needed
        if (isNegative && allowNegative) {
          result = `-${result}`;
        }

        // Add currency symbol
        if (symbolPosition === 'prefix') {
          return `${symbol}${result}`;
        } else {
          return `${result} ${symbol}`;
        }
      },
      [
        symbol,
        decimalSeparator,
        thousandSeparator,
        precision,
        symbolPosition,
        allowNegative,
        keepTrailingZeros,
      ]
    );

    // Parse display format back to numeric value
    const parseDisplayValue = useCallback(
      (displayValue: string): number | null => {
        // Remove currency symbol and thousand separators
        let cleaned = displayValue
          .replace(new RegExp(`\\${symbol}`, 'g'), '')
          .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
          .trim();

        // Convert decimal separator to dot for parsing
        if (decimalSeparator !== '.') {
          cleaned = cleaned.replace(new RegExp(`\\${decimalSeparator}`, 'g'), '.');
        }

        // Parse numeric value
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? null : parsed;
      },
      [symbol, decimalSeparator, thousandSeparator]
    );

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const displayValue = e.target.value;
      const newRawValue = parseDisplayValue(displayValue);

      // Update internal state
      setRawValue(newRawValue);

      // Call external callbacks
      if (onChange) {
        onChange(e);
      }

      if (onValueChange) {
        onValueChange(newRawValue);
      }
    };

    // Generate dynamic mask based on the current value and configuration
    const generateMask = useCallback(() => {
      // Start with optional negative sign if allowed
      let mask = allowNegative ? '-?' : '';

      // Add prefix symbol if needed
      if (symbolPosition === 'prefix') {
        // Escape special characters in symbol that might be used in mask format
        const escapedSymbol = symbol.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        mask += escapedSymbol;
      }

      // Add integer part with optional thousands separators
      mask += '9{1,3}';
      if (thousandSeparator) {
        const escapedSeparator = thousandSeparator.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        mask += `(${escapedSeparator}9{3})*`;
      }

      // Add decimal part if precision > 0
      if (precision > 0) {
        const escapedDecimal = decimalSeparator.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        mask += `${escapedDecimal}9{0,${precision}}`;
      }

      // Add suffix symbol if needed
      if (symbolPosition === 'suffix') {
        const escapedSymbol = symbol.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        mask += ` ${escapedSymbol}`;
      }

      return mask;
    }, [symbol, decimalSeparator, thousandSeparator, precision, symbolPosition, allowNegative]);

    // Use formatted value as displayed value
    const displayValue = formatValue(rawValue);

    return (
      <MaskField
        mask={generateMask()}
        value={displayValue}
        inputMode="decimal"
        onChange={handleChange}
        {...props}
        ref={ref}
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
