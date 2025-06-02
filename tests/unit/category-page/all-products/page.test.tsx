
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "@/app/category-page/all-products/page";
import "@testing-library/jest-dom";


beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: {
            get: () => "application/json",
        },
        json: () => Promise.resolve([
            {
                _id: "1",
                productImage: "/test.png",
                productType: "Shirts",
                productGender: "Men",
                productSizeShoe: "",
                productSizes: "M",
                productSizePantsWaist: "",
                productSizePantsInseam: "",
                productDescription: "Nice shirt",
                isHidden: false,
                isSold: false,
                createdAt: new Date().toISOString(),
            },
        ]),
    } as unknown as Response)
  );
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock("@/components/ProductCard", () => (props: any) => (
  <div data-testid="product-card">{JSON.stringify(props)}</div>
));

describe("All Products Page", () => {
  it("renders fetched products and search UI", async () => {
    render(<ProductList params={{ categoryId: "all-products" }} />);

    await waitFor(() => {
      expect(screen.getByTestId("product-card")).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText("Search for products...")).toBeInTheDocument();
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Stock Status")).toBeInTheDocument();
    expect(screen.getByText("Size")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
  });
});
