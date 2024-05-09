import React from 'react';
import { render, screen } from '@testing-library/react';
import  Contact  from '@/app/contact-page/page';

describe('Contact component', () => {
  it('renders correctly', () => {
    render(<Contact />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveStyle({ color: 'white' });
  });
});