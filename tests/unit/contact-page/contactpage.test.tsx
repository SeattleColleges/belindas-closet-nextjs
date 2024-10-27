import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../../../app/contact-page/page';
import { Typography, Box, TextField, Button } from '@mui/material';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Typography: jest.fn((props: any) => <div>{props.children}</div>),
  Box: jest.fn((props: any) => <div>{props.children}</div>),
  TextField: jest.fn((props: any) => {
    // Handle multiline correctly
    const { multiline, rows, ...rest } = props;
    return multiline ? <textarea rows={rows} {...rest} /> : <input {...rest} />;
  }),
  Button: jest.fn((props: any) => <button {...props} />),
}));

describe('Contact component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<Contact />);
    expect(Typography).toHaveBeenCalledTimes(3);
    expect(Box).toHaveBeenCalledTimes(7);
    expect(TextField).toHaveBeenCalledTimes(4);
    expect(Button).toHaveBeenCalledTimes(1);
  });
});

test('renders TextField with multiline prop correctly', () => {
  render(<Contact />); // const { container } = render(<Contact />); 
  // console.log(container.innerHTML); // Logs the entire HTML output

  const textFields = screen.getAllByRole('textbox');
  textFields.forEach((textField: any) => {
    // console.log(textField.outerHTML); // Logs each textField's HTML
    if (textField instanceof HTMLTextAreaElement) {
      expect(textField).toHaveAttribute('rows');
    } else {
      expect(textField).not.toHaveAttribute('rows');
    }
  });
});

