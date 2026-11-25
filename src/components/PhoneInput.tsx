import React, { forwardRef } from 'react';
import type { ForwardRefRenderFunction } from 'react';

import { MaskField } from './MaskField';
import type { MaskFieldProps } from '../types';

export type PhoneCountryCode = 'US' | 'CA' | 'UK' | 'AU' | 'IN' | 'RU' | 'custom';

export interface PhoneInputProps extends Omit<MaskFieldProps, 'mask'> {
  /**
   * Country format. Default `'RU'`. Use `'custom'` together with `customMask`.
   */
  countryCode?: PhoneCountryCode | undefined;

  /**
   * Mask used when `countryCode` is `'custom'`. Without it, the US mask is used.
   * Escape format characters in a fixed prefix, e.g. `'+\\91 99999 99999'`.
   */
  customMask?: string | undefined;
}

/** Format characters inside country prefixes are escaped (e.g. the 9 in +91). */
const PHONE_MASKS: Readonly<Record<Exclude<PhoneCountryCode, 'custom'>, string>> = {
  US: '+1 (999) 999-9999',
  CA: '+1 (999) 999-9999',
  UK: '+44 99 9999 9999',
  RU: '+7 (999)999-9999',
  AU: '+61 9 9999 9999',
  IN: '+\\91 99999 99999',
};

const PhoneInputComponent: ForwardRefRenderFunction<HTMLInputElement, PhoneInputProps> = (
  { countryCode = 'RU', customMask, ...props },
  ref
) => {
  const mask =
    countryCode === 'custom'
      ? customMask
        ? customMask
        : PHONE_MASKS.US
      : PHONE_MASKS[countryCode];

  return (
    <MaskField type="tel" inputMode="tel" autoComplete="tel" {...props} mask={mask} ref={ref} />
  );
};

export const PhoneInput = forwardRef(PhoneInputComponent);

PhoneInput.displayName = 'PhoneInput';
