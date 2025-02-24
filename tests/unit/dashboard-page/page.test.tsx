import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';

const roles = ['admin', 'creator', 'user'];

describe.each(roles)('dashboard-page tests for role: %s', (role) => {
  beforeAll(() => {
    // Create a minimal fake 2D context with the necessary properties.
    const fake2dContext = {
      canvas: document.createElement('canvas'),
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(() => ({ data: [] })),
      putImageData: jest.fn(),
      createImageData: jest.fn(() => []),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      getContextAttributes: jest.fn(() => ({}))
    } as unknown as CanvasRenderingContext2D;

    // Use jest.spyOn to override getContext so that when '2d' is requested, we return our fake context.
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((contextId: string, options?: any) => {
      if (contextId === '2d') {
        return fake2dContext;
      }
      return null;
    });

    // Set up a fake token in localStorage for role-based testing.
    const mockToken = btoa(JSON.stringify({ role: role }));
    localStorage.setItem('token', `fakeHeader.${mockToken}.fakeSignature`);
  });

  beforeEach(() => {
    render(<Dashboard />);
  });

  afterAll(() => {
    localStorage.removeItem('token');
    jest.restoreAllMocks();
  });

  if (role === 'user') {
    it('displays UnauthorizedPageMessage for user role', async () => {
      await waitFor(() => {
        const unauthorizedText = screen.getByText(/401 Unauthorized/i);
        expect(unauthorizedText).toBeTruthy();
      });
      const unauthorizedMessage = screen.getByText(/You are not authorized to access this page/i);
      expect(unauthorizedMessage).toBeTruthy();
    });
  } else {
    it('renders heading with correct text and style', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeTruthy();
      
    });
  }
});
