import React, {useState} from 'react';
import './modalWindow.css'
import PencilIcon from "../icons/PencilIcon";
import PostIcon from '../icons/CloseImage'
import CloseImage from '../icons/CloseImage'
import FileIcon from '../icons/FileIcon'
import {Post} from "../../types/MockDataTypes";
import {useTheme} from "../../context/ThemeContext";

interface ModalWindowProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (post: Post) => void
}

const ModalWindow = ({isOpen, onClose, onCreate}: ModalWindowProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const {theme} = useTheme();
    if (!isOpen) return null;

    function handleCreate() {
        const newPost: Post = {
            id: '',
            author: 'me',
            username: 'me',
            authorAvatar: '',
            timestamp: Date(),
            imageUrl: file ? URL.createObjectURL(file) : '',
            description: `${description}`,
            likes: 0,
            comments: []
        };

        onCreate(newPost);
        onClose();
        setTitle('');
        setDescription('');
        setFile(null);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <div className={'modal-overlay'}>
            <div className={'modal'}>
                <header className={'modal__header'}>
                    <h1 className={'modal__header-heading'}>Create a new post</h1>
                    <div className={'modal__header-close-img'} onClick={onClose}>
                        <CloseImage fill={theme === 'dark' ? 'white' : 'black'}/>
                    </div>
                </header>

                <form className={'modal__form'}>
                    <div className={'modal__form-textarea-container'}>
                        <label className={'label-container'} htmlFor={'post-title-textarea'}>
                            <PostIcon fill={theme === 'dark' ? 'white' : 'black'}/>
                            <span>Post Title</span>
                        </label>
                        <textarea
                            id={'post-title-textarea'}
                            placeholder={'Enter post title'}
                            className={'post__form-title-textarea'}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={'modal__form-textarea-container'}>
                        <label className={'label-container'} htmlFor={'description-textarea'}>
                            <PencilIcon fill={theme === 'dark' ? 'white' : 'black'}/>
                            <span>Description</span>
                        </label>
                        <textarea
                            id={'description-textarea'}
                            placeholder={'Write description here...'}
                            className={'comments-textarea'}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className={'modal__file'}>
                        <label htmlFor={'post-file'} className={'modal__label'}>
                            <FileIcon fill={theme === 'dark' ? 'white' : 'black'}/>
                            <div className={'modal__file__text-container'}>
                                <span>Select a file or drag and drop here</span>
                                <span
                                    className={'modal__file-second-text'}>JPG, PNG or PDF, file size no more than 10MB</span>
                            </div>
                        </label>
                        <input style={{display: 'none'}}
                               id={'post-file'} type={'file'}
                               onChange={handleFileChange}/>
                    </div>
                </form>

                <footer className={'modal__footer'}>
                    <button className={'modal__button'} onClick={handleCreate}>Create</button>
                </footer>
            </div>
        </div>
    );
};

export default ModalWindow;