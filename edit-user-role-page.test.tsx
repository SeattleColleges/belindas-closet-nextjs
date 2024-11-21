import { render, screen, waitFor } from '@testing-library/react';
import EditUserRolePage from '@/app/edit-user-role-page/page';
import fetchMock from 'jest-fetch-mock';

jest.mock('../../../components/UserCard', () => {
    return function MockUserCard({ user }: { user: any }) {
      return <div data-testid="user-card">{user.firstName} {user.lastName}</div>;
    };
  });
  
  jest.mock('../../../components/UnauthorizedPageMessage', () => {
    return function MockUnauthorizedMessage() {
      return <div data-testid="unauthorized-message">Unauthorized</div>;
    };
  });
  

describe('EditUserRolePage Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  });

  test('renders User Management page for admin users and displays user info', async () => {
    // Mock localStorage for admin role
    const mockToken = JSON.stringify({
      role: 'admin',
    });
    localStorage.setItem(
      'token',
      `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(mockToken)}.signature`
    );

    // Mock user data fetch
    const mockUsers = [
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'editor' },
      { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'viewer' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

    render(<EditUserRolePage />);

    // Wait for the page to render users
    await waitFor(() => {
      expect(screen.getByText(/User Management/i)).toBeInTheDocument();
      expect(screen.getAllByTestId('user-card')).toHaveLength(2);
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    });
  });

  test('renders UnauthorizedPageMessage for non-admin users', async () => {
    // Mock localStorage for non-admin role
    const mockToken = JSON.stringify({
      role: 'viewer',
    });
    localStorage.setItem(
      'token',
      `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(mockToken)}.signature`
    );

    render(<EditUserRolePage />);

    // Check unauthorized message is displayed
    await waitFor(() => {
      expect(screen.getByTestId('unauthorized-message')).toBeInTheDocument();
    });
  });

  test('handles missing or invalid token gracefully', async () => {
    // No token in localStorage
    render(<EditUserRolePage />);

    // Check unauthorized message is displayed
    await waitFor(() => {
      expect(screen.getByTestId('unauthorized-message')).toBeInTheDocument();
    });
  });
});
