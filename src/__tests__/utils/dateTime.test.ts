import { clampDateDigits, clampTimeRaw, daysInMonth } from '../../utils/dateTime';

describe('daysInMonth', () => {
  it.each([
    [1, 2023, 31],
    [2, 2023, 28],
    [2, 2024, 29],
    [2, 1900, 28],
    [2, 2000, 29],
    [4, 2023, 30],
    [12, 2023, 31],
    [2, 4, 29], // small years are literal, not 1900+
    [2, 100, 28],
  ])('month %i of %i has %i days', (month, year, expected) => {
    expect(daysInMonth(month, year)).toBe(expected);
  });
});

describe('clampDateDigits', () => {
  it.each([
    ['', 'MDY', ''],
    ['1', 'MDY', '1'],
    ['13', 'MDY', '12'],
    ['00', 'MDY', '01'],
    ['993', 'MDY', '123'],
    ['0231', 'MDY', '0229'],
    ['02312023', 'MDY', '02282023'],
    ['02312024', 'MDY', '02292024'],
    ['0432', 'MDY', '0430'],
    ['3213', 'DMY', '3112'],
    ['3102', 'DMY', '2902'],
    ['31022023', 'DMY', '28022023'],
    ['2023', 'YMD', '2023'],
    ['202313', 'YMD', '202312'],
    ['20230231', 'YMD', '20230228'],
    ['20240231', 'YMD', '20240229'],
  ] as const)('%s (%s) -> %s', (raw, order, expected) => {
    expect(clampDateDigits(raw, order)).toBe(expected);
  });

  it('never changes the length', () => {
    ['9', '99', '999', '9999', '99999', '999999', '9999999', '99999999'].forEach(raw => {
      expect(clampDateDigits(raw, 'MDY')).toHaveLength(raw.length);
    });
  });
});

describe('clampTimeRaw', () => {
  it.each([
    ['', '24h', false, ''],
    ['2', '24h', false, '2'],
    ['25', '24h', false, '23'],
    ['2399', '24h', false, '2359'],
    ['00', '24h', false, '00'],
    ['235999', '24h', true, '235959'],
    ['13', '12h', false, '12'],
    ['00', '12h', false, '12'],
    ['0960pm', '12h', false, '0959PM'],
    ['0960', '12h', true, '0959'],
    ['096075am', '12h', true, '095959AM'],
    ['1159a', '12h', false, '1159A'],
  ] as const)('%s (%s, seconds=%s) -> %s', (raw, format, seconds, expected) => {
    expect(clampTimeRaw(raw, format, seconds)).toBe(expected);
  });
});
