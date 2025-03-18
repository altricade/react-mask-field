# Changelog

All notable changes to this project will be documented in this file.

## 1.1.0 (2025-03-18)

### Features

- Added official support for React 19
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
