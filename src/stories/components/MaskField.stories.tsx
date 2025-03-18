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
