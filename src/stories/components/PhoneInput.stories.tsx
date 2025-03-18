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
      <PhoneInput countryCode="US" value={phone} onChange={e => setPhone(e.target.value)} />
      <div style={{ marginTop: '10px' }}>Current value: {phone}</div>
    </div>
  );
};
