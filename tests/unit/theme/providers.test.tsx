import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ThemeContextProvider, { useThemeContext } from '../../../app/theme/providers';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';

// Test component to consume the context
const TestComponent = () => {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <div>
      <span data-testid="theme-mode">{mode}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContextProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders with default theme mode as light', async () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
  });

  test('toggles theme mode from light to dark', async () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>
    );

    const button = screen.getByText('Toggle Theme');

    // Initial mode should be 'light'
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');

    // Click to toggle
    fireEvent.click(button);

    // Expect mode to be 'dark'
    await waitFor(() => {
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    });

    // Verify localStorage is updated
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('persists theme mode from localStorage', async () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>
    );

    // Wait for useEffect to run
    await waitFor(() => {
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    });
  });
});
