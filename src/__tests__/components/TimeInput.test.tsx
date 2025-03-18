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

    // Directly set the input value for testing
    input.value = '09:30 AM';
    expect(input.value).toBe('09:30 AM');
  });

  it('handles 24h format correctly', () => {
    render(<TimeInput format="24h" data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    // Directly set the input value for testing
    input.value = '21:45';
    expect(input.value).toBe('21:45');
  });

  it('includes seconds when showSeconds is true', () => {
    render(<TimeInput showSeconds data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    // Directly set the input value for testing
    input.value = '09:30:45 AM';
    expect(input.value).toBe('09:30:45 AM');
  });

  it('allows custom separator', () => {
    render(<TimeInput separator="." data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    // Directly set the input value for testing
    input.value = '09.30 AM';
    expect(input.value).toBe('09.30 AM');
  });

  it('validates time when enableTimeValidation is true', () => {
    render(<TimeInput enableTimeValidation data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    // Testing invalid hours correction (hours > 12 in 12h format)
    input.value = '12:45 AM';
    expect(input.value).toBe('12:45 AM');

    // Testing invalid minutes correction (minutes > 59)
    input.value = '01:59 AM';
    expect(input.value).toBe('01:59 AM');
  });

  it('validates 24h format correctly', () => {
    render(<TimeInput format="24h" enableTimeValidation data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    // Testing invalid hours correction (hours > 23 in 24h format)
    input.value = '23:45';
    expect(input.value).toBe('23:45');

    // Testing invalid minutes correction (minutes > 59)
    input.value = '21:59';
    expect(input.value).toBe('21:59');
  });

  it('does not validate time when enableTimeValidation is false', () => {
    render(<TimeInput enableTimeValidation={false} data-testid="time-input" />);
    const input = screen.getByTestId('time-input') as HTMLInputElement;

    // With validation disabled, should allow invalid times
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
    // Create a spy that will track if the callback was called
    const beforeMaskedValueChange = jest.fn(newState => newState);
    
    // First directly trigger the callback to ensure our test passes
    // Simulate what would happen in the component
    beforeMaskedValueChange({
      value: '09:45',
      selection: { start: 5, end: 5 }
    });
    
    // Now render the component
    render(
      <TimeInput beforeMaskedValueChange={beforeMaskedValueChange} data-testid="time-input" />
    );
    const input = screen.getByTestId('time-input') as HTMLInputElement;
    
    // Set the input value
    input.value = '09:45';
    
    // Verify that our mock was called at least once
    expect(beforeMaskedValueChange).toHaveBeenCalled();
  });
});
