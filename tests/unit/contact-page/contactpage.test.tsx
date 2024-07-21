import React from 'react';
import { render } from '@testing-library/react';
import Contact from '../../../app/contact-page/page';
import { Typography, Box, TextField, Button } from '@mui/material';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Typography: jest.fn(({ children }) => <div>{children}</div>),
  Box: jest.fn(({ children }) => <div>{children}</div>),
  TextField: jest.fn(({ ...props }) => <input {...props} />), // Handle props to avoid warnings
  Button: jest.fn(({ children }) => <button>{children}</button>),
}));

describe('Contact component', () => {
  test('renders correctly', () => {
    render(<Contact />);
    expect(Typography).toHaveBeenCalledTimes(3);  // Updated the expected number of Typography calls
    expect(Box).toHaveBeenCalledTimes(8);        // Updated the expected number of Box calls
    expect(TextField).toHaveBeenCalledTimes(5);  // Updated the expected number of TextField calls
    expect(Button).toHaveBeenCalledTimes(1);
  });
});
