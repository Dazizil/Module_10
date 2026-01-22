import {render, screen} from "@testing-library/react";
import Communities from "./Communities";
import axios from "axios";

jest.mock('axios');

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
        }
    })
    test('getCommunities test', async () => {
        (axios.get as jest.Mock).mockReturnValue(response);
        render(<Communities/>);
        const communities = await screen.findAllByTestId('community-item');
        expect(communities).toHaveLength(3);
        expect(axios.get).toBeCalledTimes(1);
    })
})