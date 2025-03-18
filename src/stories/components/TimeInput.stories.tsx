import type { Meta, StoryObj } from '@storybook/react';
import { TimeInput } from '../../components/TimeInput';
import { useState } from 'react';
import React from 'react';

const meta = {
  title: 'Components/TimeInput',
  component: TimeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: 'select',
      options: ['12h', '24h'],
      description: 'Time format to use (12-hour or 24-hour)',
    },
    showSeconds: {
      control: 'boolean',
      description: 'Whether to show seconds in the time input',
    },
    separator: {
      control: 'select',
      options: [':', '.', '-'],
      description: 'Character to separate time parts',
    },
    enableTimeValidation: {
      control: 'boolean',
      description: 'Enable validation of time values (e.g., prevent invalid times like 25:70)',
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
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// 12-hour format (with AM/PM)
export const Format12Hour: Story = {
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
  },
};

// 24-hour format
export const Format24Hour: Story = {
  args: {
    format: '24h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
  },
};

// With seconds
export const WithSeconds: Story = {
  args: {
    format: '12h',
    showSeconds: true,
    separator: ':',
    enableTimeValidation: true,
  },
};

// 24-hour with seconds
export const Format24HourWithSeconds: Story = {
  args: {
    format: '24h',
    showSeconds: true,
    separator: ':',
    enableTimeValidation: true,
  },
};

// Custom separator
export const CustomSeparator: Story = {
  args: {
    format: '24h',
    showSeconds: false,
    separator: '.',
    enableTimeValidation: true,
  },
};

// Without time validation
export const WithoutValidation: Story = {
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: false,
  },
};

// Controlled time input example
export const ControlledTimeInput = () => {
  const [time, setTime] = useState('');

  return (
    <div>
      <TimeInput
        format="12h"
        showSeconds={false}
        separator=":"
        value={time}
        onChange={e => setTime(e.target.value)}
        enableTimeValidation={true}
      />
      <div style={{ marginTop: '10px' }}>Current value: {time}</div>
    </div>
  );
};

// With error state
export const WithError: Story = {
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
    error: true,
    helperText: 'Please enter a valid time',
  },
};

// With custom error color
export const WithCustomErrorColor: Story = {
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
    error: true,
    helperText: 'Please enter a valid time',
    errorColor: '#ff6b6b',
  },
};

// With helper text (no error)
export const WithHelperText: Story = {
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
    helperText: 'Enter time in HH:MM format',
  },
};

// With validation example
export const WithValidation = () => {
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTime(value);
    
    // Simple validation: check if the time format is valid
    if (value.length >= 8) { // At least HH:MM AM/PM
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?[AaPp][Mm]$/;
      setError(!timeRegex.test(value));
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <TimeInput
        format="12h"
        showSeconds={false}
        separator=":"
        value={time}
        onChange={handleChange}
        enableTimeValidation={true}
        error={error}
        helperText={error ? 'Invalid time format' : 'Enter time in HH:MM AM/PM format'}
      />
    </div>
  );
};
