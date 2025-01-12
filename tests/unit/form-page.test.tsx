import { render, screen, fireEvent } from '@testing-library/react';
import FormPage from '@/app/form-page/page';

describe('FormPage Component', () => {
  test('renders the form with all fields and a submit button', () => {
    render(<FormPage />);

    // Check if form elements are rendered
    expect(screen.getByText(/Belinda's Closet Student Form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Size/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('allows user to type in form fields and submit the form', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Spy on console.log

    render(<FormPage />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Size/i), { target: { value: 'M' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Check if console.log was called with the correct form data
    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      name: 'John Doe',
      gender: 'Male',
      email: 'johndoe@example.com',
      size: 'M',
    });

    consoleSpy.mockRestore(); // Clean up the mock
  });
});
