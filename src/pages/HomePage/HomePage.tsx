import React, {useState} from 'react';
import './homePage.css'
import PostsList from "../../components/PostsList/PostsList";
import {mockPosts, Post} from "../../mockData";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useAuth} from "../../context/AuthContext";

const HomePage = () => {
    const {isAuthenticated} = useAuth();
    const [posts, setPosts] = useState<Post[]>(mockPosts);

    const addPost = (newPost: Post) => {
        setPosts(prev => [newPost, ...prev]);
    };


    return (
        <div className={'home-page-container'}>
            {isAuthenticated ?
                <main className={'main-container-authorised'}>
                    <PostsList posts={posts} onAddPost={addPost}/>
                    <Sidebar/>
                </main>
                :
                <main className={'main-container-unauthorised '}>
                    <PostsList posts={posts}/>
                </main>
            }

        </div>
    )
        ;
};

export default HomePage;