import { render } from '@testing-library/react';
import ProductList from '../../../app/archived-products-page/page';

// - Mock fetch to simulate API response -
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          _id: '1',
          isHidden: false,
          isSold: true,
          productType: ['Shoe'],
          productGender: 'Unisex',
          productDescription: 'Test Product',
        },
      ]),
  })
) as jest.Mock; 

// Mock localStorage to simulate an authorized user with a valid JWT -->
beforeAll(() => {
  // Create a mock JWT with a valid Base64 encoded payload.
  const mockJwt = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',  // header (Base64-encoded).
    'eyJyb2xlIjoiY3JlYXRvciJ9',              // payload (Base64-encoded).
    'signature',                             // signature.
  ].join('.'); // JWT format is header.payload.signature --

  Storage.prototype.getItem = jest.fn((key) => {
    if (key === 'token') {
      return mockJwt; // Return a mock token with a valid role.
    }
    return null;
  });
});

describe('Archived Products Page', () => {
  // First test: check if the heading is rendered
  test('renders the heading for archived products', async () => {
    const { findByText } = render(<ProductList params={{ categoryId: 'test-category' }} />);

    // Check if the heading for found products is properly rendered ->
    const heading = await findByText(/Found/i);
    expect(heading).toBeInTheDocument();
  });

  // Second test: check if the product description is rendered ->
  test('renders product description', async () => {
    const { findByText } = render(<ProductList params={{ categoryId: 'test-category' }} />);

    // Check if the product description is rendered accordingly.
    const description = await findByText(/Test Product/i);
    expect(description).toBeInTheDocument();
  });
});
