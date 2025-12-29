export interface Comment {
    id: string;
    text: string;
}

export interface Post {
    id: string;
    author: string;
    username: string;
    authorAvatar: string;
    timestamp: string;
    imageUrl: string;
    description: string;
    likes: number;
    comments: Comment[];
}

export interface User {
    id: string;
    name: string;
    lastname: string;
    username: string;
    avatar: string;
}

export interface Community {
    id: string;
    name: string;
    numberOfMembers: number;
    avatar: string;
}

export const mockPosts: Post[] = [
    {
        id: '1',
        author: 'Helena',
        username: 'helenahills',
        authorAvatar: '../assets/48fb0979b0fbdd8e320622de39475b562ddad56d 20.54.03.png',
        timestamp: '2025-12-10T14:30:00',
        imageUrl: '../assets/image.jpg',
        description: 'Lorem ipsum',
        likes: 21,
        comments: [
            {
                id: '1',
                text: 'Lorem ipsum dolor sit amet',
            },
            {
                id: '2',
                text: 'Lorem ipsum dolor sit amet',
            },
        ],
    },
    {
        id: '2',
        author: 'Charles',
        username: 'charles',
        authorAvatar: '../assets/c6d09f08fc67578e43e3a45f9a6a703015e0ab1c.jpg',
        timestamp: '2025-12-12T09:15:00',
        imageUrl: '',
        description: 'Post description',
        likes: 6,
        comments: [],
    },
    {
        id: '3',
        author: 'Oskar',
        username: 'oscardavis',
        authorAvatar: '../assets/873a411918e5f83ef56349627f7d99976bc2143e.jpg',
        timestamp: '2025-12-14T18:22:00',
        imageUrl: '../assets/image1.jpg',
        description: 'Body text for a post. Since it’s a social app, sometimes it’s a hot take, and sometimes it’s a question.',
        likes: 58,
        comments: [],
    },
    {
        id: '4',
        author: 'Daniel Jay Park',
        username: 'danielj',
        authorAvatar: '../assets/cdcab709fd04dd096ffaf33b14d2ea81f7ef12f7.jpg',
        timestamp: '2025-12-16T11:05:00',
        imageUrl: '',
        description: 'Body text for a post. Since it’s a social app, sometimes it’s an observation, and sometimes it’s seeking recommendations.',
        likes: 4,
        comments: [
            {
                id: '1',
                text: 'Lorem ipsum dolor sit amet',
            },
            {
                id: '2',
                text: 'Lorem ipsum dolor sit amet',
            },
        ],
    },
    {
        id: '5',
        author: 'Mark Rojas',
        username: 'carlorojas',
        authorAvatar: '../assets/178bddc8313c366f12a6c0998129db7e1f0bcc8f.jpg',
        timestamp: '2025-12-18T08:45:00',
        imageUrl: '',
        description: 'Body text for a post. Since it’s a social app, sometimes it’s sharing tips, and sometimes it’s freeloading.',
        likes: 85,
        comments: [
            {
                id: '1',
                text: 'Lorem ipsum dolor sit amet',
            },
        ],
    },
];

export const mockUsers: User[] = [
    {
        id: 'user-1',
        name: 'Helena',
        lastname: 'Hills',
        username: 'helenahills',
        avatar: '../assets/48fb0979b0fbdd8e320622de39475b562ddad56d 20.54.03.png',
    },
    {
        id: 'user-2',
        name: 'Charles',
        lastname: '',
        username: 'charles',
        avatar: '../assets/c6d09f08fc67578e43e3a45f9a6a703015e0ab1c.jpg',
    },
    {
        id: 'user-3',
        name: 'Oskar',
        lastname: 'Davis',
        username: 'oscardavis',
        avatar: '../assets/873a411918e5f83ef56349627f7d99976bc2143e.jpg',
    },
    {
        id: 'user-4',
        name: 'Daniel Jay',
        lastname: 'Park',
        username: 'danielj',
        avatar: '../assets/cdcab709fd04dd096ffaf33b14d2ea81f7ef12f7.jpg',
    },
    {
        id: 'user-5',
        name: 'Mark',
        lastname: 'Rojas',
        username: 'carlorojas',
        avatar: '../assets/178bddc8313c366f12a6c0998129db7e1f0bcc8f.jpg',
    },
];

export const mockCommunities: Community[] = [
    {
        id: 'community-1',
        name: 'Design Enthusiasts',
        numberOfMembers: 13200,
        avatar: '../assets/Avatar.jpg'
    },
    {
        id: 'community-2',
        name: 'Photographers of SF',
        numberOfMembers: 2000,
        avatar: '../assets/67563cb3566e279e4911a28244eb190346ccbc3c.jpg'
    },
    {
        id: 'community-3',
        name: 'Marina crew',
        numberOfMembers: 125,
        avatar: '../assets/fca3b53b5281f42c270c0a39d60a3f66120b6dd6.jpg'
    }
]