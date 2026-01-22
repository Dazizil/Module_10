import React, {Component} from 'react';
import './postForm.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import {PostsApiResponse} from '../../types/apiResponse';
import axios from 'axios';

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
            <div className="post-form-container" data-testid={'post-form-container'}>
                <ModalWindow
                    isOpen={isModalOpen}
                    onClose={this.handleCloseModal}
                    onCreate={onAddPost}
                />
                <div className="pic-cont">
                    <img src={myPhoto} alt="Profile" className="profile-picture" />
                    <span>What’s happening?</span>
                </div>
                <button onClick={this.handleOpenModal} className="post-form-button">
                    Tell everyone
                </button>
            </div>
        );
    }
}

export default PostForm;