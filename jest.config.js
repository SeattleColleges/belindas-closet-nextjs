const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

// Custom Jest configuration
/** @type {import('jest').Config} */
const customJestConfig = {
  // Resolve module aliases
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1', // Maps @/components to the components folder
    '^@/(.*)$': '<rootDir>/$1', // Maps @/ to the root folder
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Ensure setup is loaded before tests
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for DOM-related tests
  preset: 'ts-jest', // TypeScript support
};

// Export the Jest configuration
module.exports = createJestConfig(customJestConfig);
