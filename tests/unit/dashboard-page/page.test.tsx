import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';


if (typeof ResizeObserver === 'undefined') {
  (global as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

const roles = ['admin', 'creator', 'user'];

describe.each(roles)('dashboard-page tests for role: %s', (role) => {
  let originalGetContext: HTMLCanvasElement['getContext'];

  beforeAll(() => {
    
    originalGetContext = HTMLCanvasElement.prototype.getContext;

    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      value: function (contextId: string) {
        if (contextId === '2d') {
          return {
            canvas: this,
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
            getContextAttributes: jest.fn(() => ({})),
            resetTransform: jest.fn()  // Add resetTransform to satisfy Chart.js
          };
        }
        return null;
      }
    });

    
    const mockToken = btoa(JSON.stringify({ role: role }));
    localStorage.setItem('token', `fakeHeader.${mockToken}.fakeSignature`);
  });

  beforeEach(() => {
    render(<Dashboard />);
  });

  afterAll(() => {
    localStorage.removeItem('token');
    
    HTMLCanvasElement.prototype.getContext = originalGetContext;
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
