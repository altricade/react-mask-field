import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CreditCardInput, type CardType } from '../../components/CreditCardInput';
import { getInput } from '../../test-utils/input';

async function typeInto(ui: React.ReactElement, text: string): Promise<string> {
  const user = userEvent.setup();
  render(ui);
  await user.type(getInput(), text);
  return getInput().value;
}

describe('CreditCardInput', () => {
  it.each([
    ['visa', '4111111111111111', '4111 1111 1111 1111'],
    ['mastercard (5-series)', '5555555555554444', '5555 5555 5555 4444'],
    ['mastercard (2-series)', '2221000000000009', '2221 0000 0000 0009'],
    ['amex: 15 digits, 4-6-5', '378282246310005', '3782 822463 10005'],
    ['diners: 14 digits, 4-6-4', '30569309025904', '3056 930902 5904'],
    ['discover', '6011111111111117', '6011 1111 1111 1117'],
  ])('formats %s', async (_label, typed, expected) => {
    expect(await typeInto(<CreditCardInput />, typed)).toBe(expected);
  });

  it('caps an amex number at 15 digits', async () => {
    expect(await typeInto(<CreditCardInput />, '3782822463100059999')).toBe('3782 822463 10005');
  });

  it('reports card type changes once per change, including clearing', async () => {
    const user = userEvent.setup();
    const changes: Array<CardType | null> = [];
    render(
      <CreditCardInput
        onCardTypeChange={type => {
          changes.push(type);
        }}
      />
    );
    await user.type(getInput(), '41');
    await user.clear(getInput());
    await user.type(getInput(), '37');
    expect(changes).toEqual(['visa', null, 'other', 'amex']);
  });

  it.each([
    ['4', 'visa'],
    ['51', 'mastercard'],
    ['34', 'amex'],
    ['6011', 'discover'],
    ['622126', 'discover'],
    ['36', 'diners'],
    ['35', 'jcb'],
    ['62', 'unionpay'],
    ['9', 'other'],
  ] as const)('detects %s as %s', async (typed, expected) => {
    const onCardTypeChange = jest.fn();
    await typeInto(<CreditCardInput onCardTypeChange={onCardTypeChange} />, typed);
    expect(onCardTypeChange).toHaveBeenLastCalledWith(expected);
  });

  it('does not re-notify when the parent re-renders with a new inline callback', () => {
    const calls: Array<CardType | null> = [];
    const { rerender } = render(
      <CreditCardInput
        value="4111"
        onCardTypeChange={t => {
          calls.push(t);
        }}
      />
    );
    rerender(
      <CreditCardInput
        value="4111"
        onCardTypeChange={t => {
          calls.push(t);
        }}
      />
    );
    rerender(
      <CreditCardInput
        value="4111"
        onCardTypeChange={t => {
          calls.push(t);
        }}
      />
    );
    expect(calls).toEqual(['visa']);
  });

  it('uses and reports a forced cardType', async () => {
    const onCardTypeChange = jest.fn();
    const value = await typeInto(
      <CreditCardInput cardType="amex" onCardTypeChange={onCardTypeChange} />,
      '4111111111111111'
    );
    expect(value).toBe('4111 111111 11111');
    expect(onCardTypeChange).toHaveBeenCalledTimes(1);
    expect(onCardTypeChange).toHaveBeenCalledWith('amex');
  });

  it('uses the default mask and reports nothing when detection is off', async () => {
    const onCardTypeChange = jest.fn();
    const value = await typeInto(
      <CreditCardInput detectCardType={false} onCardTypeChange={onCardTypeChange} />,
      '378282246310005'
    );
    expect(value).toBe('3782 8224 6310 005');
    expect(onCardTypeChange).not.toHaveBeenCalled();
  });

  it('follows controlled value updates', () => {
    const onCardTypeChange = jest.fn();
    const { rerender } = render(
      <CreditCardInput value="4111" onCardTypeChange={onCardTypeChange} />
    );
    expect(getInput()).toHaveValue('4111');
    rerender(<CreditCardInput value="378282246310005" onCardTypeChange={onCardTypeChange} />);
    expect(getInput()).toHaveValue('3782 822463 10005');
    expect(onCardTypeChange).toHaveBeenLastCalledWith('amex');
  });

  it('formats a pasted amex number with the amex mask right away', async () => {
    const user = userEvent.setup();
    const values: string[] = [];
    render(
      <CreditCardInput
        onChange={e => {
          values.push(e.target.value);
        }}
      />
    );
    await user.click(getInput());
    await user.paste('3782 8224 6310 005');
    expect(getInput()).toHaveValue('3782 822463 10005');
    // onChange already sees the value in the new mask
    expect(values).toEqual(['3782 822463 10005']);
  });

  it('keeps all 16 digits when a visa number is pasted over an amex number', async () => {
    const user = userEvent.setup();
    render(<CreditCardInput defaultValue="378282246310005" />);
    const input = getInput();
    await user.click(input);
    input.setSelectionRange(0, input.value.length);
    await user.paste('4111111111111111');
    expect(input).toHaveValue('4111 1111 1111 1111');
  });

  it('works in a controlled parent', async () => {
    const user = userEvent.setup();
    function Parent() {
      const [card, setCard] = useState('');
      return (
        <>
          <CreditCardInput
            value={card}
            onChange={e => {
              setCard(e.target.value);
            }}
          />
          <output data-testid="state">{card}</output>
        </>
      );
    }
    render(<Parent />);
    await user.type(getInput(), '378282246310005');
    expect(screen.getByTestId('state')).toHaveTextContent('3782 822463 10005');
  });

  it('calls a user onChangeCapture', async () => {
    const onChangeCapture = jest.fn();
    await typeInto(<CreditCardInput onChangeCapture={onChangeCapture} />, '4');
    expect(onChangeCapture).toHaveBeenCalledTimes(1);
  });

  it('sets card input attributes and no maxLength', () => {
    render(<CreditCardInput />);
    const input = getInput();
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('autocomplete', 'cc-number');
    expect(input).toHaveAttribute('type', 'tel');
    expect(input).not.toHaveAttribute('maxlength');
    expect(input.placeholder).toBe('____ ____ ____ ____');
  });

  it('does not leak card props to the DOM', () => {
    render(<CreditCardInput cardType="visa" detectCardType onCardTypeChange={() => undefined} />);
    ['cardtype', 'detectcardtype', 'oncardtypechange'].forEach(attribute => {
      expect(getInput()).not.toHaveAttribute(attribute);
    });
  });

  it('supports error and helper text', () => {
    render(<CreditCardInput error helperText="Invalid card" />);
    expect(screen.getByText('Invalid card')).toHaveStyle({ color: '#d32f2f' });
  });
});
