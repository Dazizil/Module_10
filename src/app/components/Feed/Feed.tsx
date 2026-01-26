'use client'
import React from 'react';
import PostCard from '../PostCard/PostCard'
import PostForm from "../PostForm/PostForm";
import {useAuth} from "@/app/context/AuthContext";
import {PostsApiResponse} from "@/app/types/apiResponse";

interface FeedProps {
    posts: PostsApiResponse[],
    onAddPost?: (post: PostsApiResponse) => void
}

const Feed = ({posts, onAddPost}: FeedProps) => {
    const {isAuthorised} = useAuth();
    return (
        <div>
            {isAuthorised && onAddPost && (
                <PostForm onAddPost={onAddPost}/>
            )}

            {posts.map(post => (
                <PostCard key={post.id} post={post}/>
            ))}
        </div>
    );
};

export default Feed;