import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Admin from '../../../app/admin-page/page';

const roles = ['admin', 'creator', 'user'];

describe.each(roles)('admin-page tests for role: %s', (role) => {
    beforeEach(() => {
        render(<Admin />)
    })

    beforeAll(() => {
        const mockToken = btoa(JSON.stringify({ role }));
        localStorage.setItem('token', `fakeHeader.${mockToken}.fakeSignature`);
      });
  
    afterAll(() => {
    localStorage.removeItem('token');
    });

    if (role === 'creator' || role === 'user') {
        it('displays UnauthorizedPageMessage for unauthorized role', async () => {
          await waitFor(() => {
            expect(screen.getByText(/401 Unauthorized/i)).toBeInTheDocument();
          });
    
          const unauthorizedMessage = screen.getByText(/You are not authorized to access this page/i);
          expect(unauthorizedMessage).toBeInTheDocument();
        });
    } else {
        it('renders the buttons', async () => {
            await waitFor(() => {
                expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
            });

            const links = screen.getAllByRole('link'); // Update to search for links
            const buttonText = screen.getByText('Edit User Roles');
            expect(links && buttonText).toBeInTheDocument();
        });
    };
});