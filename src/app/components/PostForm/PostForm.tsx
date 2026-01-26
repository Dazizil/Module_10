'use client'
import React, {Component} from 'react';
import styles from './postForm.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import {PostsApiResponse} from '@/app/types/apiResponse';
import axios from 'axios';
import Image from "next/image";

interface PostFormProps {
    onAddPost: (post: PostsApiResponse) => void;
}

interface PostFormState {
    isModalOpen: boolean;
    myPhoto: string;
}

class PostForm extends Component<PostFormProps, PostFormState> {
    constructor(props: PostFormProps) {
        super(props);
        this.state = {
            isModalOpen: false,
            myPhoto: '',
        };
    }

    async componentDidMount() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/me', {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });
            console.log('Ответ по мне', response.data.profileImage);
            this.setState({ myPhoto: response.data.profileImage || '' });
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
            this.setState({ myPhoto: '' });
        }
    }

    handleOpenModal = () => {
        this.setState({ isModalOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
        const { isModalOpen, myPhoto } = this.state;
        const { onAddPost } = this.props;

        return (
            <div className={styles['post-form-container']} data-testid={'post-form-container'}>
                <ModalWindow
                    isOpen={isModalOpen}
                    onClose={this.handleCloseModal}
                    onCreate={onAddPost}
                />
                <div className={styles['post-form-picture-container']}>
                    <Image width={64} height={64} src={myPhoto} alt="Profile" className={styles['profile-picture']} />
                    <span>What&#39;s happening?</span>
                </div>
                <button onClick={this.handleOpenModal} className={styles['post-form-button']}>
                    Tell everyone
                </button>
            </div>
        );
    }
}

export default PostForm;