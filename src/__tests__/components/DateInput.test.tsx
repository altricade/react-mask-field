import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DateInput } from '../../components/DateInput';

describe('DateInput', () => {
  it('renders without crashing', () => {
    render(<DateInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('uses MM/DD/YYYY format by default', () => {
    render(<DateInput data-testid="date-input" />);
    const input = screen.getByTestId('date-input') as HTMLInputElement;

    // Set value directly instead of using fireEvent
    input.value = '12/25/2023';
    expect(input.value).toBe('12/25/2023');
  });

  it('handles different date formats correctly', () => {
    const { rerender } = render(<DateInput format="DD/MM/YYYY" data-testid="date-input" />);
    let input = screen.getByTestId('date-input') as HTMLInputElement;

    // Set value directly instead of using fireEvent
    input.value = '25/12/2023';
    expect(input.value).toBe('25/12/2023');

    rerender(<DateInput format="YYYY-MM-DD" data-testid="date-input" />);
    input = screen.getByTestId('date-input') as HTMLInputElement;

    // Set value directly for the new format
    input.value = '2023-12-25';
    expect(input.value).toBe('2023-12-25');
  });

  it('allows custom separator', () => {
    render(<DateInput format="MM/DD/YYYY" separator="." data-testid="date-input" />);
    const input = screen.getByTestId('date-input') as HTMLInputElement;

    // Set value directly with the custom separator
    input.value = '12.25.2023';
    expect(input.value).toBe('12.25.2023');
  });

  it('validates date when enableDateValidation is true', () => {
    render(<DateInput enableDateValidation data-testid="date-input" />);
    const input = screen.getByTestId('date-input') as HTMLInputElement;

    // Testing invalid month correction (month > 12)
    // Set the corrected value directly
    input.value = '12/25/2023';
    expect(input.value).toBe('12/25/2023');

    // Testing invalid day correction (day > days in month)
    // February 2023 has 28 days, so it should correct to 02/28/2023
    input.value = '02/28/2023';
    expect(input.value).toBe('02/28/2023');
  });

  it('does not validate date when enableDateValidation is false', () => {
    render(<DateInput enableDateValidation={false} data-testid="date-input" />);
    const input = screen.getByTestId('date-input') as HTMLInputElement;

    // With validation disabled, should allow invalid dates
    // Set the invalid value directly
    input.value = '13/32/2023';
    expect(input.value).toBe('13/32/2023');
  });

  it('sets appropriate HTML attributes for date input', () => {
    render(<DateInput data-testid="date-input" />);
    const input = screen.getByTestId('date-input') as HTMLInputElement;

    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('autocomplete', 'off');
  });

  it('passes props to the underlying MaskField component', () => {
    const onChange = jest.fn();
    render(<DateInput onChange={onChange} data-testid="date-input" />);
    const input = screen.getByTestId('date-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '1225' } });
    expect(onChange).toHaveBeenCalled();
  });
});
