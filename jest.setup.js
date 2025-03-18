// Import necessary testing libraries
require('@testing-library/jest-dom');

// Mock ResizeObserver which is not available in JSDOM
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};
