import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChangePasswordPage from "@/app/auth/change-password-page/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/ErrorAlert", () => ({ message }: any) => <div>{message}</div>);
jest.mock("@/components/SuccessAlert", () => ({ message }: any) => <div>{message}</div>);
jest.mock("next/image", () => (props: any) => <img alt="logo" {...props} />);

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(
    "token",
    [
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      btoa(JSON.stringify({ role: "user" })),
      "signature",
    ].join(".")
  );
  (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
});

describe("ChangePasswordPage", () => {
  it("renders the page with form fields", async () => {
    await waitFor(() => render(<ChangePasswordPage />));

    expect(screen.getByLabelText(/current password/i, { selector: "input" })).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i, { selector: "input" })).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i, { selector: "input" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /change password/i })).toBeInTheDocument();
  });

  it("shows error if fields are empty on submit", async () => {
    render(<ChangePasswordPage />);
    fireEvent.click(screen.getByRole("button", { name: /change password/i }));

    await screen.findByText(/please enter all fields/i);
  });

  it("shows error if new password equals current password", async () => {
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByLabelText(/current password/i, { selector: "input" }), {
      target: { value: "abc12345" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i, { selector: "input" }), {
      target: { value: "abc12345" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i, { selector: "input" }), {
      target: { value: "abc12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /change password/i }));

    await screen.findByText(/new password cannot be the same/i);
  });

  it("shows error if new password and confirm password do not match", async () => {
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByLabelText(/current password/i, { selector: "input" }), {
      target: { value: "oldpass123" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i, { selector: "input" }), {
      target: { value: "newpass123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i, { selector: "input" }), {
      target: { value: "differentpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /change password/i }));

    await screen.findByText(/passwords do not match/i);
  });

  it("shows error if new password is less than 8 characters", async () => {
    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByLabelText(/current password/i, { selector: "input" }), {
      target: { value: "oldpass123" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i, { selector: "input" }), {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i, { selector: "input" }), {
      target: { value: "short" },
    });

    fireEvent.click(screen.getByRole("button", { name: /change password/i }));

    await screen.findByText(/password must be at least 8 characters/i);
  });

  it("calls API and shows success on valid form submit", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Password changed successfully" }),
      })
    ) as jest.Mock;

    render(<ChangePasswordPage />);
    fireEvent.change(screen.getByLabelText(/current password/i, { selector: "input" }), {
      target: { value: "oldpass123" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i, { selector: "input" }), {
      target: { value: "newpass123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i, { selector: "input" }), {
      target: { value: "newpass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /change password/i }));

    await screen.findByText(/password changed successfully/i);
  });
});
