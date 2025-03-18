import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { MaskField } from './MaskField';
import type { MaskFieldProps } from '../types';

export interface PhoneInputProps extends Omit<MaskFieldProps, 'mask'> {
  /**
   * Country code format - defaults to US/Canada format
   */
  countryCode?: 'US' | 'CA' | 'UK' | 'AU' | 'IN' | 'RU' | 'custom';

  /**
   * Custom mask to use when countryCode is 'custom'
   */
  customMask?: string;
}

const PHONE_MASKS = {
  US: '+1 (999) 999-9999',
  CA: '+1 (999) 999-9999',
  UK: '+44 99 9999 9999',
  RU: '+7 (999)999-9999',
  AU: '+61 9 9999 9999',
  IN: '+91 99999 99999',
};

const PhoneInputComponent: ForwardRefRenderFunction<HTMLInputElement, PhoneInputProps> = (
  { countryCode = 'RU', customMask, value = '', ...props },
  ref
) => {
  const mask =
    countryCode === 'custom' && customMask
      ? customMask
      : PHONE_MASKS[countryCode as keyof typeof PHONE_MASKS] || PHONE_MASKS.US;

  // Filter out PhoneInput-specific props to avoid React DOM warnings
  const { countryCode: _, customMask: __, ...restProps } = props as PhoneInputProps;

  return (
    <MaskField
      mask={mask}
      value={value}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      {...restProps}
      ref={ref}
    />
  );
};

export const PhoneInput = forwardRef(PhoneInputComponent);

PhoneInput.displayName = 'PhoneInput';
