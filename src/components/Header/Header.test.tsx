import {render, screen, waitFor} from '@testing-library/react';
import Header from './Header';
import axios from 'axios';
import {useAuth} from '@/context/AuthContext';

jest.mock('axios');
jest.mock('@/context/AuthContext');
const mockUseRouter = jest.fn();
jest.mock('next/router', () => ({
    useRouter: () => mockUseRouter(),
}));


const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Header', () => {
    const mockUser = {
        profileImage: 'test.jpg',
        firstName: 'Helena',
        secondName: 'Hills',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockedAxios.get.mockResolvedValue({ data: mockUser });
        mockUseRouter.mockReturnValue({
            pathname: '/',
        });
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(() => 'test-token'),
            },
            writable: true
        });
    });

    test('shows auth links for unauthenticated user', () => {
        mockUseAuth.mockReturnValue({
            isAuthorised: false,
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
        });

        render(
                <Header />
        );

        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    test('shows auth links for unauthenticated user on non-compact page', () => {
        mockUseAuth.mockReturnValue({
            isAuthorised: false,
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
        });

        render(
                <Header />
        );

        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    test('shows nothing on compact pages (e.g. /signUp)', () => {
        mockUseAuth.mockReturnValue({
            isAuthorised: false,
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
        });
        
        mockUseRouter.mockReturnValue({
            pathname: '/SignUpPage',
        });

        render(
                <Header />
        );

        expect(screen.queryByText('Helena Hills')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
    });

    test('calls logout on 401 error during profile fetch', async () => {
        const mockLogout = jest.fn();
        mockUseAuth.mockReturnValue({
            isAuthorised: false,
            user: null,
            login: jest.fn(),
            logout: mockLogout,
        });

        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(() => 'test-token'),
            },
            writable: true
        });

        mockedAxios.get.mockRejectedValue({
            response: { status: 401 },
        });

        render(
                <Header />
        );

        await waitFor(() => {
            expect(mockLogout).toHaveBeenCalled();
        });
    });
});