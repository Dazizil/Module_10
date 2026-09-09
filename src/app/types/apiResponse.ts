export interface PostsApiResponse {
    authorId: number,
    authorPhoto: string,
    commentsCount: number,
    content: string,
    creationDate: string,
    id: number,
    image: string,
    likedByUsers: User[],
    likesCount: number,
    modifiedDate: string,
    title: string
}

export interface User {
    creationDate: string,
    description: string,
    email: string,
    firstName: string,
    id: number,
    lastLogin: string,
    modifiedDate: string,
    profileImage: string,
    secondName: string,
    username: string
}

export interface CommentApiResponse {
    authorId: number,
    creationDate: string,
    id: number,
    modifiedDate: string,
    postId: number,
    text: string
}

export interface SuggestedPeopleApiResponse {
    description: string,
    firstName: string,
    id: number,
    photo: string,
    secondName: string,
    username: string,
}

export interface CommunitiesApiResponse {
    id: number,
    membersCount: number,
    photo: string,
    title: string
}