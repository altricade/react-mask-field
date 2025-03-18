# React Mask Field

A lightweight, flexible input masking library for React applications built with TypeScript. This library provides customizable masked input components with type safety and modern React practices.

## Features

- 🚀 **Modern React API** - Based on hooks and functional components
- 📦 **Lightweight** - No external dependencies
- 🔒 **Type-safe** - Written in TypeScript with full type definitions
- 🧰 **Specialized Components** - Components for common use cases like phone numbers, dates, and credit cards
- 🎨 **Customizable** - Flexible formatting options
- ⚛️ **Compatible** - Works with React 16.8+ including React 18 and React 19
- 🛡️ **Clean DOM** - Properly filters out non-standard props from DOM elements

## Installation

```bash
npm install @altricade/react-mask-field
# or
yarn add @altricade/react-mask-field
# or
pnpm add @altricade/react-mask-field
```

## Basic Usage

```tsx
import React from 'react';
import { MaskField } from '@altricade/react-mask-field';

function App() {
  return <MaskField mask="(999) 999-9999" onChange={e => console.log(e.target.value)} />;
}
```

## Specialized Components

### Phone Input

```tsx
import React, { useState } from 'react';
import { PhoneInput } from '@altricade/react-mask-field';

function PhoneForm() {
  const [phone, setPhone] = useState('');

  return <PhoneInput countryCode="US" value={phone} onChange={e => setPhone(e.target.value)} />;
}
```

### Date Input

```tsx
import React from 'react';
import { DateInput } from '@altricade/react-mask-field';

function DateForm() {
  return (
    <DateInput
      format="MM/DD/YYYY"
      onChange={e => console.log(e.target.value)}
      enableDateValidation
    />
  );
}
```

### Credit Card Input

```tsx
import React, { useState } from 'react';
import { CreditCardInput, CardType } from '@altricade/react-mask-field';

function PaymentForm() {
  const [cardType, setCardType] = useState<CardType | null>(null);

  return (
    <div>
      <CreditCardInput
        onChange={e => console.log(e.target.value)}
        onCardTypeChange={setCardType}
        detectCardType
      />
      {cardType && <div>Card type: {cardType}</div>}
    </div>
  );
}
```

### Time Input

```tsx
import React from 'react';
import { TimeInput } from '@altricade/react-mask-field';

function TimeForm() {
  return <TimeInput format="12h" showSeconds onChange={e => console.log(e.target.value)} />;
}
```

## API Documentation

### `MaskField` Component

The core component that provides masking functionality.

#### Props

| Prop                      | Type                                                     | Default     | Description                                             |
| ------------------------- | -------------------------------------------------------- | ----------- | ------------------------------------------------------- |
| `mask`                    | `string`                                                 | (required)  | Mask pattern for the input                              |
| `value`                   | `string`                                                 | `''`        | The controlled input value                              |
| `maskChar`                | `string`                                                 | `'_'`       | Character to cover unfilled parts of the mask           |
| `formatChars`             | `object`                                                 | See below   | Key-value map of format characters to RegExp strings    |
| `beforeMaskedValueChange` | `(newState, oldState, userInput, maskOptions) => string` | `undefined` | Function to modify the masked value before it's applied |

Default `formatChars`:

```js
{
  '9': '[0-9]',
  'a': '[A-Za-z]',
  '*': '[A-Za-z0-9]'
}
```

## Mask Format

The mask pattern supports the following format characters by default:

- `9`: Any numeric character (0-9)
- `a`: Any alphabetic character (A-Z, a-z)
- `*`: Any alphanumeric character (A-Z, a-z, 0-9)

Fixed characters in the mask (like parentheses, dashes, etc.) will be automatically inserted as the user types.

## Implementation Details

- Uses a simplified masking algorithm that properly restricts input based on the mask pattern
- Supports different placeholder types (9 for digits, a for letters, \* for alphanumeric)
- Properly handles the maskChar property for placeholder generation
- Maintains proper event handling for onChange callbacks
- Filters out non-standard props from DOM elements to prevent React warnings

## Examples

### Phone Number

```
mask="(999) 999-9999"
```

This will format input as a US phone number like (123) 456-7890.

### Credit Card

```
mask="9999 9999 9999 9999"
```

This will format input as a credit card number with spaces after every 4 digits.

### Date

```
mask="99/99/9999"
```

This will format input as a date like 01/31/2023.

## License

MIT
