import {render, screen} from '@testing-library/react';
import Feed from './Feed';
import {useAuth} from '../../context/AuthContext';

jest.mock('../../context/AuthContext');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const mockPosts = [
    {
        authorId: 1,
        authorPhoto: 'user',
        commentsCount: 2,
        content: 'test',
        creationDate: '1768924568',
        id: 1,
        image: 'assets/test.img',
        likedByUsers: [],
        likesCount: 24,
        modifiedDate: '1762924568',
        title: 'test'
    },
    {
        authorId: 2,
        authorPhoto: 'user',
        commentsCount: 3,
        content: 'test',
        creationDate: '1768924568',
        id: 2,
        image: 'assets/test.img',
        likedByUsers: [],
        likesCount: 8,
        modifiedDate: '1762924568',
        title: 'test'
    },
];

const mockOnAddPost = jest.fn();

describe('Feed', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders PostForm when user is authorized and onAddPost is provided', () => {
        mockUseAuth.mockReturnValue({
            isAuthorised: true,
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
        });

        render(<Feed posts={mockPosts} onAddPost={mockOnAddPost}/>);

        expect(screen.getByTestId('post-form-container')).toBeInTheDocument();
        expect(screen.getAllByTestId('post-card')).toHaveLength(2);
    });

    test('does NOT render PostForm when user is NOT authorized', () => {
        mockUseAuth.mockReturnValue({
            isAuthorised: false,
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
        });

        render(<Feed posts={mockPosts} onAddPost={mockOnAddPost}/>);

        expect(screen.queryByTestId('post-form-container')).not.toBeInTheDocument();
        expect(screen.getAllByTestId('post-card')).toHaveLength(2);
    });

    test('does NOT render PostForm when onAddPost is NOT provided (even if authorized)', () => {
        mockUseAuth.mockReturnValue({
            isAuthorised: true,
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
        });

        render(<Feed posts={mockPosts}/>);

        expect(screen.queryByTestId('post-form-container')).not.toBeInTheDocument();
        expect(screen.getAllByTestId('post-card')).toHaveLength(2);
    });

    test('renders correct number of PostCard components', () => {
        mockUseAuth.mockReturnValue({
            isAuthorised: false,
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
        });

        render(<Feed posts={[]}/>);

        expect(screen.queryByTestId('post-card')).not.toBeInTheDocument();

        render(<Feed posts={mockPosts}/>);
        expect(screen.getAllByTestId('post-card')).toHaveLength(2);
    });
});