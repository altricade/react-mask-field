/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  // Add this for GitHub Pages deployment
  viteFinal: (config) => {
    // If deploying to GitHub Pages
    if (process.env.NODE_ENV === 'production') {
      config.base = '/react-mask-field/';
    }
    return config;
  },
};
export default config;
