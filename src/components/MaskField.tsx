import React, { forwardRef, useState, useEffect, ForwardRefRenderFunction } from 'react';
import { MaskFieldProps } from '../types';

const MaskFieldComponent: ForwardRefRenderFunction<HTMLInputElement, MaskFieldProps> = (
  props,
  ref
) => {
  const {
    mask,
    value = '',
    onChange,
    formatChars: _formatChars, // Extract but don't pass to DOM
    beforeMaskedValueChange: _beforeMaskedValueChange, // Extract but don't pass to DOM
    maskChar: _maskChar, // Extract but don't pass to DOM
    alwaysShowMask: _alwaysShowMask, // Extract but don't pass to DOM
    error = false,
    helperText,
    errorColor = '#d32f2f',
    helperTextStyle,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string);

  const placeholder = mask ? mask.replace(/9/g, '_') : '';

  useEffect(() => {
    setInputValue(value as string);
  }, [value]);

  const processMaskedInput = (rawInput: string): string => {
    if (!mask) return rawInput;

    const extractedChars: string[] = [];
    let maskIndex = 0;

    for (let i = 0; i < rawInput.length && maskIndex < mask.length; i++) {
      const char = rawInput[i];
      const currentMaskChar = mask[maskIndex];

      if (currentMaskChar === '9') {
        if (/\d/.test(char)) {
          extractedChars.push(char);
          maskIndex++;
        }
      } else if (currentMaskChar === 'a') {
        if (/[A-Za-z]/.test(char)) {
          extractedChars.push(char);
          maskIndex++;
        }
      } else if (currentMaskChar === '*') {
        if (/[A-Za-z0-9]/.test(char)) {
          extractedChars.push(char);
          maskIndex++;
        }
      } else {
        if (char === currentMaskChar) {
          extractedChars.push(char);
          maskIndex++;
        } else {
          extractedChars.push(currentMaskChar);
          maskIndex++;
          i--;
        }
      }
    }

    return extractedChars.join('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = processMaskedInput(rawValue);

    setInputValue(maskedValue);

    if (onChange) {
      const newEvent = { ...e };
      Object.defineProperty(newEvent, 'target', {
        writable: true,
        value: { ...e.target, value: maskedValue },
      });
      onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Memoize styles to avoid recreating objects on each render
  const inputStyle = error
    ? {
        borderColor: errorColor,
        borderWidth: '1px',
        borderStyle: 'solid',
        outline: 'none',
        ...(restProps.style || {}),
      }
    : restProps.style;

  const helperTextContainerStyle = {
    marginTop: '4px',
    fontSize: '0.75rem',
    lineHeight: '1.66',
    color: error ? errorColor : 'rgba(0, 0, 0, 0.6)',
    ...helperTextStyle,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <input
        ref={ref}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        style={inputStyle}
        {...restProps}
      />
      {helperText && <div style={helperTextContainerStyle}>{helperText}</div>}
    </div>
  );
};

export const MaskField = forwardRef(MaskFieldComponent);

MaskField.displayName = 'MaskField';
