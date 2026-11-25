import {
  applyEdit,
  capacityOf,
  conformValue,
  defaultFormatChars,
  diffText,
  formatRaw,
  getDefaultFormatChars,
  isComplete,
  isValidMask,
  parseMask,
  toRaw,
  type EditResult,
  type EditState,
  type ParsedMask,
} from '../../utils/maskUtils';

// --- simulation helpers: reproduce what a browser does to the input value ---

interface Sim {
  readonly parsed: ParsedMask;
  readonly fill?: boolean;
  readonly maskChar?: string;
}

const empty: EditState = { raw: '', display: '' };

function insert(sim: Sim, state: EditState, text: string, at: number, selEnd = at): EditResult {
  const next = state.display.slice(0, at) + text + state.display.slice(selEnd);
  return applyEdit(sim.parsed, {
    previous: state,
    next,
    caret: at + text.length,
    ...(sim.fill === undefined ? {} : { fill: sim.fill }),
    ...(sim.maskChar === undefined ? {} : { maskChar: sim.maskChar }),
  });
}

function backspace(sim: Sim, state: EditState, caret: number): EditResult {
  const next = state.display.slice(0, caret - 1) + state.display.slice(caret);
  return applyEdit(sim.parsed, {
    previous: state,
    next,
    caret: caret - 1,
    direction: 'backward',
    ...(sim.fill === undefined ? {} : { fill: sim.fill }),
  });
}

function forwardDelete(sim: Sim, state: EditState, caret: number): EditResult {
  const next = state.display.slice(0, caret) + state.display.slice(caret + 1);
  return applyEdit(sim.parsed, {
    previous: state,
    next,
    caret,
    direction: 'forward',
    ...(sim.fill === undefined ? {} : { fill: sim.fill }),
  });
}

/** Type characters one at a time at the caret, like a user would. */
function typeSequence(
  sim: Sim,
  text: string,
  start: EditState = empty,
  caret?: number
): EditResult {
  let state: EditResult = { ...start, caret: caret ?? start.display.length, inserted: null };
  for (const char of text.split('')) {
    state = insert(sim, state, char, state.caret);
  }
  return state;
}

function stateOf(parsed: ParsedMask, value: string, fill = false): EditState {
  const raw = toRaw(parsed, value);
  return { raw, display: formatRaw(parsed, raw, '_', fill) };
}

// deterministic PRNG for property-style tests
function prng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

describe('getDefaultFormatChars / defaultFormatChars', () => {
  it('returns a fresh mutable copy each time', () => {
    const a = getDefaultFormatChars();
    a['9'] = 'x';
    expect(getDefaultFormatChars()['9']).toBe('[0-9]');
  });

  it('exposes a frozen shared default', () => {
    expect(Object.isFrozen(defaultFormatChars)).toBe(true);
  });
});

describe('isValidMask', () => {
  it.each([
    ['999', true],
    ['', false],
    [undefined, false],
    [null, false],
    [123, false],
  ])('%p -> %p', (mask, expected) => {
    expect(isValidMask(mask)).toBe(expected);
  });
});

describe('parseMask', () => {
  it('splits literals and pattern slots', () => {
    const parsed = parseMask('(99) a*');
    expect(parsed.slots.map(s => s.kind)).toEqual([
      'literal',
      'pattern',
      'pattern',
      'literal',
      'literal',
      'pattern',
      'pattern',
    ]);
    expect(parsed.patternPositions).toEqual([1, 2, 5, 6]);
    expect(parsed.prefix).toBe('(');
    expect(capacityOf(parsed)).toBe(4);
  });

  it('treats an escaped format char as a literal', () => {
    const parsed = parseMask('+\\91 99');
    expect(parsed.prefix).toBe('+91 ');
    expect(capacityOf(parsed)).toBe(2);
  });

  it('keeps a trailing lone backslash as a literal backslash', () => {
    const parsed = parseMask('99\\');
    expect(formatRaw(parsed, '12')).toBe('12');
    expect(formatRaw(parsed, '12', '_', true)).toBe('12\\');
  });

  it('escapes a backslash with a backslash', () => {
    expect(formatRaw(parseMask('9\\\\9'), '12')).toBe('1\\2');
  });

  it('handles a mask with no pattern slots', () => {
    const parsed = parseMask('ABC');
    expect(capacityOf(parsed)).toBe(0);
    expect(parsed.prefix).toBe('ABC');
    expect(conformValue(parsed, 'anything')).toBe('');
  });

  it('handles an empty mask', () => {
    const parsed = parseMask('');
    expect(parsed.slots).toHaveLength(0);
    expect(conformValue(parsed, '123')).toBe('');
  });

  it('honours custom formatChars and ignores inherited object keys', () => {
    const parsed = parseMask('hh-constructor', { h: '[0-9a-f]' });
    expect(capacityOf(parsed)).toBe(2);
    expect(conformValue(parsed, 'fz9')).toBe('f9');
  });

  it('caches by content, so inline formatChars objects reuse the parse', () => {
    const a = parseMask('99-aa', { '9': '[0-9]', a: '[a-z]' });
    const b = parseMask('99-aa', { a: '[a-z]', '9': '[0-9]' });
    expect(b).toBe(a);
    expect(parseMask('99-aa', { '9': '[0-5]', a: '[a-z]' })).not.toBe(a);
  });

  it('anchors patterns so they only ever match a single whole character', () => {
    // Unanchored "[0-9]|x" would also match "ax"; anchored it must equal one alternative.
    const parsed = parseMask('9', { '9': '[0-9]|x' });
    expect(toRaw(parsed, 'x')).toBe('x');
    expect(toRaw(parsed, 'y')).toBe('');
  });

  it('throws a descriptive error for an invalid pattern', () => {
    expect(() => parseMask('#', { '#': '[0-9' })).toThrow(/Invalid formatChars pattern for "#"/);
  });
});

describe('formatRaw', () => {
  const phone = parseMask('(999) 999-9999');

  it('renders lazily by default: nothing for empty, stops after the last char', () => {
    expect(formatRaw(phone, '')).toBe('');
    expect(formatRaw(phone, '1')).toBe('(1');
    expect(formatRaw(phone, '123')).toBe('(123');
    expect(formatRaw(phone, '1234')).toBe('(123) 4');
    expect(formatRaw(phone, '1234567890')).toBe('(123) 456-7890');
  });

  it('renders the full template with maskChar when fill is on', () => {
    expect(formatRaw(phone, '', '_', true)).toBe('(___) ___-____');
    expect(formatRaw(phone, '12', '#', true)).toBe('(12#) ###-####');
  });

  it('uses only the first character of a multi-character maskChar', () => {
    expect(formatRaw(phone, '', '*-', true)).toBe('(***) ***-****');
  });

  it('falls back to lazy rendering when maskChar is empty', () => {
    expect(formatRaw(phone, '12', '', true)).toBe('(12');
  });

  it('truncates raw values longer than the capacity', () => {
    expect(formatRaw(parseMask('99'), '12345')).toBe('12');
  });
});

describe('toRaw / conformValue', () => {
  const phone = parseMask('(999) 999-9999');
  const us = parseMask('+1 (999) 999-9999');

  it('accepts unmasked input', () => {
    expect(conformValue(phone, '1234567890')).toBe('(123) 456-7890');
  });

  it('accepts already-masked input (fixes the old "123--45" bug)', () => {
    expect(conformValue(parseMask('999-999'), '123-456')).toBe('123-456');
    expect(conformValue(phone, '(123) 456-7890')).toBe('(123) 456-7890');
  });

  it('accepts a filled display and ignores placeholder characters', () => {
    expect(toRaw(phone, '(12_) ___-____')).toBe('12');
  });

  it('drops invalid characters', () => {
    expect(conformValue(parseMask('999-999'), '1a2b3c4d5e6f')).toBe('123-456');
  });

  it('does not swallow a digit that equals a prefix literal', () => {
    expect(conformValue(us, '1234567890')).toBe('+1 (123) 456-7890');
  });

  it('strips a full prefix and treats a partial prefix as empty', () => {
    expect(toRaw(us, '+1 (555) 123-4567')).toBe('5551234567');
    expect(toRaw(us, '+1')).toBe('');
    expect(toRaw(us, '+')).toBe('');
  });

  it('honours escaped literals', () => {
    const india = parseMask('+\\91 99999 99999');
    expect(conformValue(india, '9876543210')).toBe('+91 98765 43210');
    expect(conformValue(india, '+91 98765 43210')).toBe('+91 98765 43210');
  });

  it('handles masks that start with a pattern slot and contain repeated literals', () => {
    const date = parseMask('99/99/9999');
    expect(conformValue(date, '12252023')).toBe('12/25/2023');
    expect(conformValue(date, '12/25/2023')).toBe('12/25/2023');
    expect(conformValue(date, '1/')).toBe('1');
  });

  it('respects heterogeneous slot types', () => {
    const plate = parseMask('aa-9999');
    expect(conformValue(plate, 'AB1234')).toBe('AB-1234');
    expect(conformValue(plate, '12AB34')).toBe('AB-34');
  });

  it('is idempotent for many random inputs (lazy and filled)', () => {
    const masks = [
      '(999) 999-9999',
      '+1 (999) 999-9999',
      '99/99/9999',
      'aa-9999',
      '+\\91 99999',
      '**:**',
    ];
    const alphabet = '0123456789abcXYZ()-+/_ :.';
    const random = prng(42);
    masks.forEach(mask => {
      const parsed = parseMask(mask);
      Array.from({ length: 200 }).forEach(() => {
        const length = Math.floor(random() * 20);
        const input = Array.from({ length }, () =>
          alphabet.charAt(Math.floor(random() * alphabet.length))
        ).join('');
        const raw = toRaw(parsed, input);
        [false, true].forEach(fill => {
          const display = formatRaw(parsed, raw, '_', fill);
          expect(toRaw(parsed, display)).toBe(raw);
          expect(conformValue(parsed, display, '_', fill)).toBe(display);
        });
      });
    });
  });
});

describe('isComplete', () => {
  it('reports completeness', () => {
    const parsed = parseMask('99-99');
    expect(isComplete(parsed, '123')).toBe(false);
    expect(isComplete(parsed, '1234')).toBe(true);
  });
});

describe('diffText', () => {
  it('detects a simple insertion', () => {
    expect(diffText('123', '1293', 3)).toEqual({ start: 2, removedEnd: 2, inserted: '9' });
  });

  it('uses the caret to disambiguate repeated characters', () => {
    // Typing "1" in front of "11": a greedy diff would say "inserted at 2".
    expect(diffText('11', '111', 1)).toEqual({ start: 0, removedEnd: 0, inserted: '1' });
  });

  it('detects a deletion', () => {
    expect(diffText('1123', '123', 1)).toEqual({ start: 1, removedEnd: 2, inserted: '' });
  });

  it('detects a selection replacement', () => {
    expect(diffText('123-456', '19456', 2)).toEqual({ start: 1, removedEnd: 4, inserted: '9' });
  });

  it('falls back to a greedy diff with no or an inconsistent caret', () => {
    expect(diffText('abc', 'abXc', null)).toEqual({ start: 2, removedEnd: 2, inserted: 'X' });
    expect(diffText('abc', 'abXc', 99)).toEqual({ start: 2, removedEnd: 2, inserted: 'X' });
    expect(diffText('abc', 'abXc', 0)).toEqual({ start: 2, removedEnd: 2, inserted: 'X' });
  });

  it('handles identical strings', () => {
    expect(diffText('abc', 'abc', 3)).toEqual({ start: 3, removedEnd: 3, inserted: '' });
  });
});

describe('applyEdit', () => {
  const phoneSim: Sim = { parsed: parseMask('(999) 999-9999') };
  const usSim: Sim = { parsed: parseMask('+1 (999) 999-9999') };

  describe('typing', () => {
    it('formats while typing and keeps the caret at the end', () => {
      const result = typeSequence(phoneSim, '1234567890');
      expect(result.display).toBe('(123) 456-7890');
      expect(result.raw).toBe('1234567890');
      expect(result.caret).toBe(14);
    });

    it('does not swallow a typed digit equal to a prefix literal', () => {
      expect(typeSequence(usSim, '1234567890').display).toBe('+1 (123) 456-7890');
    });

    it('rejects invalid characters without moving the caret', () => {
      const typed = typeSequence(phoneSim, '12');
      const result = insert(phoneSim, typed, 'x', typed.caret);
      expect(result.display).toBe('(12');
      expect(result.caret).toBe(3);
    });

    it('ignores typing once the mask is full', () => {
      const full = typeSequence(phoneSim, '1234567890');
      const result = insert(phoneSim, full, '5', full.caret);
      expect(result.display).toBe('(123) 456-7890');
    });

    it('consumes a typed literal without adding a raw char', () => {
      const sim: Sim = { parsed: parseMask('999-999') };
      const result = typeSequence(sim, '123-4');
      expect(result.display).toBe('123-4');
    });

    it('jumps the caret past literals after filling the slot before them', () => {
      const sim: Sim = { parsed: parseMask('99-99') };
      const result = typeSequence(sim, '12', { raw: '34', display: '34' }, 0);
      // inserting "12" before "34" shifts: 12-34 and caret after the dash
      expect(result.display).toBe('12-34');
      expect(result.caret).toBe(3);
    });

    it('inserts in the middle and shifts the rest right', () => {
      const start = stateOf(phoneSim.parsed, '(123) 456-7');
      const result = insert(phoneSim, start, '9', 2);
      expect(result.display).toBe('(192) 345-67');
      expect(result.caret).toBe(3);
    });

    it('drops chars pushed past the capacity when inserting into a full value', () => {
      const start = stateOf(phoneSim.parsed, '1234567890');
      const result = insert(phoneSim, start, '0', 1);
      expect(result.display).toBe('(012) 345-6789');
    });

    it('accepts a multi-character insertion (paste / IME commit)', () => {
      const result = insert(phoneSim, empty, '(555) 123-4567', 0);
      expect(result.display).toBe('(555) 123-4567');
      expect(result.inserted).toBe('(555) 123-4567');
    });

    it('pastes into the middle', () => {
      const start = stateOf(phoneSim.parsed, '(123) 7');
      const result = insert(phoneSim, start, '456', 6);
      expect(result.display).toBe('(123) 456-7');
      expect(result.caret).toBe(10);
    });

    it('replaces a selection', () => {
      const start = stateOf(phoneSim.parsed, '(123) 456-7890');
      // select "456" (positions 6..9) and type 0
      const result = insert(phoneSim, start, '0', 6, 9);
      expect(result.display).toBe('(123) 078-90');
      expect(result.caret).toBe(7);
    });

    it('re-validates shifted characters against heterogeneous slots', () => {
      const sim: Sim = { parsed: parseMask('a9a9') };
      const start = stateOf(sim.parsed, 'a1b2');
      // delete "a" -> "1b2" would no longer fit "a9a9"; non-fitting chars drop
      const result = backspace(sim, start, 1);
      expect(result.display).toBe('b2');
    });
  });

  describe('deleting', () => {
    it('backspaces the last character', () => {
      const start = stateOf(phoneSim.parsed, '(123) 4');
      const result = backspace(phoneSim, start, 7);
      expect(result.display).toBe('(123');
      expect(result.caret).toBe(4);
    });

    it('backspacing over a literal removes the previous raw character (no trap)', () => {
      const sim: Sim = { parsed: parseMask('999-999') };
      const start = stateOf(sim.parsed, '123-4');
      // caret right after "-", Backspace deletes "-" in the browser
      const result = backspace(sim, start, 4);
      expect(result.display).toBe('124');
      expect(result.raw).toBe('124');
      expect(result.caret).toBe(2);
    });

    it('forward-deleting a literal removes the next raw character', () => {
      const sim: Sim = { parsed: parseMask('999-999') };
      const start = stateOf(sim.parsed, '123-45');
      const result = forwardDelete(sim, start, 3);
      expect(result.display).toBe('123-5');
      expect(result.caret).toBe(3);
    });

    it('backspacing a lone prefix literal at the start is a no-op', () => {
      const start = stateOf(phoneSim.parsed, '(1');
      const result = backspace(phoneSim, start, 1);
      expect(result.display).toBe('(1');
      expect(result.caret).toBe(0);
    });

    it('forward-deleting a literal at the end is a no-op', () => {
      const sim: Sim = { parsed: parseMask('99-99') };
      const start: EditState = { raw: '12', display: '12-' };
      const result = forwardDelete(sim, start, 2);
      expect(result.display).toBe('12');
    });

    it('deletes in the middle and shifts left', () => {
      const start = stateOf(phoneSim.parsed, '(123) 456-7890');
      const result = backspace(phoneSim, start, 3);
      expect(result.display).toBe('(134) 567-890');
      expect(result.caret).toBe(2);
    });

    it('deletes a whole selection', () => {
      const start = stateOf(phoneSim.parsed, '(123) 456-7890');
      const result = insert(phoneSim, start, '', 0, 14);
      expect(result.display).toBe('');
      expect(result.inserted).toBeNull();
      expect(result.caret).toBe(0);
    });

    it('clearing everything (e.g. select-all + delete) yields empty', () => {
      const start = stateOf(usSim.parsed, '5551234567');
      const result = applyEdit(usSim.parsed, { previous: start, next: '', caret: 0 });
      expect(result.display).toBe('');
      expect(result.raw).toBe('');
    });
  });

  describe('filled mode (alwaysShowMask)', () => {
    const sim: Sim = { parsed: parseMask('(999) 999-9999'), fill: true };
    const blank = stateOf(sim.parsed, '', true);

    it('types into the first slot even when the caret is at the end', () => {
      const result = insert(sim, blank, '5', blank.display.length);
      expect(result.display).toBe('(5__) ___-____');
      expect(result.caret).toBe(2);
    });

    it('types a full number and jumps over literals', () => {
      const result = typeSequence(sim, '1234567890', blank, 1);
      expect(result.display).toBe('(123) 456-7890');
      const partial = typeSequence(sim, '123', blank, 1);
      expect(partial.display).toBe('(123) ___-____');
      expect(partial.caret).toBe(6);
    });

    it('backspace in the empty region removes the last raw char', () => {
      const start = stateOf(sim.parsed, '12', true);
      const result = backspace(sim, start, 8);
      expect(result.display).toBe('(1__) ___-____');
    });

    it('uses a custom maskChar', () => {
      const custom: Sim = { parsed: parseMask('99/99'), fill: true, maskChar: '#' };
      const start: EditState = { raw: '', display: '##/##' };
      expect(insert(custom, start, '1', 0).display).toBe('1#/##');
    });
  });
});
