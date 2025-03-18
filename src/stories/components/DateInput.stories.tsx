import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from '../../components/DateInput';
import { useState } from 'react';
import React from 'react';

const meta = {
  title: 'Components/DateInput',
  component: DateInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: 'select',
      options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
      description: 'Date format to use',
    },
    separator: {
      control: 'select',
      options: ['/', '-', '.'],
      description: 'Character to separate date parts',
    },
    enableDateValidation: {
      control: 'boolean',
      description: 'Enable validation of dates (e.g., prevent invalid dates like 02/31/2025)',
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
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// US date format (MM/DD/YYYY)
export const USDateFormat: Story = {
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
  },
};

// European date format (DD/MM/YYYY)
export const EuropeanDateFormat: Story = {
  args: {
    format: 'DD/MM/YYYY',
    separator: '/',
    enableDateValidation: true,
  },
};

// ISO date format (YYYY-MM-DD)
export const ISODateFormat: Story = {
  args: {
    format: 'YYYY-MM-DD',
    separator: '-',
    enableDateValidation: true,
  },
};

// Date with dot separator
export const DotSeparator: Story = {
  args: {
    format: 'DD/MM/YYYY',
    separator: '.',
    enableDateValidation: true,
  },
};

// Without date validation
export const WithoutValidation: Story = {
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: false,
  },
};

// Controlled date input example
export const ControlledDateInput = () => {
  const [date, setDate] = useState('');

  return (
    <div>
      <DateInput
        format="MM/DD/YYYY"
        separator="/"
        value={date}
        onChange={e => setDate(e.target.value)}
        enableDateValidation={true}
      />
      <div style={{ marginTop: '10px' }}>Current value: {date}</div>
    </div>
  );
};
