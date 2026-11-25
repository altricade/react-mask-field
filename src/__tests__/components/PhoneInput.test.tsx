import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PhoneInput } from '../../components/PhoneInput';
import { getInput } from '../../test-utils/input';

describe('PhoneInput', () => {
  it('defaults to the RU format', async () => {
    const user = userEvent.setup();
    render(<PhoneInput />);
    expect(getInput().placeholder).toBe('+7 (___)___-____');
    await user.type(getInput(), '9161234567');
    expect(getInput()).toHaveValue('+7 (916)123-4567');
  });

  it.each([
    ['US', '1234567890', '+1 (123) 456-7890'],
    ['CA', '4165551234', '+1 (416) 555-1234'],
    ['UK', '7911123456', '+44 79 1112 3456'],
    ['AU', '412345678', '+61 4 1234 5678'],
    ['IN', '9876543210', '+91 98765 43210'],
  ] as const)(
    'formats %s numbers without swallowing prefix digits',
    async (countryCode, typed, expected) => {
      const user = userEvent.setup();
      render(<PhoneInput countryCode={countryCode} />);
      await user.type(getInput(), typed);
      expect(getInput()).toHaveValue(expected);
    }
  );

  it('keeps the escaped 9 of +91 out of the placeholder slots', () => {
    render(<PhoneInput countryCode="IN" />);
    expect(getInput().placeholder).toBe('+91 _____ _____');
  });

  it('uses customMask for countryCode="custom"', async () => {
    const user = userEvent.setup();
    render(<PhoneInput countryCode="custom" customMask="+7 (999) 999-99-99" />);
    await user.type(getInput(), '9161234567');
    expect(getInput()).toHaveValue('+7 (916) 123-45-67');
  });

  it('falls back to the US mask for "custom" without customMask', () => {
    render(<PhoneInput countryCode="custom" />);
    expect(getInput().placeholder).toBe('+1 (___) ___-____');
  });

  it('works uncontrolled (no value prop)', async () => {
    const user = userEvent.setup();
    render(<PhoneInput countryCode="US" />);
    await user.type(getInput(), '555');
    expect(getInput()).toHaveValue('+1 (555');
  });

  it('formats a controlled value given as digits or as a formatted number', () => {
    const { rerender } = render(<PhoneInput countryCode="US" value="5551234567" />);
    expect(getInput()).toHaveValue('+1 (555) 123-4567');
    rerender(<PhoneInput countryCode="US" value="+1 (555) 765-4321" />);
    expect(getInput()).toHaveValue('+1 (555) 765-4321');
  });

  it('re-formats when the country changes', () => {
    const { rerender } = render(<PhoneInput countryCode="US" value="4165551234" />);
    rerender(<PhoneInput countryCode="RU" value="4165551234" />);
    expect(getInput()).toHaveValue('+7 (416)555-1234');
  });

  it('sets phone input attributes, overridable by the caller', () => {
    const { rerender } = render(<PhoneInput />);
    expect(getInput()).toHaveAttribute('type', 'tel');
    expect(getInput()).toHaveAttribute('inputmode', 'tel');
    expect(getInput()).toHaveAttribute('autocomplete', 'tel');
    rerender(<PhoneInput autoComplete="off" />);
    expect(getInput()).toHaveAttribute('autocomplete', 'off');
  });

  it('does not leak countryCode/customMask to the DOM', () => {
    render(<PhoneInput countryCode="custom" customMask="99" />);
    expect(getInput()).not.toHaveAttribute('countrycode');
    expect(getInput()).not.toHaveAttribute('custommask');
  });

  it('supports error and helper text', () => {
    render(<PhoneInput error helperText="Invalid phone" />);
    expect(screen.getByText('Invalid phone')).toHaveStyle({ color: '#d32f2f' });
  });
});
