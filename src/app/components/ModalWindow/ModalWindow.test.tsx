import {fireEvent, render, screen} from '@testing-library/react';
import ModalWindow from './ModalWindow';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockCreatedPost = {
    id: 1,
    title: 'Test Post',
    content: 'Test Content',
    image: '',
    authorId: 1,
    authorPhoto: 'user',
    commentsCount: 0,
    creationDate: '1768924568',
    likesCount: 0,
    likedByUsers: [],
    modifiedDate: '1768924568',
};

Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024,
});

describe('Modal window tests', () => {
    const mockOnClose = jest.fn();
    const mockOnCreate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        mockedAxios.post.mockResolvedValue({data: mockCreatedPost});
    });

    test('submits form and calls onCreate with new post', async () => {
        render(
            <ModalWindow
                isOpen={true}
                onClose={mockOnClose}
                onCreate={mockOnCreate}
            />
        );

        fireEvent.change(screen.getByPlaceholderText('Enter post title'), {
            target: {value: 'Test Post'},
        });
        fireEvent.change(screen.getByPlaceholderText('Write description here...'), {
            target: {value: 'Test Content'},
        });

        fireEvent.click(screen.getByText('Create'));


        await screen.findByText('Create');

        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://localhost:3000/api/posts',
            {
                title: 'Test Post',
                content: 'Test Content',
                image: '',
            },
            {
                headers: {Authorization: expect.any(String)}
            }
        );

        expect(mockOnCreate).toHaveBeenCalledWith(mockCreatedPost);
        expect(mockOnClose).toHaveBeenCalled();
    });
});