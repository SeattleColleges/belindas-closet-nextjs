import ProductList from "@/app/add-product-page/page";
import { ProductTypeList } from "@/app/add-product-page/product-prop-list";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock next/navigation to prevent jsdom errors
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/add-product-page"),
}));

const roles = ["admin", "creator", "user"];

describe.each(roles)("add-product-page tests for role: %s", (role) => {
  beforeEach(() => {
    // Fix API mocking: Ensure expected product data is returned
    global.fetch = jest.fn((url) => {
      if (url.includes("/products")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                _id: "1",
                isHidden: false,
                isSold: false,
                productType: ["Shoe"],
                productGender: "Unisex",
                productDescription: "Test Product",
              },
            ]),
        });
      }
      return Promise.reject(new Error("Not found"));
    }) as jest.Mock;

    render(<ProductList params={{ categoryId: "Shoes" }} />);
  });

  beforeAll(() => {
    // Fix token setup for user role validation
    const mockToken = btoa(JSON.stringify({ role }));
    localStorage.setItem("token", `fakeHeader.${mockToken}.fakeSignature`);
  });

  afterAll(() => {
    localStorage.removeItem("token");
  });

  if (role === "user" || role === "creator") {
    it("displays UnauthorizedPageMessage for unauthorized roles", async () => {
      await waitFor(() => {
        expect(screen.getByText(/401 Unauthorized/i)).toBeInTheDocument();
      });

      const unauthorizedMessage = screen.getByText(
        /You are not authorized to access this page/i
      );
      expect(unauthorizedMessage).toBeInTheDocument();
    });
  } else {
    it("contains title", async () => {
      await waitFor(() => {
        const heading =
          screen.queryByRole("heading", { level: 1 }) ||
          screen.queryByRole("heading", { level: 4 });
        expect(heading).toBeInTheDocument();
      });
    });

    it("checks if each product type option is rendered after clicking", async () => {
      // Ensure "Add New Product" button exists
      await waitFor(() => {
        expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
      });

      // Click to open form
      fireEvent.click(screen.getByText(/Add New Product/i));

      // Debugging: Print the current DOM state
      console.log(document.body.innerHTML);

      // Ensure the select dropdown is available
      await waitFor(() => {
        expect(screen.getByRole("combobox")).toBeInTheDocument();
      });

      // Click dropdown
      fireEvent.mouseDown(screen.getByRole("combobox"));

      // Assert that all product types exist in the options
      await waitFor(() => {
        Object.values(ProductTypeList).forEach((type) => {
          const option = screen.getByRole("option", { name: new RegExp(type, "i") });
          expect(option).toBeInTheDocument();
        });
      });
    });
  }
});
