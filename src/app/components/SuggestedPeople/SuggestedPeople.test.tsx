import axios from "axios";
import {render, screen, waitFor} from "@testing-library/react";
import {act} from "react";
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
        
        await act(async () => {
            render(<SuggestedPeople/>);
        });
        
        const suggestedPeoples = await screen.findAllByTestId('user-info-container');

        expect(suggestedPeoples).toHaveLength(3);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
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

        await act(async () => {
            render(<SuggestedPeople/>);
        });

        await waitFor(() => {
            expect(screen.getByTestId('users-container')).toBeInTheDocument();
            expect(screen.getByText('Suggested people')).toBeInTheDocument();
        });
    });

    test('renders title immediately', () => {
        (axios.get as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves

        render(<SuggestedPeople/>);
        
        expect(screen.getByText('Suggested people')).toBeInTheDocument();
        expect(screen.queryAllByTestId('user-info-container')).toHaveLength(0);
    });
});