import React from 'react';
import { render, screen } from '@testing-library/react';
import  DonationInfo  from '@/app/donation-info/page';

describe('DonationInfo component', () => {
  it('renders correctly', () => {
    render(<DonationInfo />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Donation Info')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveStyle({ color: 'white' });
  });
});