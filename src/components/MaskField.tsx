import React, { forwardRef, useState } from 'react';
import type { CSSProperties, ChangeEvent, KeyboardEvent, ForwardRefRenderFunction } from 'react';

import { useMask } from '../hooks/useMask';
import type { MaskFieldProps } from '../types';

const DEFAULT_ERROR_COLOR = '#d32f2f';
const CONTAINER_STYLE: CSSProperties = { display: 'flex', flexDirection: 'column', width: '100%' };

function toStringValue(value: unknown): string {
  if (value === undefined || value === null) return '';
  if (Array.isArray(value)) return value.map(String).join('');
  return String(value);
}

const MaskFieldComponent: ForwardRefRenderFunction<HTMLInputElement, MaskFieldProps> = (
  props,
  ref
) => {
  const {
    mask,
    value,
    defaultValue,
    onChange,
    onKeyDown,
    formatChars,
    beforeMaskedValueChange,
    maskChar,
    alwaysShowMask,
    placeholderChar,
    showPlaceholder,
    placeholderColor: _placeholderColor, // deprecated no-op; never forwarded to the DOM
    placeholder,
    error = false,
    helperText,
    errorColor = DEFAULT_ERROR_COLOR,
    helperTextStyle,
    style,
    id,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...inputProps
  } = props;

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() => toStringValue(defaultValue));
  const currentValue = isControlled ? toStringValue(value) : uncontrolledValue;

  const masked = useMask({
    mask,
    value: currentValue,
    maskChar,
    formatChars,
    alwaysShowMask,
    beforeMaskedValueChange,
    showPlaceholder,
    placeholderChar,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    masked.handleChange(e);
    // A rejected keystroke (invalid char, full mask) leaves the value unchanged: no onChange.
    if (e.target.value === masked.maskedValue) return;
    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    masked.handleKeyDown(e);
    onKeyDown?.(e);
  };

  // The error colour always wins over a user border colour; other user styles are kept.
  const inputStyle: CSSProperties | undefined = error
    ? {
        borderWidth: '1px',
        borderStyle: 'solid',
        outline: 'none',
        ...style,
        borderColor: errorColor,
      }
    : style;

  const helperId = helperText && id ? `${id}-helper-text` : undefined;
  const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div style={CONTAINER_STYLE}>
      <input
        type="text"
        {...inputProps}
        ref={ref}
        id={id}
        value={masked.maskedValue}
        placeholder={placeholder ?? masked.placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={inputStyle}
        aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        aria-describedby={describedBy}
      />
      {helperText ? (
        <div
          id={helperId}
          style={{
            marginTop: '4px',
            fontSize: '0.75rem',
            lineHeight: '1.66',
            color: error ? errorColor : 'rgba(0, 0, 0, 0.6)',
            ...helperTextStyle,
          }}
        >
          {helperText}
        </div>
      ) : null}
    </div>
  );
};

export const MaskField = forwardRef(MaskFieldComponent);

MaskField.displayName = 'MaskField';
