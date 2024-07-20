import AddProduct from '@/app/add-product-page/page'
import { ProductTypeList } from '@/app/add-product-page/product-prop-list'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

const roles = ['admin', 'creator', 'user'];

describe.each(roles)('add-product-page tests for role: %s', (role) => {
  beforeEach(() => {
    render(<AddProduct />)
  })

  beforeAll(() => {
    const mockToken = btoa(JSON.stringify({ role }));
    localStorage.setItem('token', `fakeHeader.${mockToken}.fakeSignature`);
  });

  afterAll(() => {
  localStorage.removeItem('token');
  });

  if (role === 'user') {
    it('displays UnauthorizedPageMessage for user role', async () => {
      await waitFor(() => {
        expect(screen.getByText(/401 Unauthorized/i)).toBeInTheDocument();
      });

      const unauthorizedMessage = screen.getByText(/You are not authorized to access this page/i);
      expect(unauthorizedMessage).toBeInTheDocument();
    });
  } else {
    it('contains title', async () => {
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      });
      // Act
      const title = screen.getByText(/Add a Product/i )

      // Assert
      expect(title).toBeInTheDocument()
      
    })

    it('checks if each product type option are rendered after clicking', async () => {
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      });
      // Act 
      const selectType = screen.getByLabelText(/Product Type/i)
      fireEvent.mouseDown(selectType)

      // Assert
      Object.values(ProductTypeList).forEach((type) => {
        const option = screen.getByRole('option', { name: new RegExp(type, 'i') })
        expect(option).toBeInTheDocument()
      })
    })
  }
})