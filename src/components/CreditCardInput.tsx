import React, { forwardRef, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, ForwardRefRenderFunction } from 'react';

import { MaskField } from './MaskField';
import type { MaskFieldProps } from '../types';
import { conformValue, defaultFormatChars, parseMask } from '../utils/maskUtils';

export type CardType =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'diners'
  | 'jcb'
  | 'unionpay'
  | 'other';

export interface CreditCardInputProps extends Omit<MaskFieldProps, 'mask'> {
  /**
   * Called when the detected (or forced) card type changes, including to null
   * when the field is cleared.
   */
  onCardTypeChange?: ((cardType: CardType | null) => void) | undefined;

  /**
   * Force a specific card type (and its mask); disables detection.
   */
  cardType?: CardType | undefined;

  /**
   * Detect the card type from the number. Default true.
   */
  detectCardType?: boolean | undefined;
}

/** Checked in order; more specific prefixes come first. */
const CARD_PATTERNS: ReadonlyArray<readonly [CardType, RegExp]> = [
  ['visa', /^4/],
  ['mastercard', /^(5[1-5]|2[2-7])/],
  ['amex', /^3[47]/],
  ['discover', /^(6011|65|64[4-9]|622)/],
  ['diners', /^(36|38|30[0-5])/],
  ['jcb', /^35/],
  ['unionpay', /^62/],
];

const CARD_MASKS = {
  amex: '9999 999999 99999', // 15 digits (4-6-5)
  diners: '9999 999999 9999', // 14 digits (4-6-4)
  default: '9999 9999 9999 9999',
} as const;

function detectCardType(cardNumber: string): CardType | null {
  const digits = cardNumber.replace(/\D/g, '');
  if (!digits) return null;
  const match = CARD_PATTERNS.find(([, pattern]) => pattern.test(digits));
  return match ? match[0] : 'other';
}

function getCardMask(type: CardType | null): string {
  if (type === 'amex') return CARD_MASKS.amex;
  if (type === 'diners') return CARD_MASKS.diners;
  return CARD_MASKS.default;
}

function toStringValue(value: unknown): string {
  if (value === undefined || value === null) return '';
  if (Array.isArray(value)) return value.map(String).join('');
  return String(value);
}

const CreditCardInputComponent: ForwardRefRenderFunction<HTMLInputElement, CreditCardInputProps> = (
  {
    cardType,
    detectCardType: shouldDetect = true,
    onCardTypeChange,
    onChange,
    onChangeCapture,
    value,
    defaultValue,
    ...props
  },
  ref
) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() => toStringValue(defaultValue));
  const currentValue = isControlled ? toStringValue(value) : uncontrolledValue;

  const typeOf = (number: string): CardType | null =>
    cardType ?? (shouldDetect ? detectCardType(number) : null);
  const currentType = typeOf(currentValue);
  const mask = getCardMask(currentType);

  // The browser value before masking: lets a paste that switches the card type
  // be re-masked from the full input instead of the old mask's truncated value.
  const unmaskedInputRef = useRef<string | null>(null);

  const handleChangeCapture = (e: ChangeEvent<HTMLInputElement>) => {
    unmaskedInputRef.current = e.target.value;
    onChangeCapture?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const unmasked = unmaskedInputRef.current ?? e.target.value;
    unmaskedInputRef.current = null;

    const nextType = typeOf(unmasked);
    const nextMask = getCardMask(nextType);
    if (nextMask !== mask) {
      const input = e.target;
      input.value = conformValue(
        parseMask(nextMask, props.formatChars ?? defaultFormatChars),
        unmasked,
        props.maskChar ?? '_',
        props.alwaysShowMask ?? false
      );
      if (input.ownerDocument.activeElement === input) {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }

    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
  };

  // Notify on every change of the derived type — from typing or from a new
  // controlled value — but only once per actual change.
  const notifiedTypeRef = useRef<CardType | null>(null);
  useEffect(() => {
    if (currentType === notifiedTypeRef.current) return;
    notifiedTypeRef.current = currentType;
    onCardTypeChange?.(currentType);
  }, [currentType, onCardTypeChange]);

  return (
    <MaskField
      inputMode="numeric"
      type="tel"
      autoComplete="cc-number"
      {...props}
      mask={mask}
      value={currentValue}
      onChange={handleChange}
      onChangeCapture={handleChangeCapture}
      ref={ref}
    />
  );
};

export const CreditCardInput = forwardRef(CreditCardInputComponent);

CreditCardInput.displayName = 'CreditCardInput';
