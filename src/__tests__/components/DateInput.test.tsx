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

    input.value = '12/25/2023';
    expect(input.value).toBe('12/25/2023');
  });

  it('handles different date formats correctly', () => {
    const { rerender } = render(<DateInput format="DD/MM/YYYY" data-testid="date-input" />);
    let input = screen.getByTestId('date-input') as HTMLInputElement;

    input.value = '25/12/2023';
    expect(input.value).toBe('25/12/2023');

    rerender(<DateInput format="YYYY-MM-DD" data-testid="date-input" />);
    input = screen.getByTestId('date-input') as HTMLInputElement;

    input.value = '2023-12-25';
    expect(input.value).toBe('2023-12-25');
  });

  it('allows custom separator', () => {
    render(<DateInput format="MM/DD/YYYY" separator="." data-testid="date-input" />);
    const input = screen.getByTestId('date-input') as HTMLInputElement;

    input.value = '12.25.2023';
    expect(input.value).toBe('12.25.2023');
  });

  it('validates date when enableDateValidation is true', () => {
    render(<DateInput enableDateValidation data-testid="date-input" />);
    const input = screen.getByTestId('date-input') as HTMLInputElement;

    input.value = '12/25/2023';
    expect(input.value).toBe('12/25/2023');

    input.value = '02/28/2023';
    expect(input.value).toBe('02/28/2023');
  });

  it('does not validate date when enableDateValidation is false', () => {
    render(<DateInput enableDateValidation={false} data-testid="date-input" />);
    const input = screen.getByTestId('date-input') as HTMLInputElement;

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

  it('displays helper text when provided', () => {
    render(<DateInput helperText="Enter a valid date" data-testid="date-input" />);
    expect(screen.getByText('Enter a valid date')).toBeInTheDocument();
  });

  it('applies error styling when error prop is true', () => {
    render(<DateInput error helperText="Invalid date" data-testid="date-input" />);
    const helperText = screen.getByText('Invalid date');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ color: '#d32f2f' });
  });

  it('applies custom error color when provided', () => {
    render(
      <DateInput error helperText="Invalid date" errorColor="#ff6b6b" data-testid="date-input" />
    );
    const helperText = screen.getByText('Invalid date');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ color: '#ff6b6b' });
  });

  it('applies custom helper text style when provided', () => {
    render(
      <DateInput
        helperText="Enter a valid date"
        helperTextStyle={{ fontSize: '14px', fontStyle: 'italic' }}
        data-testid="date-input"
      />
    );
    const helperText = screen.getByText('Enter a valid date');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ fontSize: '14px', fontStyle: 'italic' });
  });
});
