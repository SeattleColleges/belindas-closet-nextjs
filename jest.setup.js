import '@testing-library/jest-dom';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};


// Old import replaced by the one above: import '@testing-library/jest-dom/extend-expect';

// Trying to suppress console.error for creator page test (Error: Not implemented: navigation (except hash changes), this solution fails.  

/*
const originalConsoleError = console.error;

console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Not implemented: navigation (except hash changes)')) {
    return; // Suppress the specific warning
  }
  originalConsoleError(...args); // Call the original console.error
};
*/


  
