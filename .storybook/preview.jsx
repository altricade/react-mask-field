import { create } from '@storybook/theming/create';
import React from 'react';

const theme = create({
  base: 'light',
  brandTitle: 'React Mask Field',
  brandUrl: 'https://github.com/altricade/react-mask-field',
  brandTarget: '_blank',

  // Colors
  colorPrimary: '#3498db',
  colorSecondary: '#2980b9',

  // UI
  appBg: '#f8f9fa',
  appContentBg: '#ffffff',
  appBorderColor: '#e9ecef',
  appBorderRadius: 6,

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#212529',
  textInverseColor: '#ffffff',
});

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: theme,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    Story => {
      return (
        <div style={{ margin: '2em', fontFamily: 'Inter, -apple-system, sans-serif' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
