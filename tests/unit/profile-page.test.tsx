import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Profile from "@/app/profile/page";
import { User } from "@/types/user";

// Mock components
jest.mock("@/components/Sidebar", () => () => <div data-testid="sidebar" />);
jest.mock("@/components/UserHeader", () => (props: any) => (
  <div data-testid="user-header">{props.firstName} {props.lastName}</div>
));
jest.mock("@/components/UserSideBar", () => () => <div data-testid="user-sidebar" />);
jest.mock("@/components/UserContent", () => () => <div data-testid="user-content" />);
jest.mock("@/components/UnauthorizedPageMessage", () => () => <div data-testid="unauthorized" />);

// Sample mock user
const mockUser: User = {
  id: "123",
  firstName: "Elida",
  lastName: "Ribeiro",
  pronoun: "she/her",
  role: "user",
  email: "elida@example.com",
};

describe("Profile Page", () => {
  beforeAll(() => {
    // Silence expected error logs during test
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  beforeEach(() => {
    // Mock fetch
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      })
    ) as jest.Mock;

    // Mock localStorage
    const store: Record<string, string> = {
      token: [
        "header",
        btoa(JSON.stringify({ role: "user" })),
        "signature"
      ].join("."),
      userId: "123"
    };

    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key: string) => store[key] || null);
    jest.spyOn(Storage.prototype, "setItem").mockImplementation((key: string, value: string) => {
      store[key] = value;
    });
    jest.spyOn(Storage.prototype, "removeItem").mockImplementation((key: string) => {
      delete store[key];
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders Sidebar, UserHeader, UserSideBar, and UserContent for authorized users", async () => {
    render(<Profile />);
    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
      expect(screen.getByTestId("user-header")).toHaveTextContent("Elida Ribeiro");
      expect(screen.getByTestId("user-sidebar")).toBeInTheDocument();
      expect(screen.getByTestId("user-content")).toBeInTheDocument();
    });
  });

  it("renders UnauthorizedPageMessage for unauthorized user", async () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key: string) => {
      if (key === "token") {
        return [
          "header",
          btoa(JSON.stringify({ role: "guest" })),
          "signature"
        ].join(".");
      }
      return "123";
    });

    render(<Profile />);
    await waitFor(() => {
      expect(screen.getByTestId("unauthorized")).toBeInTheDocument();
    });
  });

  it("handles missing token gracefully", async () => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    render(<Profile />);
    await waitFor(() => {
      expect(screen.getByTestId("unauthorized")).toBeInTheDocument();
    });
  });

  it("handles fetch error gracefully", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({ ok: false, statusText: "Forbidden" })
    ) as jest.Mock;

    render(<Profile />);
    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
      expect(screen.getByTestId("user-header")).toBeInTheDocument();
      expect(screen.getByTestId("user-sidebar")).toBeInTheDocument();
      expect(screen.getByTestId("user-content")).toBeInTheDocument();
    });

    // Optionally confirm the error was logged
    expect(console.error).toHaveBeenCalledWith(
      "Error getting user info:",
      expect.any(Error)
    );
  });
});
