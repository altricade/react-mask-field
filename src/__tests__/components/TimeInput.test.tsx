import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TimeInput } from '../../components/TimeInput';
import { getInput } from '../../test-utils/input';

async function typeInto(ui: React.ReactElement, text: string): Promise<string> {
  const user = userEvent.setup();
  render(ui);
  await user.type(getInput(), text);
  return getInput().value;
}

describe('TimeInput', () => {
  it('uses 12h with AM/PM by default and accepts typed am/pm', async () => {
    expect(await typeInto(<TimeInput />, '0930am')).toBe('09:30 AM');
    expect(getInput().placeholder).toBe('__:__ __');
  });

  it('accepts PM and upper-cases it', async () => {
    expect(await typeInto(<TimeInput />, '0145pM')).toBe('01:45 PM');
  });

  it('rejects letters other than A/P then M in the period slots', async () => {
    expect(await typeInto(<TimeInput />, '0930xaqm')).toBe('09:30 AM');
  });

  it('formats 24h', async () => {
    expect(await typeInto(<TimeInput format="24h" />, '2145')).toBe('21:45');
  });

  it('includes seconds', async () => {
    expect(await typeInto(<TimeInput showSeconds />, '093045am')).toBe('09:30:45 AM');
  });

  it('supports the "." separator', async () => {
    expect(await typeInto(<TimeInput separator="." format="24h" />, '0930')).toBe('09.30');
  });

  describe('validation', () => {
    it('clamps 24h hours to 23 and minutes to 59', async () => {
      expect(await typeInto(<TimeInput format="24h" />, '2599')).toBe('23:59');
    });

    it('clamps 12h hours to 12 and maps 00 to 12', async () => {
      expect(await typeInto(<TimeInput />, '1345')).toBe('12:45');
    });

    it('maps hour 00 to 12 in 12h format', async () => {
      expect(await typeInto(<TimeInput />, '0015')).toBe('12:15');
    });

    it('keeps 00 hours in 24h format', async () => {
      expect(await typeInto(<TimeInput format="24h" />, '0005')).toBe('00:05');
    });

    it('clamps seconds in 24h format (no trailing AM/PM)', async () => {
      expect(await typeInto(<TimeInput format="24h" showSeconds />, '235999')).toBe('23:59:59');
    });

    it('clamps seconds in 12h format', async () => {
      expect(await typeInto(<TimeInput showSeconds />, '117575pm')).toBe('11:59:59 PM');
    });

    it('does not validate when enableTimeValidation is false', async () => {
      expect(await typeInto(<TimeInput enableTimeValidation={false} />, '1475am')).toBe('14:75 am');
    });

    it('runs a user beforeMaskedValueChange first', async () => {
      const spy = jest.fn(
        (state: { value: string; selection: { start: number | null; end: number | null } }) => state
      );
      await typeInto(<TimeInput format="24h" beforeMaskedValueChange={spy} />, '12');
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  it('uses a numeric keyboard for 24h and a text keyboard for 12h (AM/PM needs letters)', () => {
    const { rerender } = render(<TimeInput format="24h" />);
    expect(getInput()).toHaveAttribute('inputmode', 'numeric');
    rerender(<TimeInput format="12h" />);
    expect(getInput()).toHaveAttribute('inputmode', 'text');
    expect(getInput()).toHaveAttribute('autocomplete', 'off');
  });

  it('does not leak TimeInput props to the DOM', () => {
    render(<TimeInput format="24h" showSeconds separator="." enableTimeValidation />);
    ['format', 'showseconds', 'separator', 'enabletimevalidation'].forEach(attribute => {
      expect(getInput()).not.toHaveAttribute(attribute);
    });
  });

  it('supports error and helper text', () => {
    render(<TimeInput error helperText="Invalid time" helperTextStyle={{ fontStyle: 'italic' }} />);
    expect(screen.getByText('Invalid time')).toHaveStyle({ color: '#d32f2f', fontStyle: 'italic' });
  });
});
