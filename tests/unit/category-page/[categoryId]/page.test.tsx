import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "@/app/category-page/[categoryId]/page";
import '@testing-library/jest-dom';
import React from "react";

jest.mock("@/components/ProductCard", () => (props: any) => (
  <div data-testid="product-card">{JSON.stringify(props)}</div>
));

const mockProducts = [
  {
    _id: "1",
    productImage: "/logo.png",
    productType: "Shoes",
    productGender: "Women",
    productSizeShoe: "8",
    productSizes: "",
    productSizePantsWaist: "",
    productSizePantsInseam: "",
    productDescription: "Test Shoes",
    isHidden: false,
    isSold: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    productImage: "/logo.png",
    productType: "Pants",
    productGender: "Men",
    productSizeShoe: "",
    productSizes: "L",
    productSizePantsWaist: "34",
    productSizePantsInseam: "32",
    productDescription: "Test Pants",
    isHidden: false,
    isSold: false,
    createdAt: new Date().toISOString(),
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockProducts),
  })
) as jest.Mock;

describe("[categoryId] page", () => {
  it("renders filtered product cards", async () => {
    render(<ProductList params={{ categoryId: "Shoes" }} />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("product-card");
      expect(cards).toHaveLength(1);
      expect(cards[0]).toHaveTextContent("Shoes");
    });
  });
});
