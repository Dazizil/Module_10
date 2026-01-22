import axios from "axios";
import {render, screen, waitFor} from "@testing-library/react";
import SuggestedPeople from "./SuggestedPeople";

jest.mock('axios');

describe('Suggested people test', () => {
    let response: any;

    beforeEach(() => {
        response = {
            data: [
                {
                    id: 1,
                    photo: 'assets/photo.png',
                    secondName: 'test',
                    firstName: 'test',
                    username: 'testusername1'
                },
                {
                    id: 2,
                    photo: 'assets/photo.png',
                    secondName: 'test',
                    firstName: 'test',
                    username: 'testusername2'
                },
                {
                    id: 3,
                    photo: 'assets/photo.png',
                    secondName: 'test',
                    firstName: 'test',
                    username: 'testusername3'
                },
            ]
        };

        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(() => 'test-token'),
            },
            writable: true
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getSuggestedPeople test', async () => {
        (axios.get as jest.Mock).mockResolvedValue(response);
        render(<SuggestedPeople/>);
        const suggestedPeoples = await screen.findAllByTestId('user-info-container');

        expect(suggestedPeoples).toHaveLength(3);
        expect(axios.get).toBeCalledTimes(1);
        expect(axios.get).toBeCalledWith(
            'http://localhost:3000/api/getSuggested',
            {
                headers: {
                    Authorization: 'Bearer test-token',
                }
            }
        );
    });

    test('renders title and container', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: [] });

        render(<SuggestedPeople/>);

        await waitFor(() => {
            expect(screen.getByTestId('users-container')).toBeInTheDocument();
            expect(screen.getByText('Suggested people')).toBeInTheDocument();
        });
    });

    test('renders loading state initially', () => {
        (axios.get as jest.Mock).mockResolvedValue(response);

        render(<SuggestedPeople/>);
        expect(screen.getByText('Suggested people')).toBeInTheDocument();
        expect(screen.queryAllByTestId('user-info-container')).toHaveLength(0);
    });
});