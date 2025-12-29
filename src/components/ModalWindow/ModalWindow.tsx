import React, {useState} from 'react';
import './modalWindow.css'
import PencilIcon from "../../assets/fi-rr-pencil.svg";
import PostIcon from '../../assets/Vector(7).svg'
import CloseImage from '../../assets/Vector(8).svg'
import DarkCloseImage from '../../assets/DarkCloseImage.svg'
import FileIcon from '../../assets/Vector(9).svg'
import {Post} from "../../mockData";
import {useTheme} from "../../context/ThemeContext";
import DarkFileIcon from '../../assets/DarkFileIcon.svg'
import DarkPostIcon from '../../assets/DarkPostIcon.svg'
import DarkPencilIcon from '../../assets/DarkPencilIcon.svg'

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

    const handleCreate = () => {
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
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className={'modal-overlay'}>
            <div className={'modal'}>
                <header className={'modal__header'}>
                    <h1 className={'modal__header-heading'}>Create a new post</h1>
                    {theme === 'dark' ?
                        <img src={CloseImage} alt={'Close Modal'} className={'modal__header-close-img'}
                             onClick={onClose}/>
                        :
                        <img src={DarkCloseImage} alt={'Close Modal'} className={'modal__header-close-img'}
                             onClick={onClose}/>
                    }

                </header>

                <form className={'modal__form'}>
                    <div className={'modal__form-textarea-container'}>
                        <label className={'label-container'} htmlFor={'post-title-textarea'}>
                            {theme === 'dark' ?
                                <img src={PostIcon} alt={'Pencil'}/>
                            :
                                <img src={DarkPostIcon} alt={'Pencil'}/>
                            }
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
                            {theme === 'dark' ?
                                <img src={PencilIcon} alt={'Pencil'}/>
                            :
                                <img src={DarkPencilIcon} alt={'Pencil'}/>
                            }
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
                            {theme === 'dark' ?
                                <img src={FileIcon} alt={'File'} className={'modal__file-icon'}/>
                                :
                                <img src={DarkFileIcon} alt={'File'} className={'modal__file-icon'}/>
                            }
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