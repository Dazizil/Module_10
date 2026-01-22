import React, {useEffect, useState} from 'react';
import './homePage.css'
import Feed from "../../components/Feed/Feed";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import {PostsApiResponse} from "../../types/apiResponse";
import {useAuth} from "../../context/AuthContext";
import PopUpNotification from "../../components/PopUpNotification/PopUpNotification";

const HomePage = () => {
    const { isAuthorised } = useAuth();
    const [posts, setPosts] = useState<PostsApiResponse[]>([]);
    const [notification, setNotification] = useState({
        isVisible: false,
        message: '',
    });

    function showNotification (message: string) {
        setNotification({isVisible: true, message});
    }

    function hideNotification () {
        setNotification(prev => ({...prev, isVisible: false}));
    }

        function addPost (newPost: PostsApiResponse) {
        setPosts(prev => [newPost, ...prev]);
        showNotification('Post created successfully');
    }



    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                console.log('Ответ по постам',response.data)
                setPosts(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке постов:', error);
            }
        };


        fetchPosts();
    }, []);


    return (
        <div className={'home-page-container'}>
            {isAuthorised ?
                <main className={'main-container-authorised'}>
                    <Feed posts={posts} onAddPost={addPost}/>
                    <Sidebar/>
                    <PopUpNotification
                        isVisible={notification.isVisible}
                        message={notification.message}
                        onClose={hideNotification}
                    />
                </main>
                :
                <main className={'main-container-unauthorised '}>
                    <Feed posts={posts}/>
                </main>
            }

        </div>
    )
        ;
};

export default HomePage;