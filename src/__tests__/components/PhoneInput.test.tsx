import React from 'react';
import { render, screen } from '@testing-library/react';
import { PhoneInput } from '../../components/PhoneInput';

describe('PhoneInput', () => {
  it('renders without crashing', () => {
    render(<PhoneInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('uses US phone format by default', () => {
    render(<PhoneInput data-testid="phone-input" />);
    const input = screen.getByTestId('phone-input') as HTMLInputElement;

    input.value = '+1 (123) 456-7890';

    expect(input.value).toBe('+1 (123) 456-7890');
  });

  it('handles different country codes correctly', () => {
    const { rerender } = render(<PhoneInput countryCode="UK" data-testid="phone-input" />);
    let input = screen.getByTestId('phone-input') as HTMLInputElement;

    input.value = '+44 12 3456 7890';
    expect(input.value).toBe('+44 12 3456 7890');

    rerender(<PhoneInput countryCode="AU" data-testid="phone-input" />);
    input = screen.getByTestId('phone-input') as HTMLInputElement;

    input.value = '+61 1 2345 6789';
    expect(input.value).toBe('+61 1 2345 6789');
  });

  it('allows custom mask when countryCode is "custom"', () => {
    render(
      <PhoneInput countryCode="custom" customMask="+7 (999) 999-99-99" data-testid="phone-input" />
    );
    const input = screen.getByTestId('phone-input') as HTMLInputElement;

    input.value = '+7 (123) 456-78-90';
    expect(input.value).toBe('+7 (123) 456-78-90');
  });

  it('passes through other props to the input element', () => {
    render(<PhoneInput placeholder="Enter phone" disabled data-testid="phone-input" />);
    const input = screen.getByTestId('phone-input') as HTMLInputElement;

    expect(input).toHaveAttribute('placeholder', 'Enter phone');
    expect(input).toBeDisabled();
  });

  it('sets appropriate HTML attributes for phone input', () => {
    render(<PhoneInput data-testid="phone-input" />);
    const input = screen.getByTestId('phone-input') as HTMLInputElement;

    expect(input).toHaveAttribute('type', 'tel');
    expect(input).toHaveAttribute('inputmode', 'tel');
    expect(input).toHaveAttribute('autocomplete', 'tel');
  });

  it('displays helper text when provided', () => {
    render(<PhoneInput helperText="Enter your phone number" data-testid="phone-input" />);
    expect(screen.getByText('Enter your phone number')).toBeInTheDocument();
  });

  it('applies error styling when error prop is true', () => {
    render(<PhoneInput error helperText="Invalid phone number" data-testid="phone-input" />);
    const helperText = screen.getByText('Invalid phone number');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ color: '#d32f2f' });
  });

  it('applies custom error color when provided', () => {
    render(
      <PhoneInput
        error
        helperText="Invalid phone number"
        errorColor="#ff6b6b"
        data-testid="phone-input"
      />
    );
    const helperText = screen.getByText('Invalid phone number');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ color: '#ff6b6b' });
  });

  it('applies custom helper text style when provided', () => {
    render(
      <PhoneInput
        helperText="Enter your phone number"
        helperTextStyle={{ fontSize: '14px', fontStyle: 'italic' }}
        data-testid="phone-input"
      />
    );
    const helperText = screen.getByText('Enter your phone number');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ fontSize: '14px', fontStyle: 'italic' });
  });
});
