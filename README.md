# React Mask Field

A modern, flexible, and accessible input masking library for React applications built with TypeScript. This library provides a collection of customizable masked input components with type safety and modern React practices.

## Features

- 🚀 **Modern React API** - Based on hooks and functional components
- 📦 **Lightweight** - No external dependencies
- 🔒 **Type-safe** - Written in TypeScript with full type definitions
- 🧰 **Specialized Components** - Pre-built components for common use cases
- 🎨 **Customizable** - Extensive formatting options
- ⚛️ **Compatible** - Works with React 16.8+ including React 18
- 🌐 **Internationalization** - Support for different regional formats
- 🧠 **Smart Features** - Auto-detection and formatting for credit cards
- 🎭 **RTL Support** - Full right-to-left text direction support
- 🔍 **Visually Distinctive** - Optional styled placeholders

## Installation

```bash
npm install react-mask-field
# or
yarn add react-mask-field
# or
pnpm add react-mask-field
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { MaskField } from "react-mask-field";

function App() {
  const [value, setValue] = useState("");

  return (
    <MaskField
      mask="(999) 999-9999"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="(___) ___-____"
    />
  );
}
```

## Specialized Components

### Phone Input

```tsx
import React, { useState } from "react";
import { PhoneInput } from "react-mask-field";

function PhoneForm() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneInput
      countryCode="US"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />
  );
}
```

### Date Input

```tsx
import React, { useState } from "react";
import { DateInput } from "react-mask-field";

function DateForm() {
  const [date, setDate] = useState("");

  return (
    <DateInput
      format="MM/DD/YYYY"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      enableDateValidation
    />
  );
}
```

### Credit Card Input

```tsx
import React, { useState } from "react";
import { CreditCardInput, CardType } from "react-mask-field";

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState<CardType | null>(null);

  return (
    <div>
      <CreditCardInput
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
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
import React, { useState } from "react";
import { TimeInput } from "react-mask-field";

function TimeForm() {
  const [time, setTime] = useState("");

  return (
    <TimeInput
      format="12h"
      showSeconds
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  );
}
```

### Currency Input

```tsx
import React, { useState } from "react";
import { CurrencyInput } from "react-mask-field";

function PriceForm() {
  const [price, setPrice] = useState<number | null>(null);

  return (
    <CurrencyInput
      symbol="$"
      decimalSeparator="."
      thousandSeparator=","
      precision={2}
      value={price}
      onValueChange={(value) => setPrice(value)}
    />
  );
}
```

## API Documentation

### `MaskField` Component

The core component that provides masking functionality.

#### Props

| Prop                      | Type       | Default           | Description                                                 |
| ------------------------- | ---------- | ----------------- | ----------------------------------------------------------- |
| `mask`                    | `string`   | (required)        | Mask pattern for the input                                  |
| `value`                   | `string`   | `''`              | The controlled input value                                  |
| `maskChar`                | `string`   | `'_'`             | Character to cover unfilled parts of the mask               |
| `formatChars`             | `object`   | See below         | Key-value map of format characters to RegExp strings        |
| `alwaysShowMask`          | `boolean`  | `false`           | Show mask when input is empty and has no focus              |
| `showPlaceholder`         | `boolean`  | `true`            | Show a visually distinct placeholder for unfilled positions |
| `placeholderColor`        | `string`   | `'#aaa'`          | Color for the placeholder characters                        |
| `placeholderChar`         | `string`   | (uses `maskChar`) | Character used for placeholders in mask pattern             |
| `beforeMaskedValueChange` | `function` | -                 | Function called before masked value is changed              |

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

You can escape any character with a backslash to use it as a literal part of the mask, e.g., `\9` to use the digit 9 as a literal rather than a format character.

## License

MIT
