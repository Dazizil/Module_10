import React from 'react';
import {Post} from "../../mockData";
import PostCard from '../PostCard/PostCard'
import PostForm from "../PostForm/PostForm";
import {useAuth} from "../../context/AuthContext";

const PostsList = ({posts, onAddPost}: { posts: Post[], onAddPost?: (post: Post) => void }) => {
    const {isAuthenticated} = useAuth();
    return (
        <div>
            {isAuthenticated && onAddPost && (
                <PostForm onAddPost={onAddPost} />
            )}

            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostsList;