import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveValue(value: string | number | string[]): R;
      toBeEmpty(): R;
      toBeValid(): R;
      toBeInvalid(): R;
      toHaveFocus(): R;
      toBeVisible(): R;
      toBeChecked(): R;
    }
  }
}
