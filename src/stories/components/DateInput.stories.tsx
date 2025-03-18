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

// With error state
export const WithError: Story = {
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
    error: true,
    helperText: 'Please enter a valid date',
  },
};

// With custom error color
export const WithCustomErrorColor: Story = {
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
    error: true,
    helperText: 'Please enter a valid date',
    errorColor: '#ff6b6b',
  },
};

// With helper text (no error)
export const WithHelperText: Story = {
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
    helperText: 'Enter date in MM/DD/YYYY format',
  },
};

// With validation example
export const WithValidation = () => {
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);
    
    // Simple validation: check if the date is complete and valid
    if (value.length === 10) {
      const parts = value.split('/');
      if (parts.length === 3) {
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        
        const isValid = 
          month >= 1 && month <= 12 &&
          day >= 1 && day <= 31 &&
          year >= 1900 && year <= 2100;
        
        setError(!isValid);
      }
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <DateInput
        format="MM/DD/YYYY"
        separator="/"
        value={date}
        onChange={handleChange}
        enableDateValidation={true}
        error={error}
        helperText={error ? 'Invalid date format' : 'Enter date in MM/DD/YYYY format'}
      />
    </div>
  );
};
