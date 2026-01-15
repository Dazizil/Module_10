import {Community, Post, User} from "./types/MockDataTypes";

export const mockPosts: Post[] = [
    {
        id: '1',
        author: 'Helena',
        username: 'helenahills',
        authorAvatar: '../assets/Helena.png',
        timestamp: '2025-12-10T14:30:00',
        imageUrl: '../assets/Flowers.jpg',
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
        authorAvatar: '../assets/Dachshund.jpg',
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
        authorAvatar: '../assets/Oskar.jpg',
        timestamp: '2025-12-14T18:22:00',
        imageUrl: '../assets/Watches.jpg',
        description: 'Body text for a post. Since it’s a social app, sometimes it’s a hot take, and sometimes it’s a question.',
        likes: 58,
        comments: [],
    },
    {
        id: '4',
        author: 'Daniel Jay Park',
        username: 'danielj',
        authorAvatar: '../assets/DanielJayPark.jpg',
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
        authorAvatar: '../assets/MarkRojas.jpg',
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
        avatar: '../assets/Helena.png',
    },
    {
        id: 'user-2',
        name: 'Charles',
        lastname: '',
        username: 'charles',
        avatar: '../assets/Dachshund.jpg',
    },
    {
        id: 'user-3',
        name: 'Oskar',
        lastname: 'Davis',
        username: 'oscardavis',
        avatar: '../assets/Oskar.jpg',
    },
    {
        id: 'user-4',
        name: 'Daniel Jay',
        lastname: 'Park',
        username: 'danielj',
        avatar: '../assets/DanielJayPark.jpg',
    },
    {
        id: 'user-5',
        name: 'Mark',
        lastname: 'Rojas',
        username: 'carlorojas',
        avatar: '../assets/MarkRojas.jpg',
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
        avatar: '../assets/StreetPicture2.jpg'
    },
    {
        id: 'community-3',
        name: 'Marina crew',
        numberOfMembers: 125,
        avatar: '../assets/StreetPicture.jpg'
    }
]