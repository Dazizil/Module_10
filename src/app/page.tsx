'use client';
import React, {useEffect, useState} from 'react';
import styles from './homePage.module.css'
import Feed from "@/app/components/Feed/Feed";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import axios from "axios";
import {PostsApiResponse} from "@/app/types/apiResponse";
import {useAuth} from "@/app/context/AuthContext";
import PopUpNotification from "@/app/components/PopUpNotification/PopUpNotification";


const HomePage = () => {
    const {isAuthorised} = useAuth();
    const [posts, setPosts] = useState<PostsApiResponse[]>([]);
    const [notification, setNotification] = useState({
        isVisible: false,
        message: '',
    });

    function showNotification(message: string) {
        setNotification({isVisible: true, message});
    }

    function hideNotification() {
        setNotification(prev => ({...prev, isVisible: false}));
    }

    function addPost(newPost: PostsApiResponse) {
        setPosts(prev => [newPost, ...prev]);
        showNotification('Post created successfully');
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                console.log('Ответ по постам', response.data)
                setPosts(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке постов:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            {/* Head переносится в layout или page как metadata */}
            <div className={styles['home-page-container']}>
                {isAuthorised ?
                    <main className={styles['main-container-authorised']}>
                        <Feed posts={posts} onAddPost={addPost}/>
                        <Sidebar/>
                        <PopUpNotification
                            isVisible={notification.isVisible}
                            message={notification.message}
                            onClose={hideNotification}
                        />
                    </main>
                    :
                    <main className={styles['main-container-unauthorised']}>
                        <Feed posts={posts}/>
                    </main>
                }
            </div>
        </>
    );
};

export default HomePage;