import React from 'react';
import { render, screen } from '@testing-library/react';
import { Admin } from '@/app/admin-page/page';

describe('Admin component tests', () => {
  it('renders welcome message', () => {
    // Arrange
    render(<Admin />);

    // Assert
    const welcomeMessage = screen.getByText(/Welcome to the PAGE/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders "Add Product" button', () => {
    // Arrange
    render(<Admin />);

    // Assert
    const addProductButton = screen.getByText(/Add Product/i);
    expect(addProductButton).toBeInTheDocument();
  });

  it('renders "All Products" button', () => {
    // Arrange
    render(<Admin />);

    // Assert
    const allProductsButton = screen.getByText(/All Products/i);
    expect(allProductsButton).toBeInTheDocument();
  });

  it('renders "Edit User Roles" button', () => {
    // Arrange
    render(<Admin />);

    // Assert
    const editUserRolesButton = screen.getByText(/Edit User Roles/i);
    expect(editUserRolesButton).toBeInTheDocument();
  });

  it('renders "Contact page" button', () => {
    // Arrange
    render(<Admin />);

    // Assert
    const contactPageButton = screen.getByText(/Contact page/i);
    expect(contactPageButton).toBeInTheDocument();
  });

  it('calls handleAddProduct function when "Add Product" button is clicked', () => {
    // Arrange
    const handleAddProduct = jest.fn();
    render(<Admin handleAddProduct={handleAddProduct} />);

    // Act
   

    // Assert
    expect(handleAddProduct).toHaveBeenCalledTimes(1);
  });
});