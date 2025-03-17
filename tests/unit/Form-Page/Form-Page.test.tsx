import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormPage from "../../../app/form-page/page";
import "@testing-library/jest-dom";

describe("FormPage", () => {
  test("renders the form with initial state", async() => {
    render(<FormPage />);

    // Ensure all form fields and submit button are present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("updates the form data when input values change", async() => {
    render(<FormPage />);

    // Simulate user input
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const genderInput = screen.getByLabelText(/gender/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const sizeInput = screen.getByLabelText(/size/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(genderInput, { target: { value: "Male" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(sizeInput, { target: { value: "M" } });

    // Verify the values are updated
    expect(nameInput.value).toBe("John Doe");
    expect(genderInput.value).toBe("Male");
    expect(emailInput.value).toBe("john@example.com");
    expect(sizeInput.value).toBe("M");
  });

  test('handles form submission correctly', async() => {
    render(<FormPage />);

    // Get form fields
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const genderInput = screen.getByLabelText(/gender/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const sizeInput = screen.getByLabelText(/size/i) as HTMLInputElement;

    // Mock fetch request
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    // Simulate input changes
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(genderInput, { target: { value: "Male" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(sizeInput, { target: { value: "M" } });

    // Spy on console.log
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the log output asynchronously
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('Form submitted:', {
        name: 'John Doe',
        gender: 'Male',
        email: 'john@example.com',
        size: 'M',
      });
    });

    // Cleanup the spy
    logSpy.mockRestore();
    jest.restoreAllMocks();
  });
});
