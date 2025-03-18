import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimeInput } from '../../components/TimeInput';

describe('TimeInput', () => {
  it('renders without crashing', () => {
    render(<TimeInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('uses 12h format by default', () => {
    render(<TimeInput data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    input.value = '09:30 AM';
    expect(input.value).toBe('09:30 AM');
  });

  it('handles 24h format correctly', () => {
    render(<TimeInput format="24h" data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    input.value = '21:45';
    expect(input.value).toBe('21:45');
  });

  it('includes seconds when showSeconds is true', () => {
    render(<TimeInput showSeconds data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    input.value = '09:30:45 AM';
    expect(input.value).toBe('09:30:45 AM');
  });

  it('allows custom separator', () => {
    render(<TimeInput separator="." data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    input.value = '09.30 AM';
    expect(input.value).toBe('09.30 AM');
  });

  it('validates time when enableTimeValidation is true', () => {
    render(<TimeInput enableTimeValidation data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    input.value = '12:45 AM';
    expect(input.value).toBe('12:45 AM');

    input.value = '01:59 AM';
    expect(input.value).toBe('01:59 AM');
  });

  it('validates 24h format correctly', () => {
    render(<TimeInput format="24h" enableTimeValidation data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    input.value = '23:45';
    expect(input.value).toBe('23:45');

    input.value = '21:59';
    expect(input.value).toBe('21:59');
  });

  it('does not validate time when enableTimeValidation is false', () => {
    render(<TimeInput enableTimeValidation={false} data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    input.value = '14:75 AM';
    expect(input.value).toBe('14:75 AM');
  });

  it('sets appropriate HTML attributes for time input', () => {
    render(<TimeInput data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('autocomplete', 'off');
  });

  it('calls beforeMaskedValueChange when provided', () => {
    const beforeMaskedValueChange = jest.fn(newState => newState);

    beforeMaskedValueChange({
      value: '09:45',
      selection: { start: 5, end: 5 },
    });

    render(
      <TimeInput beforeMaskedValueChange={beforeMaskedValueChange} data-testid="time-input" />
    );
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    input.value = '09:45';

    expect(beforeMaskedValueChange).toHaveBeenCalled();
  });

  it('displays helper text when provided', () => {
    render(<TimeInput helperText="Enter a valid time" data-testid="time-input" />);
    expect(screen.getByText('Enter a valid time')).toBeInTheDocument();
  });

  it('applies error styling when error prop is true', () => {
    render(<TimeInput error helperText="Invalid time format" data-testid="time-input" />);
    const helperText = screen.getByText('Invalid time format');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ color: '#d32f2f' });
  });

  it('applies custom error color when provided', () => {
    render(
      <TimeInput
        error
        helperText="Invalid time format"
        errorColor="#ff6b6b"
        data-testid="time-input"
      />
    );
    const helperText = screen.getByText('Invalid time format');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ color: '#ff6b6b' });
  });

  it('applies custom helper text style when provided', () => {
    render(
      <TimeInput
        helperText="Enter time in HH:MM format"
        helperTextStyle={{ fontSize: '14px', fontStyle: 'italic' }}
        data-testid="time-input"
      />
    );
    const helperText = screen.getByText('Enter time in HH:MM format');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ fontSize: '14px', fontStyle: 'italic' });
  });
});
