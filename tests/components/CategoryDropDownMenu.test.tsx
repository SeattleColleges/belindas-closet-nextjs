import CategoryDropDownMenu from '@/components/CategoryDropDownMenu'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

// Create mock hook
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

const mockPush = jest.fn();


describe('CategoryDropDown tests', () => {
    beforeEach(() => {
        mockPush.mockReset();
        useRouter.mockImplementation(() => ({
            push: mockPush
        }));
    })

    // Need to mock react router
})