import {render, screen, waitFor} from "@testing-library/react";
import {act} from "react";
import Communities from "./Communities";
import axios from "axios";
import {useAuth} from "@/app/context/AuthContext";

jest.mock('axios');
jest.mock('@/app/context/AuthContext');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('Communities test', () => {
    let response:any;
    beforeEach(() => {
        response = {
            data: [
                {
                    id: 1,
                    title: 'testGroup',
                    photo: 'assets/group-1.jpg',
                    membersCount: 123
                },
                {
                    id: 2,
                    title: 'testGroup',
                    photo: 'assets/group-2.jpg',
                    membersCount: 1242143
                },
                {
                    id: 3,
                    title: 'testGroup',
                    photo: 'assets/group-3.jpg',
                    membersCount: 1421323
                },
            ]
        };
        
        mockUseAuth.mockReturnValue({
            isAuthorised: true,
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
        });
        
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
    
    test('getCommunities test', async () => {
        (axios.get as jest.Mock).mockResolvedValue(response);
        
        await act(async () => {
            render(<Communities/>);
        });
        
        const communities = await screen.findAllByTestId('community-item');
        expect(communities).toHaveLength(3);
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});