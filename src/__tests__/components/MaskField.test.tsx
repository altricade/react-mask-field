import React, { createRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MaskField } from '../../components/MaskField';
import type { BeforeMaskedValueChangeFunction } from '../../types';
import { captureConsoleErrors, getInput } from '../../test-utils/input';

function Controlled({
  initial = '',
  mask = '(999) 999-9999',
}: {
  initial?: string;
  mask?: string;
}) {
  const [value, setValue] = useState(initial);
  return (
    <>
      <MaskField
        mask={mask}
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
      />
      <output data-testid="state">{value}</output>
    </>
  );
}

describe('MaskField', () => {
  describe('rendering', () => {
    it('generates the placeholder from the mask', () => {
      render(<MaskField mask="(999) 999-9999" />);
      expect(getInput().placeholder).toBe('(___) ___-____');
    });

    it('uses placeholderChar, then maskChar for the generated placeholder', () => {
      const { rerender } = render(<MaskField mask="99/99" maskChar="#" />);
      expect(getInput().placeholder).toBe('##/##');
      rerender(<MaskField mask="99/99" maskChar="#" placeholderChar="x" />);
      expect(getInput().placeholder).toBe('xx/xx');
    });

    it('prefers an explicit placeholder and can disable the generated one', () => {
      const { rerender } = render(<MaskField mask="99" placeholder="Code" />);
      expect(getInput().placeholder).toBe('Code');
      rerender(<MaskField mask="99" showPlaceholder={false} />);
      expect(getInput()).not.toHaveAttribute('placeholder');
    });

    it('shows escaped format characters literally in the placeholder', () => {
      render(<MaskField mask={'+\\9 99'} />);
      expect(getInput().placeholder).toBe('+9 __');
    });

    it('renders the full template when alwaysShowMask is on', () => {
      render(<MaskField mask="(999) 999-9999" alwaysShowMask maskChar="#" />);
      expect(getInput()).toHaveValue('(###) ###-####');
    });

    it('defaults to type="text" but lets the caller override it', () => {
      const { rerender } = render(<MaskField mask="99" />);
      expect(getInput()).toHaveAttribute('type', 'text');
      rerender(<MaskField mask="99" type="tel" />);
      expect(getInput()).toHaveAttribute('type', 'tel');
    });

    it('forwards the ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<MaskField mask="99" ref={ref} />);
      expect(ref.current).toBe(getInput());
    });

    it('does not leak mask props to the DOM or trigger React warnings', () => {
      const errors = captureConsoleErrors();
      render(
        <MaskField
          mask="99"
          maskChar="_"
          formatChars={{ '9': '[0-9]' }}
          alwaysShowMask={false}
          placeholderChar="x"
          showPlaceholder
          placeholderColor="red"
          beforeMaskedValueChange={s => s}
          error={false}
          helperText="help"
          errorColor="red"
          helperTextStyle={{}}
        />
      );
      const input = getInput();
      [
        'mask',
        'maskchar',
        'formatchars',
        'alwaysshowmask',
        'placeholderchar',
        'showplaceholder',
        'placeholdercolor',
        'error',
        'helpertext',
        'errorcolor',
      ].forEach(attribute => {
        expect(input).not.toHaveAttribute(attribute);
      });
      expect(errors.calls).toEqual([]);
      errors.restore();
    });
  });

  describe('typing', () => {
    it('formats as the user types', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="(999) 999-9999" />);
      await user.type(getInput(), '1234567890');
      expect(getInput()).toHaveValue('(123) 456-7890');
    });

    it('supports letters and alphanumerics', async () => {
      const user = userEvent.setup();
      const { unmount } = render(<MaskField mask="aaa-aaa" />);
      await user.type(getInput(), 'ab1c2def');
      expect(getInput()).toHaveValue('abc-def');
      unmount();
      render(<MaskField mask="***-***" />);
      await user.type(getInput(), 'a1-b2c3');
      expect(getInput()).toHaveValue('a1b-2c3');
    });

    it('ignores invalid characters and anything past the end', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="999-999" />);
      await user.type(getInput(), '1a2b3c4d5e6f789');
      expect(getInput()).toHaveValue('123-456');
    });

    it('honours custom formatChars', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="hh:hh" formatChars={{ h: '[0-9a-fA-F]' }} />);
      await user.type(getInput(), 'fgA9z0');
      expect(getInput()).toHaveValue('fA:90');
    });

    it('keeps escaped literals and does not swallow digits equal to prefix literals', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="+1 (999) 999-9999" />);
      await user.type(getInput(), '1234567890');
      expect(getInput()).toHaveValue('+1 (123) 456-7890');
    });

    it('fills from the first empty slot in alwaysShowMask mode', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="(999) 999-9999" alwaysShowMask />);
      // user.type clicks the input first; the caret ends up at the end of the template
      await user.type(getInput(), '555');
      expect(getInput()).toHaveValue('(555) ___-____');
      expect(getInput().selectionStart).toBe(6);
    });

    it('re-conforms when the mask changes', () => {
      const { rerender } = render(<MaskField mask="9999" value="12345678" />);
      expect(getInput()).toHaveValue('1234');
      rerender(<MaskField mask="9999-9999" value="12345678" />);
      expect(getInput()).toHaveValue('1234-5678');
    });

    it('passes values through untouched when the mask is empty', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<MaskField mask="" onChange={onChange} />);
      await user.type(getInput(), 'free text!');
      expect(getInput()).toHaveValue('free text!');
      expect(getInput()).not.toHaveAttribute('placeholder');
      expect(onChange).toHaveBeenCalledTimes(10);
    });
  });

  describe('editing and caret', () => {
    it('backspaces across literals without getting stuck', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="(999) 999-9999" />);
      await user.type(getInput(), '1234567');
      expect(getInput()).toHaveValue('(123) 456-7');
      await user.keyboard('{Backspace}{Backspace}');
      expect(getInput()).toHaveValue('(123) 45');
      await user.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}');
      expect(getInput()).toHaveValue('');
    });

    it('backspace directly after a literal removes the digit before it', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="999-999" defaultValue="123456" />);
      const input = getInput();
      await user.click(input);
      input.setSelectionRange(4, 4); // right after "-"
      await user.keyboard('{Backspace}');
      expect(input).toHaveValue('124-56');
      expect(input.selectionStart).toBe(2);
    });

    it('Delete directly before a literal removes the digit after it', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="999-999" defaultValue="123456" />);
      const input = getInput();
      await user.click(input);
      input.setSelectionRange(3, 3); // right before "-"
      await user.keyboard('{Delete}');
      expect(input).toHaveValue('123-56');
      expect(input.selectionStart).toBe(3);
    });

    it('inserts in the middle, shifts the rest and keeps the caret in place', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="(999) 999-9999" defaultValue="1234567" />);
      const input = getInput();
      await user.click(input);
      input.setSelectionRange(2, 2);
      await user.keyboard('9');
      expect(input).toHaveValue('(192) 345-67');
      expect(input.selectionStart).toBe(3);
    });

    it('moves the caret past a literal when the slot before it is filled', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="99-99" defaultValue="134" />);
      const input = getInput();
      await user.click(input);
      input.setSelectionRange(1, 1);
      await user.keyboard('2');
      expect(input).toHaveValue('12-34');
      expect(input.selectionStart).toBe(3);
    });

    it('deletes in the middle and shifts left', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="(999) 999-9999" defaultValue="1234567890" />);
      const input = getInput();
      await user.click(input);
      input.setSelectionRange(3, 3);
      await user.keyboard('{Backspace}');
      expect(input).toHaveValue('(134) 567-890');
      expect(input.selectionStart).toBe(2);
    });

    it('replaces a selection with typed text', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="(999) 999-9999" defaultValue="1234567890" />);
      const input = getInput();
      await user.click(input);
      input.setSelectionRange(6, 9);
      await user.keyboard('0');
      expect(input).toHaveValue('(123) 078-90');
    });

    it('clears everything on select-all + Backspace', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="+1 (999) 999-9999" defaultValue="5551234567" />);
      const input = getInput();
      await user.click(input);
      input.setSelectionRange(0, input.value.length);
      await user.keyboard('{Backspace}');
      expect(input).toHaveValue('');
    });

    it('formats pasted text, including already formatted text', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="(999) 999-9999" />);
      const input = getInput();
      await user.click(input);
      await user.paste('+1 (555) 123-4567 ext');
      // the leading "1" is a digit here: the mask has no +1 prefix
      expect(input).toHaveValue('(155) 512-3456');
      input.setSelectionRange(0, input.value.length);
      await user.paste('(555) 123-4567');
      expect(input).toHaveValue('(555) 123-4567');
    });

    it('pastes into the middle', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="(999) 999-9999" defaultValue="1237" />);
      const input = getInput();
      await user.click(input);
      input.setSelectionRange(6, 6);
      await user.paste('456');
      expect(input).toHaveValue('(123) 456-7');
      expect(input.selectionStart).toBe(10);
    });

    it('does not move the caret of an unfocused input', () => {
      const onChange = jest.fn();
      render(<MaskField mask="99-99" onChange={onChange} />);
      const input = getInput();
      const spy = jest.spyOn(input, 'setSelectionRange');
      // programmatic change without focus (e.g. autofill)
      fireEvent.change(input, { target: { value: '1234' } });
      expect(input).toHaveValue('12-34');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    it('receives the real input element with the masked value and name', async () => {
      const user = userEvent.setup();
      const seen: Array<{ isInput: boolean; name: string; value: string }> = [];
      render(
        <MaskField
          mask="99-99"
          name="code"
          onChange={e => {
            seen.push({
              isInput: e.target instanceof HTMLInputElement,
              name: e.target.name,
              value: e.target.value,
            });
          }}
        />
      );
      await user.type(getInput(), '123');
      expect(seen).toEqual([
        { isInput: true, name: 'code', value: '1' },
        { isInput: true, name: 'code', value: '12' },
        { isInput: true, name: 'code', value: '12-3' },
      ]);
    });

    it('does not fire for rejected keystrokes', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<MaskField mask="99" onChange={onChange} />);
      await user.type(getInput(), 'x1y2z3');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(getInput()).toHaveValue('12');
    });

    it('still calls a user onKeyDown', async () => {
      const user = userEvent.setup();
      const onKeyDown = jest.fn();
      render(<MaskField mask="99" onKeyDown={onKeyDown} />);
      await user.type(getInput(), '1');
      expect(onKeyDown).toHaveBeenCalled();
    });
  });

  describe('controlled and uncontrolled', () => {
    it('conforms an unmasked controlled value', () => {
      render(<MaskField mask="999-999" value="123456" />);
      expect(getInput()).toHaveValue('123-456');
    });

    it('accepts a numeric value', () => {
      render(<MaskField mask="999-999" value={123456} />);
      expect(getInput()).toHaveValue('123-456');
    });

    it('follows controlled value updates', () => {
      const { rerender } = render(<MaskField mask="999-999" value="123" />);
      expect(getInput()).toHaveValue('123');
      rerender(<MaskField mask="999-999" value="456789" />);
      expect(getInput()).toHaveValue('456-789');
    });

    it('round-trips through parent state', async () => {
      const user = userEvent.setup();
      render(<Controlled />);
      await user.type(getInput(), '5551234567');
      expect(getInput()).toHaveValue('(555) 123-4567');
      expect(screen.getByTestId('state')).toHaveTextContent('(555) 123-4567');
      await user.keyboard('{Backspace}');
      expect(screen.getByTestId('state')).toHaveTextContent('(555) 123-456');
    });

    it('stays on the controlled value when the parent ignores onChange', async () => {
      const user = userEvent.setup();
      render(<MaskField mask="99-99" value="12" onChange={() => undefined} />);
      await user.type(getInput(), '3');
      expect(getInput()).toHaveValue('12');
    });

    it('works uncontrolled with a conformed defaultValue', async () => {
      const user = userEvent.setup();
      const ref = createRef<HTMLInputElement>();
      render(<MaskField mask="99/99/9999" defaultValue="12252023" ref={ref} />);
      expect(getInput()).toHaveValue('12/25/2023');
      await user.clear(getInput());
      await user.type(getInput(), '01022024');
      expect(ref.current?.value).toBe('01/02/2024');
    });

    it('does not warn about controlled/uncontrolled switching or value+defaultValue', async () => {
      const errors = captureConsoleErrors();
      const user = userEvent.setup();
      render(<MaskField mask="99" defaultValue="1" />);
      await user.type(getInput(), '2');
      expect(errors.calls).toEqual([]);
      errors.restore();
    });
  });

  describe('beforeMaskedValueChange', () => {
    it('receives the new state, old state, user input and mask options', async () => {
      const user = userEvent.setup();
      const spy = jest.fn<
        ReturnType<BeforeMaskedValueChangeFunction>,
        Parameters<BeforeMaskedValueChangeFunction>
      >(state => state);
      render(<MaskField mask="99-99" defaultValue="12" beforeMaskedValueChange={spy} />);
      await user.type(getInput(), '3');
      expect(spy).toHaveBeenCalledTimes(1);
      const [newState, oldState, userInput, options] = spy.mock.calls[0] ?? [];
      expect(newState).toEqual({ value: '12-3', selection: { start: 4, end: 4 } });
      expect(oldState?.value).toBe('12');
      expect(userInput).toBe('3');
      expect(options).toEqual({
        mask: '99-99',
        maskChar: '_',
        formatChars: { '9': '[0-9]', a: '[A-Za-z]', '*': '[A-Za-z0-9]' },
      });
    });

    it('passes null user input for deletions', async () => {
      const user = userEvent.setup();
      const spy = jest.fn<
        ReturnType<BeforeMaskedValueChangeFunction>,
        Parameters<BeforeMaskedValueChangeFunction>
      >(state => state);
      render(<MaskField mask="99" defaultValue="12" beforeMaskedValueChange={spy} />);
      await user.click(getInput());
      await user.keyboard('{Backspace}');
      expect(spy.mock.calls[0]?.[2]).toBeNull();
    });

    it('applies the returned value and re-conforms it to the mask', async () => {
      const user = userEvent.setup();
      render(
        <MaskField
          mask="aaa"
          beforeMaskedValueChange={state => ({
            ...state,
            value: `${state.value.toUpperCase()}!!9`,
          })}
        />
      );
      await user.type(getInput(), 'abc');
      expect(getInput()).toHaveValue('ABC');
    });

    it('applies and clamps the returned selection', async () => {
      const user = userEvent.setup();
      render(
        <MaskField
          mask="9999"
          beforeMaskedValueChange={state => ({ ...state, selection: { start: 0, end: 99 } })}
        />
      );
      await user.type(getInput(), '1');
      expect(getInput().selectionStart).toBe(0);
      expect(getInput().selectionEnd).toBe(1);
    });
  });

  describe('error and helper text', () => {
    it('applies the error border, keeping other user styles', () => {
      render(<MaskField mask="99" error style={{ color: 'blue', borderColor: 'green' }} />);
      const input = getInput();
      expect(input.style.borderColor).toBe('#d32f2f');
      expect(input.style.borderStyle).toBe('solid');
      expect(input.style.color).toBe('blue');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('uses the custom error colour', () => {
      render(<MaskField mask="99" error errorColor="#ff6b6b" helperText="Bad" />);
      expect(getInput().style.borderColor).toBe('#ff6b6b');
      expect(screen.getByText('Bad')).toHaveStyle({ color: '#ff6b6b' });
    });

    it('passes the user style through untouched without an error', () => {
      render(<MaskField mask="99" style={{ borderColor: 'green' }} />);
      expect(getInput().style.borderColor).toBe('green');
      expect(getInput()).not.toHaveAttribute('aria-invalid');
    });

    it('renders helper text with the default and custom styles', () => {
      render(<MaskField mask="99" helperText="Help" helperTextStyle={{ fontStyle: 'italic' }} />);
      expect(screen.getByText('Help')).toHaveStyle({
        color: 'rgba(0, 0, 0, 0.6)',
        fontStyle: 'italic',
      });
    });

    it('links helper text through aria-describedby when the input has an id', () => {
      render(<MaskField mask="99" id="zip" helperText="5 digits" aria-describedby="other" />);
      expect(getInput()).toHaveAttribute('aria-describedby', 'other zip-helper-text');
      expect(screen.getByText('5 digits')).toHaveAttribute('id', 'zip-helper-text');
    });

    it('renders no helper element when helperText is empty', () => {
      const { container } = render(<MaskField mask="99" />);
      expect(container.firstElementChild?.children).toHaveLength(1);
      expect(getInput()).not.toHaveAttribute('aria-describedby');
    });
  });
});
