import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateInput } from '../../components/DateInput';
import { getInput } from '../../test-utils/input';

async function typeInto(ui: React.ReactElement, text: string): Promise<string> {
  const user = userEvent.setup();
  render(ui);
  await user.type(getInput(), text);
  return getInput().value;
}

describe('DateInput', () => {
  it('uses MM/DD/YYYY by default', async () => {
    expect(await typeInto(<DateInput />, '12252023')).toBe('12/25/2023');
    expect(getInput().placeholder).toBe('__/__/____');
  });

  it.each([
    ['DD/MM/YYYY', undefined, '25122023', '25/12/2023'],
    ['YYYY-MM-DD', undefined, '20231225', '2023-12-25'],
    ['MM-DD-YYYY', undefined, '12252023', '12-25-2023'],
    ['DD-MM-YYYY', undefined, '25122023', '25-12-2023'],
    ['MM/DD/YYYY', '.', '12252023', '12.25.2023'],
    ['YYYY-MM-DD', '/', '20231225', '2023/12/25'],
  ] as const)('format %s with separator %s', async (format, separator, typed, expected) => {
    expect(await typeInto(<DateInput format={format} separator={separator} />, typed)).toBe(
      expected
    );
  });

  describe('validation', () => {
    it('clamps the month to 12 and 00 to 01', async () => {
      expect(await typeInto(<DateInput />, '13')).toBe('12');
    });

    it('clamps month 00 to 01', async () => {
      expect(await typeInto(<DateInput />, '00')).toBe('01');
    });

    it('clamps the day to the days in the month', async () => {
      expect(await typeInto(<DateInput />, '0431')).toBe('04/30');
    });

    it('clamps day 00 to 01', async () => {
      expect(await typeInto(<DateInput />, '0100')).toBe('01/01');
    });

    it('allows Feb 29 until the year is known, then clamps for non-leap years', async () => {
      const user = userEvent.setup();
      render(<DateInput />);
      await user.type(getInput(), '0229');
      expect(getInput()).toHaveValue('02/29');
      await user.type(getInput(), '2023');
      expect(getInput()).toHaveValue('02/28/2023');
    });

    it('keeps Feb 29 in a leap year', async () => {
      expect(await typeInto(<DateInput />, '02292024')).toBe('02/29/2024');
    });

    it('applies century leap rules (1900 is not a leap year, 2000 is)', async () => {
      expect(await typeInto(<DateInput />, '02291900')).toBe('02/28/1900');
    });

    it('validates DD/MM/YYYY', async () => {
      expect(await typeInto(<DateInput format="DD/MM/YYYY" />, '3104')).toBe('30/04');
    });

    it('validates YYYY-MM-DD using the already-typed year', async () => {
      expect(await typeInto(<DateInput format="YYYY-MM-DD" />, '20230230')).toBe('2023-02-28');
    });

    it('does not validate when enableDateValidation is false', async () => {
      expect(await typeInto(<DateInput enableDateValidation={false} />, '13452023')).toBe(
        '13/45/2023'
      );
    });

    it('runs a user beforeMaskedValueChange before validation', async () => {
      const seen: string[] = [];
      const value = await typeInto(
        <DateInput
          beforeMaskedValueChange={state => {
            seen.push(state.value);
            return state;
          }}
        />,
        '13'
      );
      expect(seen).toEqual(['1', '13']);
      expect(value).toBe('12');
    });
  });

  it('works controlled', () => {
    const onChange = jest.fn();
    const { rerender } = render(<DateInput value="12252023" onChange={onChange} />);
    expect(getInput()).toHaveValue('12/25/2023');
    rerender(<DateInput value="01/02/2024" onChange={onChange} />);
    expect(getInput()).toHaveValue('01/02/2024');
  });

  it('sets numeric input attributes, overridable by the caller', () => {
    const { rerender } = render(<DateInput />);
    expect(getInput()).toHaveAttribute('inputmode', 'numeric');
    expect(getInput()).toHaveAttribute('autocomplete', 'off');
    rerender(<DateInput autoComplete="bday" />);
    expect(getInput()).toHaveAttribute('autocomplete', 'bday');
  });

  it('does not leak DateInput props to the DOM', () => {
    render(<DateInput format="DD/MM/YYYY" separator="." enableDateValidation />);
    ['format', 'separator', 'enabledatevalidation'].forEach(attribute => {
      expect(getInput()).not.toHaveAttribute(attribute);
    });
  });

  it('supports error and helper text', () => {
    render(<DateInput error helperText="Invalid date" errorColor="#ff6b6b" />);
    expect(screen.getByText('Invalid date')).toHaveStyle({ color: '#ff6b6b' });
  });
});
