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