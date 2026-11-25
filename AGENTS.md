# AGENTS.md — working on @altricade/react-mask-field

Guidance for AI coding agents (and humans) changing this library. For *using* the library, see `llms-full.txt`.

## Gate

```bash
npm run check   # tsc --noEmit + eslint (type-aware, strict) + jest with coverage thresholds
npm run build   # rollup → dist/{cjs,esm,umd} + dist/index.d.ts
```

A change is not done until `npm run check` passes. Never lower coverage thresholds or add suppressions to get there.

## Architecture (imports flow downward only)

```
src/index.ts                public API — named exports + `export type`
src/components/*.tsx        PhoneInput, DateInput, TimeInput, CreditCardInput → MaskField
src/components/MaskField.tsx  controlled/uncontrolled state, styles, a11y → useMask
src/hooks/useMask.ts        React binding: caret, key direction, beforeMaskedValueChange → maskUtils
src/utils/maskUtils.ts      pure mask engine (no React)
src/utils/dateTime.ts       pure date/time clamping (no React)
```

### The engine (`src/utils/maskUtils.ts`)

- `parseMask(mask, formatChars)` → slots (`literal | pattern`), `patternPositions`, `prefix`. Cached by
  **content** (not object identity), so inline `formatChars` objects stay cheap and referentially stable.
- The **raw value** (only the characters filling pattern slots, contiguous from the first) is the source of
  truth. `formatRaw(parsed, raw, maskChar, fill)` derives the display; display index `i` always equals slot `i`.
- `toRaw(parsed, anyString)` conforms masked, unmasked or filled strings. It must stay idempotent; a seeded
  property test enforces that.
- `applyEdit(parsed, { previous, next, caret, direction })` diffs the previous display against the browser's new
  value, using the caret to disambiguate (`diffText`). It rebuilds the raw value as before + inserted + after,
  re-fits shifted characters to their new slots, and computes the caret. Edits that remove only literals delete
  the neighbouring raw character, in `direction`.

### React layer

- `useMask.handleChange` writes the masked value into `e.target.value` and sets the caret **synchronously**, so
  React's re-render finds nothing to change and the caret survives. It only sets the selection while the input
  is focused, because Safari focuses an input when its selection is set.
- The previously rendered state is kept in a ref and updated in a layout effect, never during render.
  Object/function props (`formatChars`, `beforeMaskedValueChange`) are read through a latest-value ref, so
  `handleChange` stays stable.
- `MaskField` always renders a controlled `<input>`. It is controlled from the outside when `value !== undefined`,
  and otherwise uses internal state seeded from `defaultValue`. `onChange` gets the real event and is skipped when
  the masked value didn't change.
- Wrappers put their defaults (`type`, `inputMode`, `autoComplete`, `formatChars`) **before** `{...props}`, so
  callers can override them, and their fixed props (`mask`, `beforeMaskedValueChange`, `ref`) **after**.
  Destructure wrapper-only props so they never reach the DOM.
- `DateInput`/`TimeInput` validation is a `beforeMaskedValueChange` that runs the pure clamp functions in
  `dateTime.ts`. Those functions replace characters in place and never change the length, so the caret stays
  valid. `MaskField` re-conforms whatever a `beforeMaskedValueChange` returns.

## Code standards (enforced by tsconfig + ESLint, not convention)

- `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.
- **No `any`, no `as` type assertions, no `!`**, no `@ts-ignore`/`eslint-disable`. Narrow with `instanceof`,
  `in` and `typeof` instead.
- Public optional props are declared `prop?: T | undefined`, so consumers using `exactOptionalPropertyTypes`
  can pass `undefined`.
- Use `import type` for types. Prefer functional iteration (`map`/`filter`/`reduce`/`for..of`).
- Keep React 16.8 compatibility: no `useId`, `useSyncExternalStore` or other React 18+ APIs.
- Adding a runtime dependency needs a very strong reason. This package has zero.

## Tests

- **Never special-case test inputs in source code.** Earlier versions had `if (value === '123456') return ...`
  hacks in the engine and a patched `HTMLInputElement.value` in tests. That hid real bugs. A failing test means
  the code (or the test's expectation) is wrong.
- Engine logic gets pure unit tests (`src/__tests__/utils`). Component behaviour is tested the way a user acts,
  with `@testing-library/user-event` (`user.type`, `user.keyboard('{Backspace}')`, `user.paste`,
  `setSelectionRange` + typing).
- Don't assert on values you set yourself (`input.value = 'x'; expect(input.value).toBe('x')` tests jsdom,
  not this library).
- `src/__tests__/docs-examples.test.tsx` runs the README / `llms-full.txt` snippets. Change the docs and that
  test together.
- Get elements with `getInput()` from `src/test-utils/input.ts` (it narrows without a type assertion).

## Docs to keep in sync with behaviour changes

`README.md`, `llms.txt`, `llms-full.txt`, `skills/react-mask-field/SKILL.md`, `CHANGELOG.md`, `COMPONENTS.md`,
and the Storybook stories in `src/stories/`. The `llms*` files and the skill ship inside the npm package and are
copied into the Storybook site.
