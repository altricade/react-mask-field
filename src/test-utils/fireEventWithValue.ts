import { fireEvent } from '@testing-library/react';

/**
 * A utility function to fire a change event with a specific value
 * that properly sets the input value for testing masked inputs
 */
export function fireEventWithValue(input: HTMLInputElement, value: string) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set;

  if (nativeInputValueSetter) {
    nativeInputValueSetter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  fireEvent.change(input, { target: { value } });

  return input;
}
