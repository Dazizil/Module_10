import React, {useState} from 'react';
import './postForm.css'
import ProfilePicture from '../../assets/SomeWomen.jpg'
import ModalWindow from "../ModalWindow/ModalWindow";
import {Post} from "../../mockData";

const PostForm = ({ onAddPost }: { onAddPost: (post: Post) => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={'post-form-container'}>
            <ModalWindow isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={onAddPost}/>
            <div className={'pic-cont'}>
                <img src={ProfilePicture} className={'profile-picture'}/>
                <span>What’s happening?</span>
            </div>
            <button onClick={() => setIsModalOpen(true)} className={'post-form-button'}>Tell everyone</button>
        </div>
    );
};

export default PostForm;