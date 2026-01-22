import {render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import {useAuth} from '../../context/AuthContext';

jest.mock('axios');
jest.mock('../../context/AuthContext');


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
        mockedAxios.get.mockResolvedValue({ mockUser });
    });

    test('shows auth links for unauthenticated user', () => {
        mockUseAuth.mockReturnValue({
            isAuthorised: false,
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
        });

        render(
            <MemoryRouter initialEntries={['/home']}>
                <Header />
            </MemoryRouter>
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
            <MemoryRouter initialEntries={['/home']}>
                <Header />
            </MemoryRouter>
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

        render(
            <MemoryRouter initialEntries={['/signUp']}>
                <Header />
            </MemoryRouter>
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

        mockedAxios.get.mockRejectedValue({
            response: { status: 401 },
        });

        render(
            <MemoryRouter initialEntries={['/home']}>
                <Header />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(mockLogout).toHaveBeenCalled();
        });
    });
});