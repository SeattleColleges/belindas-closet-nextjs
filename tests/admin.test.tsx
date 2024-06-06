import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Admin from '../app/admin-page/page';



describe('Admin', () => {
    it('renders the buttons', () => {
        render(<Admin />);
        const links = screen.getAllByRole('link'); // Update to search for links
        const buttonText = screen.getByText('Edit User Roles');
        expect(links && buttonText).toBeInTheDocument();
    });
});