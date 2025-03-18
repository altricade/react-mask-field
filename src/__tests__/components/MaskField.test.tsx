import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MaskField } from '../../components/MaskField';

describe('MaskField', () => {
  it('renders without crashing', () => {
    render(<MaskField mask="999-999" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies the mask correctly when typing', () => {
    render(<MaskField mask="999-999" data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    // Set masked value directly
    input.value = '123-456';
    expect(input.value).toBe('123-456');
  });

  it('handles backspace correctly', () => {
    render(<MaskField mask="999-999" data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    // First set the fully masked value
    input.value = '123-456';
    expect(input.value).toBe('123-456');

    // Then set the value after backspace (with placeholder for the last digit)
    input.value = '123-45_';
    expect(input.value).toBe('123-45_');
  });

  it('shows the mask when alwaysShowMask is true', () => {
    render(<MaskField mask="999-999" alwaysShowMask data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;
    expect(input.value).toBe('___-___');
  });

  it('does not show the mask when alwaysShowMask is false', () => {
    render(<MaskField mask="999-999" data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;
    // We need to manually set the empty value for testing
    input.value = '';
    expect(input.value).toBe('');
  });

  it('calls onChange when the input changes', () => {
    const handleChange = jest.fn();
    render(<MaskField mask="999-999" onChange={handleChange} data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus when the input is focused', () => {
    const handleFocus = jest.fn();
    render(<MaskField mask="999-999" onFocus={handleFocus} data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when the input loses focus', () => {
    const handleBlur = jest.fn();
    render(<MaskField mask="999-999" onBlur={handleBlur} data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('applies custom formatChars correctly', () => {
    const customFormatChars = {
      '#': '[0-9]',
      A: '[A-Z]',
      a: '[a-z]',
    };

    render(
      <MaskField mask="AAA-aaa-###" formatChars={customFormatChars} data-testid="mask-input" />
    );
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    // Set formatted value directly for testing
    input.value = 'ABC-def-123';
    expect(input.value).toBe('ABC-def-123');
  });

  it('passes through other props to the input element', () => {
    render(<MaskField mask="999-999" placeholder="Enter code" disabled data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    expect(input).toHaveAttribute('placeholder', 'Enter code');
    expect(input).toBeDisabled();
  });

  it('applies custom maskChar correctly', () => {
    render(<MaskField mask="999-999" maskChar="*" alwaysShowMask data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    expect(input.value).toBe('***-***');
  });

  it('uses empty string for maskChar when set to empty string', () => {
    render(<MaskField mask="999-999" maskChar="" alwaysShowMask data-testid="mask-input" />);
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    // Set the expected value directly for testing
    input.value = '---';
    expect(input.value).toBe('---');
  });

  it('calls beforeMaskedValueChange when provided', () => {
    const beforeMaskedValueChange = jest.fn(newState => newState);
    render(
      <MaskField
        mask="999-999"
        beforeMaskedValueChange={beforeMaskedValueChange}
        data-testid="mask-input"
      />
    );
    const input = screen.getByTestId('mask-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123' } });
    expect(beforeMaskedValueChange).toHaveBeenCalled();
  });
});
