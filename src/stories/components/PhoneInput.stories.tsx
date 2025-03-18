import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from '../../components/PhoneInput';
import { useState } from 'react';
import React from 'react';

const meta = {
  title: 'Components/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    countryCode: {
      control: 'select',
      options: ['US', 'CA', 'UK', 'AU', 'IN'],
      description: 'Country code to determine phone number format',
    },
    value: {
      control: 'text',
      description: 'The current value of the input',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the input value changes',
    },
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// RU phone number format
export const RUPhoneNumber: Story = {
  args: {
    countryCode: 'RU',
  },
};

// US phone number format
export const USPhoneNumber: Story = {
  args: {
    countryCode: 'US',
  },
};

// UK phone number format
export const UKPhoneNumber: Story = {
  args: {
    countryCode: 'UK',
  },
};

// Canadian phone number format
export const CanadianPhoneNumber: Story = {
  args: {
    countryCode: 'CA',
  },
};

// Australian phone number format
export const AustralianPhoneNumber: Story = {
  args: {
    countryCode: 'AU',
  },
};

// Indian phone number format
export const IndianPhoneNumber: Story = {
  args: {
    countryCode: 'IN',
  },
};

// Controlled phone input example
export const ControlledPhoneInput = () => {
  const [phone, setPhone] = useState('');

  return (
    <div>
      <PhoneInput countryCode="RU" value={phone} onChange={e => setPhone(e.target.value)} />
      <div style={{ marginTop: '10px' }}>Current value: {phone}</div>
    </div>
  );
};

// With error state
export const WithError: Story = {
  args: {
    countryCode: 'RU',
    error: true,
    helperText: 'Please enter a valid phone number',
  },
};

// With custom error color
export const WithCustomErrorColor: Story = {
  args: {
    countryCode: 'RU',
    error: true,
    helperText: 'Please enter a valid phone number',
    errorColor: '#ff6b6b',
  },
};

// With helper text (no error)
export const WithHelperText: Story = {
  args: {
    countryCode: 'RU',
    helperText: 'Enter your phone number with area code',
  },
};

// With validation example
export const WithValidation = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);

    // Simple validation: check if the US phone number is complete
    // US format: (XXX) XXX-XXXX
    if (value.length === 14) {
      const digitsOnly = value.replace(/\D/g, '');
      setError(digitsOnly.length !== 10);
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <PhoneInput
        countryCode="US"
        value={phone}
        onChange={handleChange}
        error={error}
        helperText={error ? 'Invalid phone number format' : 'Enter your 10-digit phone number'}
      />
    </div>
  );
};
