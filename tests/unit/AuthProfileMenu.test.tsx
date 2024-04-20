import AuthProfileMenu from '../../components/AuthProfileMenu'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSession, signOut } from 'next-auth/react'

// Create mock
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}))

// Set mock type
const mockSession = useSession as jest.MockedFunction<typeof useSession>
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>

describe('AuthProfileMenu tests', () => {
  // Arrange session before each test
  beforeEach(() => {
    mockSession.mockReturnValue({
      data: {
        user: { name: 'Testy Mctesterson' },
        expires: new Date().toISOString(),
      },
      status: 'authenticated',
      update: jest.fn(),
    })

    render(<AuthProfileMenu />)
  })

  it('renders component and checks valid user greeting', () => {
    const greeting = screen.getByText('Hi Testy Mctesterson,') // Act
    expect(greeting).toBeInTheDocument() // Assert
  })

  it('validates logout to "/" when sign out button is clicked', () => {
    const signOutBtn = screen.getByRole('button', { name: /sign out/i }) // Act
    fireEvent.click(signOutBtn)

    // Assert callback
    expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: '/' })
  })
})
