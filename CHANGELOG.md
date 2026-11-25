# Changelog

All notable changes to this project will be documented in this file.

## 1.3.0 (2026-11-25)

The mask engine was rewritten. Most documented props (`formatChars`, `maskChar`, `alwaysShowMask`,
`beforeMaskedValueChange`) were previously ignored by `MaskField`; they now work as documented.

### Behaviour changes

- `onChange` now receives the real event: `e.target` is the `<input>` element (previously a plain object
  copy), so `e.target.name`, `e.target.id` and the other DOM properties work, as form libraries expect.
- `onChange` no longer fires for rejected keystrokes (invalid characters, typing into a full mask).
- `value` passed to `MaskField` is now conformed to the mask (`"123456"` with `999-999` renders `123-456`).
- `MaskField` follows React's controlled semantics: if `value` is set and the parent ignores `onChange`, the
  input keeps showing `value`. Leave `value` out (optionally with `defaultValue`) for uncontrolled use.
- `PhoneInput` no longer forces `value=""`, so it works uncontrolled.
- `useMask().rawValue` now contains only the typed characters (no literals).
- `CreditCardInput`: the Amex mask is 15 digits (`9999 999999 99999`, previously 14); `maxLength` is no longer set.
- `TimeInput`: the 12h mask is `99:99 am` (A/P then M) and `inputMode` is `text` in 12h mode so mobile users
  can type AM/PM.

### Bug fixes

- **Masking and editing:**
  - Typed digits are no longer swallowed by prefix literals (US `PhoneInput`: typing `1234567890` gave
    `+1 (234) 567-890`).
  - Backspace/Delete next to a separator no longer gets stuck; editing in the middle no longer moves the caret
    to the end.
  - Selection replace and paste in the middle work.
- **Mask syntax:** escaped characters in masks (`\9`) work. The India mask `+91…` now escapes its `9` (the
  placeholder showed `+_1`).
- **Validation:**
  - `DateInput` and `TimeInput` validation now actually runs (it was never invoked).
  - `DateInput` no longer clamps Feb 29 to 28 before the year has been typed.
  - `TimeInput` now clamps seconds in 24h mode.
- **CreditCardInput:**
  - The controlled `value` is followed after mount.
  - A number pasted with a different card type is masked with the right mask.
  - `onCardTypeChange` is no longer re-fired when the parent passes a new inline callback.
- **MaskField DOM and styling:**
  - A user `style` no longer removes the error border.
  - `placeholderChar` and `placeholderColor` are no longer passed through to the DOM.
  - Passing both `value` and `defaultValue` no longer reaches the DOM.
- Removed hardcoded test-case shortcuts from the mask utilities.

### Features

- `aria-invalid` when `error` is set; `helperText` is linked through `aria-describedby` when the input has an `id`.
- `useMask` returns `placeholder` and `isComplete`.
- Error styling and helper text (`error`, `helperText`, `errorColor`, `helperTextStyle`) on all components
  (listed as 1.3.0 in an earlier changelog entry but published in 1.2.1).
- Component prop types are exported: `PhoneInputProps`, `DateInputProps`, `TimeInputProps`,
  `CreditCardInputProps`, `UseMaskProps`, `UseMaskResult`, and others.
- AI-assistant documentation ships in the package: `llms.txt`, `llms-full.txt`, `skills/react-mask-field/SKILL.md`.

### Performance

- Masks are parsed once and cached by content, and pattern RegExps are compiled once. Previously a RegExp was
  built for every character on every keystroke.
- `useMask` handlers are referentially stable, even with inline `formatChars` or `beforeMaskedValueChange`.
- `"sideEffects": false` is set for better tree-shaking.

### Deprecated

- `placeholderColor` (it never had an effect). Use CSS `::placeholder`.

### Internal

- Strict TypeScript (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) and type-aware ESLint (no `any`,
  no type assertions, no non-null assertions). The `lint` script now actually lints every file.
- Test suite rewritten around real user interaction (`@testing-library/user-event`), with 98%+ coverage.

## 1.2.0 (2025-03-18)

### Features

- Published interactive Storybook documentation to GitHub Pages
- Added comprehensive documentation for building and deploying Storybook
- Added publishing guide for npm releases
- Updated README with badges and documentation links

### Bug Fixes

- Fixed Storybook configuration for proper GitHub Pages deployment
- Resolved addon dependency issues in Storybook setup

## 1.1.0 (2025-03-18)

### Features

- Added official support for React 19
- Added comprehensive Storybook documentation with interactive examples
- Deployed Storybook to GitHub Pages for easy component exploration
- Updated component implementations to use ForwardRefRenderFunction pattern for better type safety
- Enhanced prop filtering across all components to prevent React DOM warnings

### Bug Fixes

- Fixed TypeScript compatibility issues with React 18 and 19
- Improved component type definitions for better IDE support
- Ensured consistent prop handling across all components

## 1.0.3 (2025-03-18)

### Bug Fixes

- Fixed CurrencyInput mask pattern being displayed literally
- Improved mask character handling in MaskField component
- Added default format characters for common patterns
- Simplified mask generation for better reliability

## 1.0.2 (2025-03-18)

### Bug Fixes

- Fixed input masking logic to properly handle user input in all components
- Improved placeholder display and input value handling
- Optimized mask formatting for better user experience
- Removed redundant display logic for cleaner implementation

## 1.0.1 (2025-03-18)

### Bug Fixes

- Fixed input masking logic to properly handle user input in all components
- Improved placeholder display and input value handling
- Optimized mask formatting for better user experience
- Removed redundant display logic for cleaner implementation

## 1.0.0 (2025-03-18)

### Features

- Initial stable release with comprehensive input masking components
- Specialized components:
  - MaskField: Core component for custom masking patterns
  - PhoneInput: International phone number formatting
  - CreditCardInput: Credit card formatting with type detection
  - DateInput: Date formatting with validation
  - TimeInput: Time formatting with 12h/24h support
  - CurrencyInput: Currency formatting with multiple options
- Full TypeScript support with strict typing
- Comprehensive test suite with 70 passing tests
- Modern React hooks-based implementation
- Customizable formatting options
- No external runtime dependencies
