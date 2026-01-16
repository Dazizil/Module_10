import React from 'react';
import {Post} from "../../types/MockDataTypes";
import PostCard from '../PostCard/PostCard'
import PostForm from "../PostForm/PostForm";
import {useAuth} from "../../context/AuthContext";

interface FeedProps {
    posts: Post[],
    onAddPost?: (post: Post) => void
}

const Feed = ({posts, onAddPost}: FeedProps) => {
    const {isAuthenticated} = useAuth();
    return (
        <div>
            {isAuthenticated && onAddPost && (
                <PostForm onAddPost={onAddPost}/>
            )}

            {posts.map(post => (
                <PostCard key={post.id} post={post}/>
            ))}
        </div>
    );
};

export default Feed;