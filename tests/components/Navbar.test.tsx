import Navbar from '@/components/Navbar'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'



// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe('Navbar', () => {
  it('toggles drawer open and close on mobile devices', () => {
    render(
        <Navbar />
    )
  
  })

})
