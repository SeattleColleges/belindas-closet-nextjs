import AddProduct from '@/app/add-product-page/page'
import { ProductTypeList } from '@/app/add-product-page/product-prop-list'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'


describe('add-product-page tests', () => {
    // Arrange
    beforeEach(() => {
    render(<AddProduct />)
  })
  it('contains title', () => {
    // Act
    const title = screen.getByText(/Add a Product/i )

    // Assert
    expect(title).toBeInTheDocument()
    
  })

  it('checks if each product type option are rendered after clicking', () => {
    // Act 
    const selectType = screen.getByLabelText(/Product Type/i)
    fireEvent.mouseDown(selectType)

    // Assert
    Object.values(ProductTypeList).forEach((type) => {
      const option = screen.getByRole('option', { name: new RegExp(type, 'i') })
      expect(option).toBeInTheDocument()
    })
  })
})