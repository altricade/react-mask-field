import type { ChangeEvent, CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

export type FormatChars = {
  [key: string]: string;
};

export type BeforeMaskedValueChangeFunction = (
  newState: {
    value: string;
    selection: {
      start: number | null;
      end: number | null;
    };
  },
  oldState: {
    value: string;
    selection: {
      start: number | null;
      end: number | null;
    };
  },
  userInput: string | null,
  maskOptions: {
    mask: string;
    maskChar: string;
    formatChars: FormatChars;
  }
) => {
  value: string;
  selection: {
    start: number | null;
    end: number | null;
  };
};

export interface MaskFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'placeholder'> {
  /**
   * Mask pattern. Default format characters are:
   * - 9: 0-9
   * - a: A-Z, a-z
   * - *: A-Z, a-z, 0-9
   * Any character can be escaped with a backslash to make it literal, e.g. `+\\91 99999 99999`.
   * An empty mask disables masking.
   */
  mask: string;

  /**
   * Value — controlled when provided. Accepts masked (`(555) 123-4567`) or
   * unmasked (`5551234567`) strings; it is always rendered conformed to the mask.
   */
  value?: string | number | readonly string[] | undefined;

  /**
   * Character shown in empty slots when `alwaysShowMask` is on, and the default
   * character of the generated placeholder. Default `_`. Only the first
   * character is used. It should not be a character users can type into a slot.
   */
  maskChar?: string | undefined;

  /**
   * Map of mask characters to single-character RegExp sources. Each pattern is
   * anchored and tested against one character.
   * Default: `{ '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' }`
   */
  formatChars?: Readonly<FormatChars> | undefined;

  /**
   * Render the whole mask (empty slots as `maskChar`) at all times. By default
   * only what was typed is rendered and the mask shows as the placeholder.
   */
  alwaysShowMask?: boolean | undefined;

  /**
   * Called after each edit, before the value is applied. Return a new state to
   * change the value or selection; the returned value is re-conformed to the mask.
   */
  beforeMaskedValueChange?: BeforeMaskedValueChangeFunction | undefined;

  /**
   * Called when the value changes. `event.target` is the real input element, so
   * `event.target.value` is the masked value and `event.target.name` is preserved.
   */
  onChange?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;

  /**
   * Placeholder text. Defaults to the mask template, e.g. `(___) ___-____`.
   */
  placeholder?: string | undefined;

  /**
   * Character used in the generated placeholder. Defaults to `maskChar`.
   */
  placeholderChar?: string | undefined;

  /**
   * Generate a placeholder from the mask when `placeholder` is not set. Default true.
   */
  showPlaceholder?: boolean | undefined;

  /**
   * @deprecated Has never had an effect and is ignored. Style the placeholder
   * with the CSS `::placeholder` pseudo-element instead.
   */
  placeholderColor?: string | undefined;

  /**
   * Marks the input as invalid: applies `errorColor` to the border and helper
   * text and sets `aria-invalid`.
   */
  error?: boolean | undefined;

  /**
   * Helper text displayed below the input. When the input has an `id`, it is
   * linked through `aria-describedby`.
   */
  helperText?: ReactNode | undefined;

  /**
   * Colour for the error border and helper text. Default `#d32f2f`.
   */
  errorColor?: string | undefined;

  /**
   * Custom styles for the helper text container.
   */
  helperTextStyle?: CSSProperties | undefined;
}
