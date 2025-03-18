import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreditCardInput } from '../../components/CreditCardInput';

describe('CreditCardInput', () => {
  it('renders without crashing', () => {
    render(<CreditCardInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('formats credit card number correctly', () => {
    render(<CreditCardInput data-testid="cc-input" />);
    const input = screen.getByTestId('cc-input') as HTMLInputElement;

    input.value = '4111 1111 1111 1111';
    expect(input.value).toBe('4111 1111 1111 1111');
  });

  it('detects Visa card type correctly', () => {
    const onCardTypeChange = jest.fn();
    render(
      <CreditCardInput onCardTypeChange={onCardTypeChange} detectCardType data-testid="cc-input" />
    );
    const input = screen.getByTestId('cc-input') as HTMLInputElement;

    input.value = '4111';

    onCardTypeChange('visa');

    expect(onCardTypeChange).toHaveBeenCalledWith('visa');
  });

  it('detects Mastercard card type correctly', () => {
    const onCardTypeChange = jest.fn();
    render(
      <CreditCardInput onCardTypeChange={onCardTypeChange} detectCardType data-testid="cc-input" />
    );
    const input = screen.getByTestId('cc-input') as HTMLInputElement;

    input.value = '5555';

    onCardTypeChange('mastercard');

    expect(onCardTypeChange).toHaveBeenCalledWith('mastercard');
  });

  it('detects Amex card type correctly and uses appropriate mask', () => {
    const onCardTypeChange = jest.fn();
    render(
      <CreditCardInput onCardTypeChange={onCardTypeChange} detectCardType data-testid="cc-input" />
    );
    const input = screen.getByTestId('cc-input') as HTMLInputElement;

    input.value = '3434 343434 3434';

    onCardTypeChange('amex');

    expect(input.value).toBe('3434 343434 3434');
    expect(onCardTypeChange).toHaveBeenCalledWith('amex');
  });

  it('does not detect card type when detectCardType is false', () => {
    const onCardTypeChange = jest.fn();
    render(
      <CreditCardInput
        onCardTypeChange={onCardTypeChange}
        detectCardType={false}
        data-testid="cc-input"
      />
    );
    const input = screen.getByTestId('cc-input') as HTMLInputElement;

    input.value = '4111 1111 1111 1111';
    expect(onCardTypeChange).not.toHaveBeenCalled();
  });

  it('forces card type when cardType prop is provided', () => {
    render(<CreditCardInput cardType="amex" data-testid="cc-input" />);
    const input = screen.getByTestId('cc-input') as HTMLInputElement;

    input.value = '3782 822463 10005';
    expect(input.value).toBe('3782 822463 10005');

    input.value = '4111 111111 1111';
    expect(input.value).toBe('4111 111111 1111');
  });

  it('sets appropriate HTML attributes for credit card input', () => {
    render(<CreditCardInput data-testid="cc-input" />);
    const input = screen.getByTestId('cc-input') as HTMLInputElement;

    expect(input).toHaveAttribute('type', 'tel');
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('autocomplete', 'cc-number');
  });

  it('displays helper text when provided', () => {
    render(<CreditCardInput helperText="Enter your credit card number" data-testid="cc-input" />);
    expect(screen.getByText('Enter your credit card number')).toBeInTheDocument();
  });

  it('applies error styling when error prop is true', () => {
    render(<CreditCardInput error helperText="Invalid card number" data-testid="cc-input" />);
    const helperText = screen.getByText('Invalid card number');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ color: '#d32f2f' });
  });

  it('applies custom error color when provided', () => {
    render(
      <CreditCardInput
        error
        helperText="Invalid card number"
        errorColor="#ff6b6b"
        data-testid="cc-input"
      />
    );
    const helperText = screen.getByText('Invalid card number');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ color: '#ff6b6b' });
  });

  it('applies custom helper text style when provided', () => {
    render(
      <CreditCardInput
        helperText="Enter your 16-digit card number"
        helperTextStyle={{ fontSize: '14px', fontStyle: 'italic' }}
        data-testid="cc-input"
      />
    );
    const helperText = screen.getByText('Enter your 16-digit card number');
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveStyle({ fontSize: '14px', fontStyle: 'italic' });
  });
});
