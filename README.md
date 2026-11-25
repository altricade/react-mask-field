# React Mask Field

A lightweight, dependency-free input mask component for React, written in strict TypeScript. Includes ready-made phone, date, time and credit-card inputs.

[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://altricade.github.io/react-mask-field/)
[![npm version](https://img.shields.io/npm/v/@altricade/react-mask-field.svg?style=for-the-badge)](https://www.npmjs.com/package/@altricade/react-mask-field)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

## Features

- **Real editing behaviour** — typing, backspace/delete across separators, editing in the middle, selection replace and paste all keep the caret where users expect it
- **Controlled or uncontrolled** — works with plain `useState`, form libraries, and `defaultValue`
- **Standard `onChange`** — `event.target` is the real input, so `name`, `id` and `value` behave as usual
- **Specialized components** — `PhoneInput`, `DateInput` (calendar validation, leap years), `TimeInput` (12h/24h), `CreditCardInput` (card type detection)
- **Accessible** — `aria-invalid` on error, helper text linked with `aria-describedby`
- **Small and typed** — no runtime dependencies, ~5 KB gzipped, full type definitions
- **React 16.8 – 19**, SSR-safe

📚 [Interactive Storybook documentation](https://altricade.github.io/react-mask-field/)

## Installation

```bash
npm install @altricade/react-mask-field
```

## Quick start

```tsx
import { useState } from 'react';
import { MaskField } from '@altricade/react-mask-field';

function App() {
  const [phone, setPhone] = useState('');
  return (
    <MaskField
      mask="(999) 999-9999"
      value={phone}
      onChange={e => setPhone(e.target.value)} // "(555) 123-4567"
    />
  );
}
```

## Mask syntax

| Character | Accepts                     |
| --------- | --------------------------- |
| `9`       | a digit `0-9`               |
| `a`       | a letter `A-Z`, `a-z`       |
| `*`       | a letter or digit           |
| `\`       | makes the next char literal |
| anything else | a fixed literal (inserted automatically) |

Escape a format character to use it literally — for example the `9` in India's country code. In a JS/TS string the backslash itself must be escaped: `mask={'+\\91 99999 99999'}`.

Define your own format characters with `formatChars` (each value is a RegExp source tested against **one** character):

```tsx
<MaskField mask="#hhhhhh" formatChars={{ h: '[0-9a-fA-F]' }} /> // hex colour
```

## Display modes

By default the input shows **only what was typed** (`(555) 12`), and the mask is shown as the `placeholder` (`(___) ___-____`).

Set `alwaysShowMask` to always render the full template with `maskChar` in empty slots (`(555) 12_-____`). Typing always fills the first empty slot.

## Values

- `value` / `defaultValue` may be **masked or unmasked**: `"5551234567"` and `"(555) 123-4567"` render the same.
- `onChange` gives you the **masked** value in `e.target.value`, and only fires when the value actually changes (rejected keystrokes don't fire it).
- To get the unmasked value, strip the literals (`e.target.value.replace(/\D/g, '')` for digit masks) or use the `useMask` hook's `rawValue`.

### With form libraries

Use a controlled pattern — e.g. react-hook-form's `Controller`:

```tsx
<Controller
  name="phone"
  control={control}
  render={({ field }) => <PhoneInput countryCode="US" {...field} />}
/>
```

## Components

All components accept every `MaskField` prop (except `mask`) and every native `<input>` prop, and forward refs to the `<input>`.

### `PhoneInput`

```tsx
<PhoneInput countryCode="US" value={phone} onChange={e => setPhone(e.target.value)} />
```

| Prop          | Type                                                       | Default | Description                                      |
| ------------- | ---------------------------------------------------------- | ------- | ------------------------------------------------ |
| `countryCode` | `'US' \| 'CA' \| 'UK' \| 'AU' \| 'IN' \| 'RU' \| 'custom'` | `'RU'`  | Country format                                   |
| `customMask`  | `string`                                                   | —       | Mask for `'custom'` (falls back to US if absent) |

Masks: US/CA `+1 (999) 999-9999` · UK `+44 99 9999 9999` · RU `+7 (999)999-9999` · AU `+61 9 9999 9999` · IN `+91 99999 99999`. Typed digits never get swallowed by the prefix: typing `1234567890` in US gives `+1 (123) 456-7890`.

### `DateInput`

```tsx
<DateInput format="DD/MM/YYYY" onChange={e => setDate(e.target.value)} />
```

| Prop                   | Type                                                                       | Default        | Description                          |
| ---------------------- | -------------------------------------------------------------------------- | -------------- | ------------------------------------ |
| `format`               | `'MM/DD/YYYY' \| 'DD/MM/YYYY' \| 'YYYY-MM-DD' \| 'MM-DD-YYYY' \| 'DD-MM-YYYY'` | `'MM/DD/YYYY'` | Field order and default separator    |
| `separator`            | `'/' \| '-' \| '.'`                                                        | from `format`  | Separator override                   |
| `enableDateValidation` | `boolean`                                                                  | `true`         | Clamp month/day while typing         |

Validation clamps month to `01–12` and day to the length of that month (`04/31` → `04/30`). Feb 29 is allowed until the year is typed, then clamped for non-leap years.

### `TimeInput`

```tsx
<TimeInput format="24h" showSeconds onChange={e => setTime(e.target.value)} />
```

| Prop                   | Type              | Default | Description                                        |
| ---------------------- | ----------------- | ------- | -------------------------------------------------- |
| `format`               | `'12h' \| '24h'`  | `'12h'` | 12h adds an `AM`/`PM` suffix                       |
| `showSeconds`          | `boolean`         | `false` | Adds a seconds field                               |
| `separator`            | `':' \| '.'`      | `':'`   | Separator between fields                           |
| `enableTimeValidation` | `boolean`         | `true`  | Clamp hours/minutes/seconds, upper-case AM/PM      |

12h mode: type `0930am` → `09:30 AM`; hours are `01–12` (`00` becomes `12`). 24h: hours `00–23`. Minutes and seconds `00–59`.

### `CreditCardInput`

```tsx
<CreditCardInput onCardTypeChange={setCardType} onChange={e => setCard(e.target.value)} />
```

| Prop               | Type                                  | Default | Description                                  |
| ------------------ | ------------------------------------- | ------- | -------------------------------------------- |
| `detectCardType`   | `boolean`                             | `true`  | Detect the card type from the number         |
| `cardType`         | `CardType`                            | —       | Force a type (and its mask)                  |
| `onCardTypeChange` | `(type: CardType \| null) => void`    | —       | Called once whenever the type changes        |

`CardType` is `'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay' | 'other'`. Amex uses `9999 999999 99999` (15 digits), Diners `9999 999999 9999` (14), all others `9999 9999 9999 9999`.

## `MaskField` props

| Prop                      | Type                                   | Default            | Description                                                                 |
| ------------------------- | -------------------------------------- | ------------------ | --------------------------------------------------------------------------- |
| `mask`                    | `string`                               | (required)         | Mask pattern. `''` disables masking                                         |
| `value` / `defaultValue`  | `string \| number`                     | —                  | Controlled / initial value, masked or unmasked                              |
| `onChange`                | `(e: ChangeEvent<HTMLInputElement>) => void` | —            | `e.target.value` is the masked value                                        |
| `maskChar`                | `string`                               | `'_'`              | Fills empty slots in `alwaysShowMask` mode and the generated placeholder    |
| `alwaysShowMask`          | `boolean`                              | `false`            | Always render the full template                                             |
| `formatChars`             | `Record<string, string>`               | `9`, `a`, `*`      | Format characters → single-char RegExp sources                              |
| `beforeMaskedValueChange` | `(newState, oldState, userInput, options) => newState` | —  | Transform value/selection after each edit; the result is re-masked          |
| `placeholder`             | `string`                               | mask template      | Overrides the generated placeholder                                         |
| `placeholderChar`         | `string`                               | `maskChar`         | Character used in the generated placeholder                                 |
| `showPlaceholder`         | `boolean`                              | `true`             | Generate a placeholder from the mask                                        |
| `error`                   | `boolean`                              | `false`            | Error border + `aria-invalid`                                               |
| `errorColor`              | `string`                               | `'#d32f2f'`        | Error border and helper-text colour                                         |
| `helperText`              | `ReactNode`                            | —                  | Text under the input (linked via `aria-describedby` when `id` is set)       |
| `helperTextStyle`         | `CSSProperties`                        | —                  | Styles for the helper text                                                  |

### `beforeMaskedValueChange`

```tsx
<MaskField
  mask="aaa-999"
  beforeMaskedValueChange={newState => ({ ...newState, value: newState.value.toUpperCase() })}
/>
```

Arguments: `newState` (`{ value, selection }` after the edit), `oldState`, `userInput` (inserted text, `null` for deletions), and `{ mask, maskChar, formatChars }`. Whatever you return is conformed to the mask again, so it can never produce an invalid value.

## `useMask` hook

Build your own input on the same engine:

```tsx
import { useMask } from '@altricade/react-mask-field';

function PostcodeInput() {
  const [value, setValue] = useState('');
  const mask = useMask({ mask: 'a9a 9a9', value });
  return (
    <input
      value={mask.maskedValue}
      placeholder={mask.placeholder}
      onKeyDown={mask.handleKeyDown}
      onChange={e => {
        mask.handleChange(e); // writes the masked value into e.target.value and moves the caret
        setValue(e.target.value);
      }}
    />
  );
}
```

Returns `maskedValue`, `rawValue` (only the typed characters), `placeholder`, `isComplete`, `handleChange`, `handleKeyDown`, `setInputValue`, `setSelection`.

## For AI assistants

This package ships documentation written for LLMs and coding agents:

- [`llms.txt`](./llms.txt) — short index ([llmstxt.org](https://llmstxt.org) format)
- [`llms-full.txt`](./llms-full.txt) — complete API, recipes and pitfalls in one file
- [`skills/react-mask-field/SKILL.md`](./skills/react-mask-field/SKILL.md) — a drop-in agent skill; copy it to `.claude/skills/` in your project

All three are included in the npm package (`node_modules/@altricade/react-mask-field/`).

## Contributing

```bash
npm install
npm run check   # typecheck + lint + tests with coverage thresholds
```

See [AGENTS.md](./AGENTS.md) for the architecture and conventions.

## License

MIT
