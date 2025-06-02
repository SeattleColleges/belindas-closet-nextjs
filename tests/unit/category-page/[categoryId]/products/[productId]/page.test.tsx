import { render, screen, waitFor } from "@testing-library/react";
import ProductDetail from "@/app/category-page/[categoryId]/products/[productId]/page";
import '@testing-library/jest-dom';
import React from "react";

// Mock ProductDetailDisplay component
jest.mock("@/app/category-page/[categoryId]/products/[productId]/ProductDetailDisplay", () => ({ product }: any) => (
  <div data-testid="product-detail-display">{product?.productType}</div>
));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      _id: "123",
      productType: "Shoes",
      productGender: "Women",
      productSizeShoe: "7",
      productSizes: "",
      productSizePantsWaist: "",
      productSizePantsInseam: "",
      productDescription: "Stylish running shoes",
      productImage: "/image.png",
      isHidden: false,
      isSold: false,
    }),
  })
) as jest.Mock;

describe("ProductDetail Page", () => {
  it("fetches and renders product details", async () => {
    render(
      <ProductDetail params={{ categoryId: "Shoes", productId: "123" }} />
    );

    await waitFor(() => {
      const display = screen.getByTestId("product-detail-display");
      expect(display).toHaveTextContent("Shoes");
    });
  });
});
