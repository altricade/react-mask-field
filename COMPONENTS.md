# React Mask Field Components

TypeScript interfaces of every exported component. See [README.md](./README.md) for behaviour and examples, and [llms-full.txt](./llms-full.txt) for the complete reference.

## Overview

| Component         | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `MaskField`       | Any pattern mask (`9` digit, `a` letter, `*` alphanumeric) |
| `PhoneInput`      | Country phone formats (US, CA, UK, AU, IN, RU, custom)   |
| `DateInput`       | Date formats with calendar validation                    |
| `TimeInput`       | 12h / 24h time with optional seconds                     |
| `CreditCardInput` | Card numbers with type detection                         |
| `useMask`         | The engine as a hook, for custom inputs                  |

All components forward refs to the `<input>` and accept every native input prop.

## MaskField

```typescript
interface MaskFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'placeholder'> {
  mask: string;
  value?: string | number | readonly string[] | undefined;
  maskChar?: string | undefined; // default '_'
  formatChars?: Readonly<Record<string, string>> | undefined;
  alwaysShowMask?: boolean | undefined; // default false
  beforeMaskedValueChange?: BeforeMaskedValueChangeFunction | undefined;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  placeholder?: string | undefined; // default: mask template, e.g. "(___) ___-____"
  placeholderChar?: string | undefined; // default: maskChar
  showPlaceholder?: boolean | undefined; // default true
  /** @deprecated ignored — use CSS ::placeholder */
  placeholderColor?: string | undefined;
  error?: boolean | undefined;
  helperText?: React.ReactNode | undefined;
  errorColor?: string | undefined; // default '#d32f2f'
  helperTextStyle?: React.CSSProperties | undefined;
}

type BeforeMaskedValueChangeFunction = (
  newState: { value: string; selection: { start: number | null; end: number | null } },
  oldState: { value: string; selection: { start: number | null; end: number | null } },
  userInput: string | null,
  maskOptions: { mask: string; maskChar: string; formatChars: Record<string, string> }
) => { value: string; selection: { start: number | null; end: number | null } };
```

## PhoneInput

```typescript
type PhoneCountryCode = 'US' | 'CA' | 'UK' | 'AU' | 'IN' | 'RU' | 'custom';

interface PhoneInputProps extends Omit<MaskFieldProps, 'mask'> {
  countryCode?: PhoneCountryCode | undefined; // default 'RU'
  customMask?: string | undefined; // used with 'custom'; falls back to the US mask
}
```

## DateInput

```typescript
type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'MM-DD-YYYY' | 'DD-MM-YYYY';
type DateSeparator = '/' | '-' | '.';

interface DateInputProps extends Omit<MaskFieldProps, 'mask'> {
  format?: DateFormat | undefined; // default 'MM/DD/YYYY'
  separator?: DateSeparator | undefined; // default: from format
  enableDateValidation?: boolean | undefined; // default true
}
```

## TimeInput

```typescript
type TimeFormat = '12h' | '24h';
type TimeSeparator = ':' | '.';

interface TimeInputProps extends Omit<MaskFieldProps, 'mask'> {
  format?: TimeFormat | undefined; // default '12h'
  showSeconds?: boolean | undefined; // default false
  separator?: TimeSeparator | undefined; // default ':'
  enableTimeValidation?: boolean | undefined; // default true
}
```

## CreditCardInput

```typescript
type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay' | 'other';

interface CreditCardInputProps extends Omit<MaskFieldProps, 'mask'> {
  onCardTypeChange?: ((cardType: CardType | null) => void) | undefined;
  cardType?: CardType | undefined; // forces type and mask
  detectCardType?: boolean | undefined; // default true
}
```

## useMask

```typescript
interface UseMaskProps {
  mask: string;
  value: string;
  maskChar?: string | undefined;
  formatChars?: Readonly<Record<string, string>> | undefined;
  alwaysShowMask?: boolean | undefined;
  beforeMaskedValueChange?: BeforeMaskedValueChangeFunction | undefined;
  showPlaceholder?: boolean | undefined;
  placeholderChar?: string | undefined;
}

interface UseMaskResult {
  maskedValue: string;
  rawValue: string;
  placeholder: string | undefined;
  isComplete: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setInputValue: (input: HTMLInputElement, value: string) => void;
  setSelection: (input: HTMLInputElement, selection: { start: number; end: number }) => void;
}
```
