'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './modalWindow.module.css'
import axios from "axios";
import {PostsApiResponse} from "@/app/types/apiResponse";
import CloseImage from "../icons/CloseImage";
import PostIcon from "../icons/PostIcon";
import PencilIcon from "../icons/PencilIcon";
import FileIcon from "../icons/FileIcon";

interface ModalWindowProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (post: PostsApiResponse) => void
}

const ModalWindow = ({isOpen, onClose, onCreate}: ModalWindowProps) => {
    const [title, setTitle] = useState('');
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        function updateWindowWidth() {
            setWindowWidth(window.innerWidth);
        }

        updateWindowWidth();

        window.addEventListener('resize', updateWindowWidth);

        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

    if (!isOpen) return null;

    async function handleCreate() {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`http://localhost:3000/api/posts`,
                {
                    title: title,
                    content: description,
                    image: file ? URL.createObjectURL(file) : ''
                }
                , {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : ''
                    }
                })

            onCreate(response.data);
            onClose();
            setTitle('');
            setDescription('');
            setFile(null);
        } catch (error: any) {

        }
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    }

    function handleTitleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal']}>
                <header className={styles['modal__header']}>
                    <h1 className={styles['modal__header-heading']}>Create a new post</h1>
                    <div className={styles['modal__header-close-img']} onClick={onClose}>
                        <CloseImage/>
                    </div>
                </header>

                <form className={styles['modal__form']}>
                    <div className={styles['modal__form-textarea-container']}>
                        <label className={styles['label-container']} htmlFor={'post-title-textarea'}>
                            <PostIcon/>
                            <span>Post Title</span>
                        </label>
                        <textarea
                            id={'post-title-textarea'}
                            placeholder={'Enter post title'}
                            className={styles['post__form-title-textarea']}
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>

                    <div className={styles['modal__form-textarea-container']}>
                        <label className={styles['label-container']} htmlFor={'description-textarea'}>
                            <PencilIcon/>
                            <span>Description</span>
                        </label>
                        <textarea
                            id={'description-textarea'}
                            placeholder={'Write description here...'}
                            className={styles['comments-textarea']}
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </div>

                    <div className={styles['modal__file']}>
                        <label htmlFor={'post-file'} className={styles['modal__label']}>
                            <FileIcon/>
                            <div className={styles['modal__file__text-container']}>
                                <span>Select a file or drag and drop here</span>
                                {windowWidth > 720 ?
                                    <span className={styles['modal__file-second-text']}>JPG, PNG or PDF, file size no more than 10MB</span>
                                    :
                                    <span className={styles['modal__file-second-text']}>JPG or PNG, no more then 10MB</span>
                                }
                            </div>
                        </label>
                        <input style={{display: 'none'}}
                               id={'post-file'} type={'file'}
                               onChange={handleFileChange}/>
                    </div>
                </form>

                <footer className={styles['modal__footer']}>
                    <button className={styles['modal__button']} onClick={handleCreate}>Create</button>
                </footer>
            </div>
        </div>
    );
};

export default ModalWindow;