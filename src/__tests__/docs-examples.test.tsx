/**
 * The examples in README.md / llms-full.txt, executed. If one of these breaks,
 * update the docs together with the code.
 */
import React, { useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MaskField, useMask } from '../index';
import { getInput } from '../test-utils/input';

describe('documented examples', () => {
  it('useMask custom input (README "useMask hook")', async () => {
    function PostcodeInput() {
      const [value, setValue] = useState('');
      const mask = useMask({ mask: 'a9a 9a9', value });
      return (
        <input
          value={mask.maskedValue}
          placeholder={mask.placeholder}
          onKeyDown={mask.handleKeyDown}
          onChange={e => {
            mask.handleChange(e);
            setValue(e.target.value);
          }}
        />
      );
    }
    const user = userEvent.setup();
    render(<PostcodeInput />);
    expect(getInput().placeholder).toBe('___ ___');
    await user.type(getInput(), 'k1a0b1');
    expect(getInput()).toHaveValue('k1a 0b1');
    await user.keyboard('{Backspace}{Backspace}{Backspace}');
    expect(getInput()).toHaveValue('k1a');
  });

  it('upper-casing with beforeMaskedValueChange (README)', async () => {
    const user = userEvent.setup();
    render(
      <MaskField
        mask="aaa-999"
        beforeMaskedValueChange={newState => ({ ...newState, value: newState.value.toUpperCase() })}
      />
    );
    await user.type(getInput(), 'abc123');
    expect(getInput()).toHaveValue('ABC-123');
  });

  it('hex colour with custom formatChars (README "Mask syntax")', async () => {
    const user = userEvent.setup();
    render(<MaskField mask="#hhhhhh" formatChars={{ h: '[0-9a-fA-F]' }} />);
    await user.type(getInput(), 'ff00gg11');
    expect(getInput()).toHaveValue('#ff0011');
  });

  it('escaped prefix (README "Mask syntax")', async () => {
    const user = userEvent.setup();
    render(<MaskField mask={'+\\91 99999 99999'} />);
    await user.type(getInput(), '9876543210');
    expect(getInput()).toHaveValue('+91 98765 43210');
  });

  it('alwaysShowMask display (README "Display modes")', async () => {
    const user = userEvent.setup();
    render(<MaskField mask="(999) 999-9999" alwaysShowMask />);
    await user.type(getInput(), '55512');
    expect(getInput()).toHaveValue('(555) 12_-____');
  });
});
