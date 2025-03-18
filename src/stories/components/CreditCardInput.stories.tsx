import type { Meta, StoryObj } from '@storybook/react';
import { CreditCardInput } from '../../components/CreditCardInput';
import { useState } from 'react';
import React from 'react';

const meta = {
  title: 'Components/CreditCardInput',
  component: CreditCardInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    cardType: {
      control: 'select',
      options: [
        undefined,
        'visa',
        'mastercard',
        'amex',
        'discover',
        'diners',
        'jcb',
        'unionpay',
        'other',
      ],
      description: 'Force a specific card type mask',
    },
    detectCardType: {
      control: 'boolean',
      description: 'Enable auto-detection of card type from number',
    },
    onCardTypeChange: {
      action: 'cardTypeChanged',
      description: 'Callback when card type is detected',
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
} satisfies Meta<typeof CreditCardInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Auto-detect card type
export const AutoDetectCardType: Story = {
  args: {
    detectCardType: true,
  },
};

// Visa card format
export const VisaCard: Story = {
  args: {
    cardType: 'visa',
    detectCardType: false,
  },
};

// American Express card format
export const AmexCard: Story = {
  args: {
    cardType: 'amex',
    detectCardType: false,
  },
};

// Mastercard format
export const MastercardFormat: Story = {
  args: {
    cardType: 'mastercard',
    detectCardType: false,
  },
};

// Discover card format
export const DiscoverCard: Story = {
  args: {
    cardType: 'discover',
    detectCardType: false,
  },
};

// Controlled credit card input with type detection
export const ControlledCreditCardInput = () => {
  const [cardValue, setCardValue] = useState('');
  const [cardType, setCardType] = useState<string | null>(null);

  return (
    <div>
      <CreditCardInput
        value={cardValue}
        onChange={e => setCardValue(e.target.value)}
        detectCardType={true}
        onCardTypeChange={type => setCardType(type)}
      />
      <div style={{ marginTop: '10px' }}>Current value: {cardValue}</div>
      <div style={{ marginTop: '5px' }}>Detected card type: {cardType || 'None'}</div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        Try entering:
        <ul style={{ margin: '5px 0 0 20px', padding: 0 }}>
          <li>4... for Visa</li>
          <li>5... for Mastercard</li>
          <li>34... or 37... for Amex</li>
          <li>6... for Discover</li>
        </ul>
      </div>
    </div>
  );
};
