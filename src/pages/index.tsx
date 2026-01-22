import React, {useEffect, useState} from 'react';
import styles from './homePage.module.css'
import Feed from "../components/Feed/Feed";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import {PostsApiResponse} from "@/types/apiResponse";
import {useAuth} from "@/context/AuthContext";
import PopUpNotification from "../components/PopUpNotification/PopUpNotification";
import Head from "next/head";

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
            <Head>
                <title>Sidekick - Social Network | Home Page</title>
                <meta name="description"
                      content="Join Sidekick social network to connect with friends, share posts, discover communities, and engage with content. Create your account and start sharing today!"/>
                <meta name="keywords"
                      content="social network, social media, connect, share, posts, communities, friends, social platform"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                <meta property="og:type" content="website"/>
                <meta property="og:title" content="Sidekick - Social Network | Home Page"/>
                <meta property="og:description"
                      content="Join Sidekick social network to connect with friends, share posts, discover communities, and engage with content."/>
                <meta property="og:site_name" content="Sidekick"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="Sidekick - Social Network"/>
                <meta name="twitter:description" content="Connect, share, and discover on Sidekick social network"/>

                <link rel="canonical" href="https://sidekick.com/"/>
            </Head>
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
    )
        ;
};

export default HomePage;