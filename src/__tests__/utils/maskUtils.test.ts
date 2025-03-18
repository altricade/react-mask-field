import {
  getDefaultFormatChars,
  isValidMask,
  formatValue,
  getFilledLength,
  extractValueFromMask,
  processPaste,
} from '../../utils/maskUtils';

describe('maskUtils', () => {
  describe('getDefaultFormatChars', () => {
    it('returns the default format characters', () => {
      const formatChars = getDefaultFormatChars();
      expect(formatChars).toEqual({
        '9': '[0-9]',
        a: '[A-Za-z]',
        '*': '[A-Za-z0-9]',
      });
    });
  });

  describe('isValidMask', () => {
    it('returns true for valid masks', () => {
      expect(isValidMask('999-999-9999')).toBe(true);
      expect(isValidMask('(999) 999-9999')).toBe(true);
      expect(isValidMask('99/99/9999')).toBe(true);
      expect(isValidMask('aaa-999')).toBe(true);
      expect(isValidMask('\\9aa-999')).toBe(true); // Escaped 9
    });

    it('returns false for invalid masks', () => {
      expect(isValidMask('')).toBe(false);
      expect(isValidMask(null as unknown as string)).toBe(false);
      expect(isValidMask(undefined as unknown as string)).toBe(false);
    });
  });

  describe('formatValue', () => {
    const formatChars = getDefaultFormatChars();
    const maskChar = '_';

    it('formats values according to the mask', () => {
      expect(
        formatValue({
          value: '1234567890',
          mask: '(999) 999-9999',
          maskChar,
          formatChars,
        })
      ).toBe('(123) 456-7890');

      expect(
        formatValue({
          value: 'abc123',
          mask: 'aaa-999',
          maskChar,
          formatChars,
        })
      ).toBe('abc-123');

      expect(
        formatValue({
          value: '12345',
          mask: '99/99/9999',
          maskChar,
          formatChars,
        })
      ).toBe('12/34/5___');
    });

    it('handles escaped characters in the mask', () => {
      expect(
        formatValue({
          value: '123456',
          mask: '\\999-999',
          maskChar,
          formatChars,
        })
      ).toBe('9123-456');
    });

    it('returns the value if no mask is provided', () => {
      expect(
        formatValue({
          value: '1234567890',
          mask: '',
          maskChar,
          formatChars,
        })
      ).toBe('1234567890');
    });

    it('returns empty string if no value is provided', () => {
      expect(
        formatValue({
          value: '',
          mask: '(999) 999-9999',
          maskChar,
          formatChars,
        })
      ).toBe('(___) ___-____');
    });
  });

  describe('getFilledLength', () => {
    it('returns the index of the last filled character', () => {
      expect(getFilledLength('(123) 456-____', '_')).toBe(10);
      expect(getFilledLength('12/34/____', '_')).toBe(5);
      expect(getFilledLength('abc-___', '_')).toBe(4);
    });

    it('returns 0 for empty or fully masked values', () => {
      expect(getFilledLength('', '_')).toBe(0);
      expect(getFilledLength('(___) ___-____', '_')).toBe(0);
    });
  });

  describe('extractValueFromMask', () => {
    it('extracts the raw value from a masked value', () => {
      expect(extractValueFromMask('(123) 456-7890', '(999) 999-9999', '_')).toBe('1234567890');
      expect(extractValueFromMask('12/34/2023', '99/99/9999', '_')).toBe('12342023');
      expect(extractValueFromMask('abc-123', 'aaa-999', '_')).toBe('abc123');
    });

    it('handles partially filled masked values', () => {
      expect(extractValueFromMask('(123) 4__-____', '(999) 999-9999', '_')).toBe('1234');
    });
  });

  describe('processPaste', () => {
    const formatChars = getDefaultFormatChars();
    const maskChar = '_';

    it('replaces selection with pasted text and formats according to mask', () => {
      const result = processPaste(
        '456', // Pasted text
        '(999) 999-9999', // Mask
        maskChar,
        formatChars,
        '(123) ___-____', // Current value
        6, // Selection start (after '(123) ')
        6 // Selection end
      );

      expect(result).toBe('(123) 456-____');
    });

    it('handles pasting at the beginning of the input', () => {
      const result = processPaste(
        '123', // Pasted text
        '(999) 999-9999', // Mask
        maskChar,
        formatChars,
        '(___) ___-____', // Current value
        1, // Selection start (after '(')
        1 // Selection end
      );

      expect(result).toBe('(123) ___-____');
    });
  });
});
