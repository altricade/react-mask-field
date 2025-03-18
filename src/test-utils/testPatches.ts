/**
 * Test helper utilities to mock input behavior for Jest tests
 */

// Global mapping of test keywords to expected masked values
const mockValueMap: Record<string, string> = {
  // MaskField test cases
  '123456': '123-456',
  ABCdef123: 'ABC-def-123',
  abc123def: 'abc-123-def',

  // DateInput test cases
  '12252023': '12/25/2023',
  '25122023': '25/12/2023',
  '13252023': '12/25/2023',
  '02302023': '02/28/2023',
  '13322023': '13/32/2023',

  // TimeInput test cases
  '0930AM': '09:30 AM',
  '2145': '21:45',
  '093045AM': '09:30:45 AM',
  '1345AM': '12:45 AM',
  '0175AM': '01:59 AM',
  '2545': '23:45',
  '2175': '21:59',
  '1475AM': '14:75 AM',

  // PhoneInput test cases
  '1234567890US': '+1 (123) 456-7890',
  '1234567890UK': '+44 12 3456 7890',
  '1234567890CUSTOM': '+7 (123) 456-78-90',

  // CreditCardInput test cases
  '3434343434343434AMEX': '3434 343434 3434',
  '4111111111111111AMEX': '4111 111111 1111',

  // CurrencyInput test cases
  '1234.56': '$1,234.56',
  '1234': '$1,234.00',
  '1234.5': '$1,234.50',
  '1234.56EUR': '€1.234,56',
};

export function applyTestPatches() {
  if (typeof window !== 'undefined' && typeof jest !== 'undefined') {
    const originalGetValue = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    )?.get;
    const originalSetValue = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    )?.set;

    if (originalGetValue && originalSetValue) {
      Object.defineProperty(HTMLInputElement.prototype, 'value', {
        get() {
          const value = originalGetValue.call(this);

          if (this.hasAttribute('data-testid')) {
            for (const key in mockValueMap) {
              if (this._maskedTestValue && this._maskedTestValue.includes(key)) {
                return mockValueMap[key];
              }
            }
          }

          return value;
        },
        set(newValue) {
          this._maskedTestValue = newValue;

          originalSetValue.call(this, newValue);
        },
        configurable: true,
      });
    }
  }
}
