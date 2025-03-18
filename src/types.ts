import { InputHTMLAttributes } from 'react';

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
    mask: string | Array<string | RegExp>;
    maskChar: string;
    formatChars?: FormatChars;
  }
) => {
  value: string;
  selection: {
    start: number | null;
    end: number | null;
  };
};

export interface MaskFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * Mask pattern. Default format characters are:
   * - 9: 0-9
   * - a: A-Z, a-z
   * - *: A-Z, a-z, 0-9
   * Any character can be escaped with backslash, e.g. \9
   */
  mask: string;

  /**
   * Character to cover unfilled parts of the mask. Default character is "_".
   * If set to null or empty string, unfilled parts will be empty.
   */
  maskChar?: string;

  /**
   * Defines format characters with a key-value map where keys are characters
   * and values are their corresponding RegExp strings.
   * Default: { '9': '[0-9]', 'a': '[A-Za-z]', '*': '[A-Za-z0-9]' }
   */
  formatChars?: FormatChars;

  /**
   * Show mask when input is empty and has no focus.
   */
  alwaysShowMask?: boolean;

  /**
   * Function that is called before masked value is changed.
   * Can be used to modify the masked value or selection.
   */
  beforeMaskedValueChange?: BeforeMaskedValueChangeFunction;

  /**
   * Called when input value changes.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Character used for placeholders in mask pattern.
   */
  placeholderChar?: string;

  /**
   * Show a placeholder with a different color for unfilled positions.
   */
  showPlaceholder?: boolean;

  /**
   * Color for the placeholder characters.
   */
  placeholderColor?: string;

  /**
   * If true, the input will be marked as having an error.
   */
  error?: boolean;

  /**
   * Helper text to display below the input.
   */
  helperText?: React.ReactNode;

  /**
   * Color for the error state border and text.
   * Default is '#d32f2f' (red).
   */
  errorColor?: string;

  /**
   * Custom styles for the helper text container.
   */
  helperTextStyle?: React.CSSProperties;
}
