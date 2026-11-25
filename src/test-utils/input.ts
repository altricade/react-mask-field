import { screen } from '@testing-library/react';

/** The single textbox on screen, narrowed to HTMLInputElement (no type assertions). */
export function getInput(): HTMLInputElement {
  const element = screen.getByRole('textbox');
  if (!(element instanceof HTMLInputElement)) throw new Error('Expected an <input> element');
  return element;
}

/** Collect React warnings (unknown DOM props, controlled/uncontrolled switches, ...). */
export function captureConsoleErrors(): { calls: unknown[][]; restore: () => void } {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  return {
    calls: spy.mock.calls,
    restore: () => {
      spy.mockRestore();
    },
  };
}
