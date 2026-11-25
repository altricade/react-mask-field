import { renderHook } from '@testing-library/react';

import { useMask } from '../../hooks/useMask';

describe('useMask', () => {
  it('derives masked value, raw value, placeholder and completeness', () => {
    const { result } = renderHook(() => useMask({ mask: '(999) 999-9999', value: '5551234' }));
    expect(result.current.maskedValue).toBe('(555) 123-4');
    expect(result.current.rawValue).toBe('5551234');
    expect(result.current.placeholder).toBe('(___) ___-____');
    expect(result.current.isComplete).toBe(false);
  });

  it('reports completeness', () => {
    const { result } = renderHook(() => useMask({ mask: '99', value: '12' }));
    expect(result.current.isComplete).toBe(true);
  });

  it('renders filled with alwaysShowMask', () => {
    const { result } = renderHook(() =>
      useMask({ mask: '99-99', value: '1', alwaysShowMask: true, maskChar: '#' })
    );
    expect(result.current.maskedValue).toBe('1#-##');
    expect(result.current.rawValue).toBe('1');
  });

  it('omits the placeholder when showPlaceholder is false', () => {
    const { result } = renderHook(() => useMask({ mask: '99', value: '', showPlaceholder: false }));
    expect(result.current.placeholder).toBeUndefined();
  });

  it('passes values through for an empty mask', () => {
    const { result } = renderHook(() => useMask({ mask: '', value: 'abc' }));
    expect(result.current.maskedValue).toBe('abc');
    expect(result.current.rawValue).toBe('abc');
    expect(result.current.placeholder).toBeUndefined();
    expect(result.current.isComplete).toBe(true);
  });

  it('keeps handlers stable across renders with inline formatChars', () => {
    const { result, rerender } = renderHook(() =>
      useMask({ mask: 'hh', value: '', formatChars: { h: '[0-9a-f]' } })
    );
    const first = result.current.handleChange;
    rerender();
    expect(result.current.handleChange).toBe(first);
  });

  it('setInputValue writes to the input; setSelection only touches focused inputs', () => {
    const { result } = renderHook(() => useMask({ mask: '9999', value: '' }));
    const input = document.createElement('input');
    document.body.appendChild(input);
    result.current.setInputValue(input, '1234');
    expect(input.value).toBe('1234');

    const spy = jest.spyOn(input, 'setSelectionRange');
    result.current.setSelection(input, { start: 1, end: 1 });
    expect(spy).not.toHaveBeenCalled();

    input.focus();
    result.current.setSelection(input, { start: 1, end: 2 });
    expect(input.selectionStart).toBe(1);
    expect(input.selectionEnd).toBe(2);
    input.remove();
  });

  it('setSelection swallows errors from inputs without selection support', () => {
    const { result } = renderHook(() => useMask({ mask: '9999', value: '' }));
    const input = document.createElement('input');
    input.type = 'number';
    document.body.appendChild(input);
    input.focus();
    expect(() => {
      result.current.setSelection(input, { start: 0, end: 0 });
    }).not.toThrow();
    input.remove();
  });
});
