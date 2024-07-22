import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';

const roles = ['admin', 'creator', 'user'];

describe.each(roles)('dashboard-page tests for role: %s', (role) => {
  beforeEach(() => {
    render(<Dashboard />)
  })

  beforeAll(() => {
    const mockToken = btoa(JSON.stringify({ role }));
    localStorage.setItem('token', `fakeHeader.${mockToken}.fakeSignature`);
  });

  afterAll(() => {
  localStorage.removeItem('token');
  });

  if (role === 'user') {
    it('displays UnauthorizedPageMessage for user role', async () => {
      await waitFor(() => {
        expect(screen.getByText(/401 Unauthorized/i)).toBeInTheDocument();
      });

      const unauthorizedMessage = screen.getByText(/You are not authorized to access this page/i);
      expect(unauthorizedMessage).toBeInTheDocument();
    });
  } else {
    it('renders heading with correct text and style', () => {
      const heading = screen.getByRole('heading', { level: 1 });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Dashboard');
    });
  };
});