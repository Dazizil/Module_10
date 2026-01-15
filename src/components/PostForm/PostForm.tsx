import React, {Component} from 'react';
import './postForm.css';
import ProfilePicture from '../../assets/SomeWomen.jpg';
import ModalWindow from '../ModalWindow/ModalWindow';
import {Post} from "../../types/MockDataTypes";

interface PostFormProps {
    onAddPost: (post: Post) => void;
}

interface PostFormState {
    isModalOpen: boolean;
}

class PostForm extends Component<PostFormProps, PostFormState> {
    constructor(props: PostFormProps) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    }

    handleOpenModal = () => {
        this.setState({ isModalOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
        const { onAddPost } = this.props;
        const { isModalOpen } = this.state;

        return (
            <div className="post-form-container">
                <ModalWindow
                    isOpen={isModalOpen}
                    onClose={this.handleCloseModal}
                    onCreate={onAddPost}
                />
                <div className="pic-cont">
                    <img src={ProfilePicture} className="profile-picture" alt="Profile" />
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