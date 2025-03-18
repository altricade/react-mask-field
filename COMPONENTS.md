# React Mask Field Components

This document provides an overview of all the components in the React Mask Field library, showcasing their TypeScript interfaces, props, and usage examples.

## Overview

React Mask Field provides several input masking components:

- **MaskField**: Basic mask input field
- **PhoneInput**: International phone number input with country code support
- **DateInput**: Date input with formatting and validation
- **TimeInput**: Time input with 12/24 hour format support
- **CreditCardInput**: Credit card input with automatic card type detection
- **CurrencyInput**: Numeric input for currency values

## TypeScript Interfaces

### MaskField

```typescript
interface MaskFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  maskChar?: string;
  formatChars?: Record<string, string>;
  alwaysShowMask?: boolean;
  showMask?: boolean;
  placeholderColor?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  beforeMaskedValueChange?: (
    newValue: string,
    oldValue: string,
    userInput: string,
    options: BeforeMaskedValueChangeOptions
  ) => string;
}
```

### PhoneInput

```typescript
interface PhoneInputProps extends MaskFieldProps {
  countryCode: 'US' | 'CA' | 'UK' | 'AU' | 'IN' | 'custom';
  customMask?: string;
}
```

### DateInput

```typescript
interface DateInputProps extends MaskFieldProps {
  format?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'MM-DD-YYYY' | 'DD-MM-YYYY';
  enableDateValidation?: boolean;
  minDate?: Date;
  maxDate?: Date;
}
```

### TimeInput

```typescript
interface TimeInputProps extends MaskFieldProps {
  format?: '12h' | '24h';
  showSeconds?: boolean;
}
```

### CreditCardInput

```typescript
interface CreditCardInputProps extends MaskFieldProps {
  detectCardType?: boolean;
  onCardTypeChange?: (cardType: string | null) => void;
}
```

### CurrencyInput

```typescript
interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number;
  onValueChange: (value: number | null) => void;
  prefix?: string;
  symbol?: string;
  precision?: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
  allowNegative?: boolean;
}
```

## Usage Examples

### Basic MaskField

```tsx
import { MaskField } from 'react-mask-field';

const PhoneInput = () => {
  const [value, setValue] = useState('');

  return (
    <MaskField
      mask="(999) 999-9999"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Phone Number"
    />
  );
};
```

### PhoneInput

```tsx
import { PhoneInput } from 'react-mask-field';

const PhoneExample = () => {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState<'US' | 'CA' | 'UK' | 'AU' | 'IN'>('US');

  return (
    <PhoneInput
      countryCode={country}
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Phone Number"
    />
  );
};
```

### DateInput

```tsx
import { DateInput } from 'react-mask-field';

const DateExample = () => {
  const [value, setValue] = useState('');

  return (
    <DateInput
      format="MM/DD/YYYY"
      value={value}
      onChange={e => setValue(e.target.value)}
      enableDateValidation
      placeholder="MM/DD/YYYY"
    />
  );
};
```

### TimeInput

```tsx
import { TimeInput } from 'react-mask-field';

const TimeExample = () => {
  const [value, setValue] = useState('');

  return (
    <TimeInput
      format="12h"
      showSeconds
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="HH:MM:SS"
    />
  );
};
```

### CreditCardInput

```tsx
import { CreditCardInput } from 'react-mask-field';

const CreditCardExample = () => {
  const [value, setValue] = useState('');
  const [cardType, setCardType] = useState<string | null>(null);

  return (
    <>
      <CreditCardInput
        value={value}
        onChange={e => setValue(e.target.value)}
        onCardTypeChange={setCardType}
        detectCardType
        placeholder="Card Number"
      />
      {cardType && <div>Card Type: {cardType}</div>}
    </>
  );
};
```

### CurrencyInput

```tsx
import { CurrencyInput } from 'react-mask-field';

const CurrencyExample = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <CurrencyInput
      value={value}
      onValueChange={newValue => setValue(newValue !== null ? newValue : 0)}
      symbol="$"
      precision={2}
      placeholder="Enter amount"
    />
  );
};
```

## TypeScript Fixes Applied

1. Added proper type annotations to all mask component parameters
2. Fixed implicit any types in callback functions
3. Used enum types for format options instead of generic strings
4. Added proper event typing in all onChange handlers
5. Made country codes and format options use string literal unions
6. Fixed useEffect dependency arrays to include all referenced variables
7. Added function parameter types to handleBeforeMaskedValueChange functions
8. Replaced let declarations with const when variables are never reassigned
9. Fixed unnecessary escape characters in regex patterns
10. Added HTMLInputElement type assertions in test files

These fixes ensure type safety throughout the library and enable proper TypeScript intellisense and error checking when using the components.
