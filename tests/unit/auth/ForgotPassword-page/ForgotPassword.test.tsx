import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "@/app/auth/forgot-password/page";
import "@testing-library/jest-dom";

// Mock useTheme and useMediaQuery from MUI
jest.mock("@mui/material", () => {
  const actualMui = jest.requireActual("@mui/material");
  return {
    ...actualMui,
    useTheme: () => ({
      breakpoints: { down: () => false },
    }),
    useMediaQuery: () => false,
  };
});

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("ForgotPassword Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with email input and submit button", () => {
    render(<ForgotPassword />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send reset link/i })).toBeInTheDocument();
  });

  it("shows success message after successful request", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Password reset email sent." }),
    });

    render(<ForgotPassword />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /send reset link/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/password reset email sent/i)).toBeInTheDocument();
    });
  });

  it("shows error message if the API call fails", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Email not found" }),
    });

    render(<ForgotPassword />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /send reset link/i });

    fireEvent.change(input, { target: { value: "fail@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/email not found/i)).toBeInTheDocument();
    });
  });

  it("disables the submit button while loading", async () => {
    let resolveFetch: () => void;
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFetch = () => resolve({ ok: true, json: async () => ({ message: "OK" }) });
        })
    );

    render(<ForgotPassword />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /send reset link/i });

    fireEvent.change(input, { target: { value: "loading@example.com" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();

    resolveFetch!(); // Resolve the mocked fetch to continue
    await waitFor(() => expect(button).not.toBeDisabled());
  });
});
