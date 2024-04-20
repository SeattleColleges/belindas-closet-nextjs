import CategoryDropDownMenu from '@/components/CategoryDropDownMenu'
import { ProductTypeList } from '@/app/add-product-page/product-prop-list'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'


// Mock router
jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))


describe('Category Dropdown menu tests', () => {
  // Arrange
  beforeEach(() => {
    jest.clearAllMocks()
   
   
    render(<CategoryDropDownMenu />)
  })

  it('checks if category button routes appropriately', () => {
    // Act
    const getMenuDown = screen.getByRole('button', { name: /products/i })
    fireEvent.click(getMenuDown)
    //console.log(getMenuDown)
    const getCategory = screen.getByRole('menuitem', { name: /Shirts/i })
    fireEvent.click(getCategory)
    //console.log(getCategory)
    /*
    The way the component is built requires us to mock
    the router so we can capture the redirect
    */
  })
})
