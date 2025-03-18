# Changelog

All notable changes to this project will be documented in this file.

## 1.3.0 (2025-03-18)

### Features

- Added error styling and helper text functionality to all input components:
  - DateInput
  - PhoneInput
  - TimeInput
  - CreditCardInput
  - MaskField (previously implemented)
- Added new props to all input components:
  - `error`: Boolean to indicate if the input is in an error state
  - `helperText`: Text to display below the input for guidance
  - `errorColor`: Custom color for error state styling
  - `helperTextStyle`: Custom styles for the helper text container
- Added comprehensive Storybook examples showcasing error states and validation
- Added tests for the new error and helper text functionality

## 1.2.0 (2025-03-18)

### Features

- Published interactive Storybook documentation to GitHub Pages
- Added comprehensive documentation for building and deploying Storybook
- Added publishing guide for npm releases
- Updated README with badges and documentation links

### Bug Fixes

- Fixed Storybook configuration for proper GitHub Pages deployment
- Resolved addon dependency issues in Storybook setup

## 1.1.0 (2025-03-18)

### Features

- Added official support for React 19
- Added comprehensive Storybook documentation with interactive examples
- Deployed Storybook to GitHub Pages for easy component exploration
- Updated component implementations to use ForwardRefRenderFunction pattern for better type safety
- Enhanced prop filtering across all components to prevent React DOM warnings

### Bug Fixes

- Fixed TypeScript compatibility issues with React 18 and 19
- Improved component type definitions for better IDE support
- Ensured consistent prop handling across all components

## 1.0.3 (2025-03-18)

### Bug Fixes

- Fixed CurrencyInput mask pattern being displayed literally
- Improved mask character handling in MaskField component
- Added default format characters for common patterns
- Simplified mask generation for better reliability

## 1.0.2 (2025-03-18)

### Bug Fixes

- Fixed input masking logic to properly handle user input in all components
- Improved placeholder display and input value handling
- Optimized mask formatting for better user experience
- Removed redundant display logic for cleaner implementation

## 1.0.1 (2025-03-18)

### Bug Fixes

- Fixed input masking logic to properly handle user input in all components
- Improved placeholder display and input value handling
- Optimized mask formatting for better user experience
- Removed redundant display logic for cleaner implementation

## 1.0.0 (2025-03-18)

### Features

- Initial stable release with comprehensive input masking components
- Specialized components:
  - MaskField: Core component for custom masking patterns
  - PhoneInput: International phone number formatting
  - CreditCardInput: Credit card formatting with type detection
  - DateInput: Date formatting with validation
  - TimeInput: Time formatting with 12h/24h support
  - CurrencyInput: Currency formatting with multiple options
- Full TypeScript support with strict typing
- Comprehensive test suite with 70 passing tests
- Modern React hooks-based implementation
- Customizable formatting options
- No external runtime dependencies
