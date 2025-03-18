# React Mask Field Storybook Documentation

This document provides instructions for building, running, and deploying the Storybook documentation for the React Mask Field library.

## 📚 About Storybook

Storybook is an open-source tool for developing UI components in isolation. It makes building stunning UIs organized and efficient by allowing you to:

- Build components in isolation without worrying about application-specific dependencies
- Browse a component library and view the different states of each component
- Test components interactively in different states

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

The Storybook dependencies are already included in the project's `package.json`. If you've just cloned the repository, simply run:

```bash
npm install
```

## 🏃‍♂️ Running Storybook Locally

To start Storybook on your local machine:

```bash
npm run storybook
```

This will start the Storybook development server on port 6006. You can access it in your browser at:

```
http://localhost:6006
```

## 🏗️ Building Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

This will create a `storybook-static` directory containing a static build of Storybook that can be deployed to any static hosting service.

## 🌐 Deploying to GitHub Pages

### Automatic Deployment

We've set up a script to automatically build and deploy Storybook to GitHub Pages:

```bash
npm run deploy-storybook
```

This command will:

1. Build the Storybook static files
2. Push them to the `gh-pages` branch of your repository
3. Make them available at `https://altricade.github.io/react-mask-field/`

### Manual Deployment

If you prefer to deploy manually:

1. Build Storybook:

   ```bash
   npm run build-storybook
   ```

2. Deploy using gh-pages:
   ```bash
   npx gh-pages -d storybook-static
   ```

## 📝 Adding New Stories

### Story Structure

Stories are located in the `src/stories` directory, organized by component:

```
src/stories/
├── Introduction.mdx
└── components/
    ├── MaskField.stories.tsx
    ├── PhoneInput.stories.tsx
    ├── DateInput.stories.tsx
    ├── TimeInput.stories.tsx
    └── CreditCardInput.stories.tsx
```

### Creating a New Story

1. Create a new file in the appropriate directory following the naming convention `ComponentName.stories.tsx`
2. Import your component and define stories for different states and configurations
3. Add controls to make your stories interactive

Example:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../../components/YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

export const Default: Story = {
  args: {
    // Your component props here
  },
};
```

## 🔧 Configuration

### Main Configuration

The Storybook configuration is located in the `.storybook` directory:

- `main.js`: Configures the Storybook server, addons, and webpack
- `preview.jsx`: Configures the Storybook preview iframe, including global decorators and parameters

### GitHub Pages Configuration

For GitHub Pages deployment, we've added a `viteFinal` configuration in `.storybook/main.js` that sets the correct base path for GitHub Pages:

```js
viteFinal: config => {
  // If deploying to GitHub Pages
  if (process.env.NODE_ENV === 'production') {
    config.base = '/react-mask-field/';
  }
  return config;
};
```

## 🎨 Customizing the Theme

The Storybook theme is defined in `.storybook/preview.jsx`. You can customize the appearance by modifying the theme object:

```jsx
const theme = create({
  base: 'light',
  brandTitle: 'React Mask Field',
  brandUrl: 'https://github.com/altricade/react-mask-field',
  brandTarget: '_blank',
  // Colors
  colorPrimary: '#3498db',
  colorSecondary: '#2980b9',
  // ...other theme properties
});
```

## 📈 Best Practices

1. **Keep stories simple**: Each story should demonstrate a single state or use case
2. **Use controls**: Make your stories interactive with controls
3. **Add documentation**: Use JSDoc comments or MDX files to document your components
4. **Test in Storybook**: Use Storybook as a visual testing platform

## 🔗 Useful Links

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Component Story Format](https://storybook.js.org/docs/react/api/csf)
- [Storybook Controls](https://storybook.js.org/docs/react/essentials/controls)
- [Storybook Deployer](https://github.com/storybookjs/storybook-deployer)

## 🤝 Contributing

When contributing new components or modifying existing ones, please ensure you also update or create the corresponding stories to keep the documentation up-to-date.
