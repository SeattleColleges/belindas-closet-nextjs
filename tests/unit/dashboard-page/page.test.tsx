import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';

describe('Dashboard component tests', () => {
  it('renders heading with correct text and style', () => {
    render(<Dashboard />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Dashboard');
  });


});