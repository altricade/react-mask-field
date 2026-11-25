---
name: react-mask-field
description: How to use @altricade/react-mask-field (MaskField, PhoneInput, DateInput, TimeInput, CreditCardInput, useMask) correctly. Use whenever writing or reviewing React code that imports @altricade/react-mask-field, or when adding a masked phone, date, time, card or custom-pattern input to a React app that has this package installed.
---

# @altricade/react-mask-field

Input masks for React (16.8–19), strict TypeScript, no runtime dependencies. The full reference is in
`node_modules/@altricade/react-mask-field/llms-full.txt`; read it if something below doesn't answer your question.

## Pick the component

| Need                                  | Use                                                     |
| ------------------------------------- | ------------------------------------------------------- |
| Phone number                          | `<PhoneInput countryCode="US" />` (default is **RU**)   |
| Date with calendar validation         | `<DateInput format="DD/MM/YYYY" />`                     |
| Time (12h with AM/PM, or 24h)         | `<TimeInput format="24h" showSeconds />`                |
| Card number with type detection       | `<CreditCardInput onCardTypeChange={setType} />`        |
| Any other pattern                     | `<MaskField mask="aaa-9999" />`                         |
| Your own input element / design system| `useMask({ mask, value })`                              |

## Rules

1. Mask chars: `9` digit, `a` letter, `*` alphanumeric, `\` escapes. Everything else is a literal that gets
   inserted automatically. Escape format chars inside prefixes: `mask={'+\\91 99999 99999'}`.
2. `onChange` gets a normal `ChangeEvent<HTMLInputElement>`. Use `e.target.value`, which is the masked string.
   It only fires when the value actually changes.
3. Store that masked value and pass it back as `value`. Unmasked values are also accepted.
4. The unmasked value is `value.replace(/\D/g, '')` for digit masks (note this keeps phone country-code digits),
   or `useMask(...).rawValue`.
5. Validation state: `error` (sets `aria-invalid` and a red border) plus `helperText`. Give the input an `id`
   so the helper text is linked via `aria-describedby`.
6. With react-hook-form, use `Controller` and spread `field` onto the component. With Formik, pass `name`,
   `value` and `onChange={handleChange}` directly.
7. `alwaysShowMask` renders the whole template (`(555) 12_-____`). Without it, only typed text is shown and the
   template is the placeholder.

## Do not

- invent props: `minDate`, `maxDate`, `onRawChange`, `guide`, `keepCharPositions`, array/function masks and
  `CurrencyInput` do not exist;
- add `maxLength` (the mask limits length; with `alwaysShowMask` it blocks typing);
- use `type="number"`/`type="email"` (no caret control) — use the default or `type="tel"`;
- pass `formatChars` without the defaults you still use (it replaces them);
- rely on `placeholderColor` (ignored) — style `::placeholder` with CSS.

## Template

```tsx
import { useState } from 'react';
import { PhoneInput } from '@altricade/react-mask-field';

export function PhoneField() {
  const [phone, setPhone] = useState('');
  const digits = phone.replace(/\D/g, '');
  const invalid = digits.length > 0 && digits.length < 11; // "+1" + 10 digits

  return (
    <>
      <label htmlFor="phone">Phone</label>
      <PhoneInput
        id="phone"
        name="phone"
        countryCode="US"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        error={invalid}
        helperText={invalid ? 'Enter a 10-digit number' : undefined}
      />
    </>
  );
}
```
