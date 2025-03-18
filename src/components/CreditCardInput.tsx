import React, { forwardRef, useState, useEffect, ForwardRefRenderFunction } from 'react';
import { MaskField } from './MaskField';
import type { MaskFieldProps } from '../types';

export interface CreditCardInputProps extends Omit<MaskFieldProps, 'mask'> {
  /**
   * Callback when card type is detected
   */
  onCardTypeChange?: (cardType: CardType | null) => void;

  /**
   * Force a specific card type mask
   */
  cardType?: CardType;

  /**
   * Enable auto-detection of card type from number
   */
  detectCardType?: boolean;
}

export type CardType =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'diners'
  | 'jcb'
  | 'unionpay'
  | 'other';

const CARD_PATTERNS = {
  visa: /^4/,
  mastercard: /^(5[1-5]|2[2-7])/,
  amex: /^3[47]/,
  discover: /^(6011|65|64[4-9]|622)/,
  diners: /^(36|38|30[0-5])/,
  jcb: /^35/,
  unionpay: /^62/,
};

const CARD_MASKS = {
  amex: '9999 999999 9999',
  diners: '9999 999999 9999',
  default: '9999 9999 9999 9999',
};

const CreditCardInputComponent: ForwardRefRenderFunction<HTMLInputElement, CreditCardInputProps> = (
  { cardType, detectCardType = true, onCardTypeChange, onChange, ...props },
  ref
) => {
  const [detectedType, setDetectedType] = useState<CardType | null>(cardType || null);
  const [value, setValue] = useState(props.value?.toString() || '');

  const getMask = () => {
    const type = cardType || detectedType;

    if (type === 'amex') return CARD_MASKS.amex;
    if (type === 'diners') return CARD_MASKS.diners;
    return CARD_MASKS.default;
  };

  const detectType = (cardNumber: string) => {
    const normalized = cardNumber.replace(/\D/g, '');

    if (!normalized) return null;

    for (const [type, pattern] of Object.entries(CARD_PATTERNS)) {
      if (pattern.test(normalized)) {
        return type as CardType;
      }
    }

    return 'other' as CardType;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (detectCardType && !cardType) {
      const newType = detectType(newValue);
      if (newType !== detectedType) {
        setDetectedType(newType);
        onCardTypeChange?.(newType);
      }
    }

    onChange?.(e);
  };

  useEffect(() => {
    if (cardType) {
      setDetectedType(cardType);
      onCardTypeChange?.(cardType);
    } else if (detectCardType && value) {
      const newType = detectType(value);
      if (newType !== detectedType) {
        setDetectedType(newType);
        onCardTypeChange?.(newType);
      }
    }
  }, [cardType, value, detectCardType, detectedType, onCardTypeChange]);

  // Filter out CreditCardInput-specific props to avoid React DOM warnings
  const {
    cardType: _,
    detectCardType: __,
    onCardTypeChange: ___,
    ...restProps
  } = props as CreditCardInputProps;

  return (
    <MaskField
      mask={getMask()}
      inputMode="numeric"
      type="tel"
      autoComplete="cc-number"
      placeholder={getMask().replace(/9/g, '_')}
      maxLength={getMask().length}
      {...restProps}
      value={value}
      onChange={handleChange}
      ref={ref}
    />
  );
};

export const CreditCardInput = forwardRef(CreditCardInputComponent);

CreditCardInput.displayName = 'CreditCardInput';
