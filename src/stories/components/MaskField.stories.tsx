import type { Meta, StoryObj } from '@storybook/react';
import { MaskField } from '../../components/MaskField';
import { useState } from 'react';
import React from 'react';

const meta = {
  title: 'Components/MaskField',
  component: MaskField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mask: {
      control: 'text',
      description: 'The mask pattern to apply to the input (9: digit, a: letter, *: alphanumeric)',
    },
    value: {
      control: 'text',
      description: 'The current value of the input',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the input value changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text to display when the input is empty',
    },
    maskChar: {
      control: 'text',
      description: 'Character to use as a placeholder for unfilled parts of the mask',
    },
    error: {
      control: 'boolean',
      description: 'If true, the input will be marked as having an error',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    errorColor: {
      control: 'color',
      description: 'Color for the error state border and text',
    },
  },
} satisfies Meta<typeof MaskField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example with a simple mask
export const Basic: Story = {
  args: {
    mask: '(999) 999-9999',
    placeholder: '(___) ___-____',
  },
};

// Example with a different mask character
export const CustomMaskChar: Story = {
  args: {
    mask: '(999) 999-9999',
    maskChar: '#',
    placeholder: '(###) ###-####',
  },
};

// Example with a letter mask
export const LetterMask: Story = {
  args: {
    mask: 'aaa-9999',
    placeholder: '___-____',
  },
};

// Example with an alphanumeric mask
export const AlphanumericMask: Story = {
  args: {
    mask: '*** *** ***',
    placeholder: '___ ___ ___',
  },
};

// Example with controlled input
export const ControlledInput = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <MaskField
        mask="9999-aaaa-9999"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="____-____-____"
      />
      <div style={{ marginTop: '10px' }}>Current value: {value}</div>
    </div>
  );
};

// Example with error state
export const WithError: Story = {
  args: {
    mask: '(999) 999-9999',
    placeholder: '(___) ___-____',
    error: true,
    helperText: 'Please enter a valid phone number',
  },
};

// Example with helper text but no error
export const WithHelperText: Story = {
  args: {
    mask: '(999) 999-9999',
    placeholder: '(___) ___-____',
    helperText: 'Enter your phone number',
  },
};

// Example with custom error color
export const CustomErrorColor: Story = {
  args: {
    mask: '(999) 999-9999',
    placeholder: '(___) ___-____',
    error: true,
    errorColor: '#ff6b00',
    helperText: 'Invalid phone number format',
  },
};

// Example with validation
export const WithValidation = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Enter a phone number');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Simple validation - check if the input has the expected length
    if (newValue.length > 0 && newValue.length < 14) {
      setError(true);
      setHelperText('Phone number is incomplete');
    } else {
      setError(false);
      setHelperText('Enter a phone number');
    }
  };

  return (
    <div>
      <MaskField
        mask="(999) 999-9999"
        value={value}
        onChange={handleChange}
        placeholder="(___) ___-____"
        error={error}
        helperText={helperText}
      />
    </div>
  );
};
