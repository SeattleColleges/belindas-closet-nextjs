import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  Creator  from '@/app/creator-page/page';

describe('Creator component tests', () => {
    it('displays the placeholder text and interacts with buttons', async () => {
      render(<Creator />);
  
      // Check for the heading text
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Welcome to the CREATOR PAGE');
  
      // Check for the body text
      const bodyText = screen.getByText('FIX: Creator Placeholder Text goes here');
      expect(bodyText).toBeInTheDocument();
  
      // Check for the links and their href attributes
      const addButton = screen.getByRole('link', { name: /Add Product/i });
      const allProductsButton = screen.getByRole('link', { name: /All Products/i });
      
      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveAttribute('href', '/add-product-page');
  
      expect(allProductsButton).toBeInTheDocument();
      expect(allProductsButton).toHaveAttribute('href', '/');
  
      // Simulate link clicks
      await userEvent.click(addButton);
      await userEvent.click(allProductsButton);
    });
  });