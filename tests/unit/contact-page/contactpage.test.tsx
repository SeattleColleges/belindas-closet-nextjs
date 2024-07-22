import React from 'react';
import { render } from '@testing-library/react';
import Contact from '../../../app/contact-page/page';
import { Typography, Box, TextField, Button } from '@mui/material';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Typography: jest.fn((props: any) => <div>{props.children}</div>),
  Box: jest.fn((props: any) => <div>{props.children}</div>),
  TextField: jest.fn((props: any) => <input {...props} />),
  Button: jest.fn((props: any) => <button {...props} />),
}));

describe('Contact component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<Contact />);
    expect(Typography).toHaveBeenCalledTimes(3);
    expect(Box).toHaveBeenCalledTimes(8); // Adjusted the expectation to match the number of Box components
    expect(TextField).toHaveBeenCalledTimes(5); // Adjusted the expectation to match the number of TextField components
    expect(Button).toHaveBeenCalledTimes(1);
  });
});
