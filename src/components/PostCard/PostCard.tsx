import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './postCard.module.css'
import axios from "axios";
import {CommentApiResponse, PostsApiResponse, User} from "../../types/apiResponse";
import {useAuth} from "../../context/AuthContext";
import CommentsIcon from "../icons/CommentsIcon";
import LikeIcon from "../icons/LikeIcon";
import CommentsOpenedIcon from "../icons/CommentsOpenedIcon";
import CommentsClosedIcon from "../icons/CommentsClosedIcon";
import {formatTimeAgo} from "../../utils/helpers";
import PencilIcon from "../icons/PencilIcon";
import TrashIcon from "../icons/TrashIcon";
import PopUpNotification from "../PopUpNotification/PopUpNotification";
import Image from "next/image";

const PostCard = ({post}: { post: PostsApiResponse }) => {
        const [likes, setLikes] = useState(post.likesCount);
        const [notification, setNotification] = useState({
            isVisible: false,
            message: '',
        });
        const [isLiked, setIsLiked] = useState(false);
        const [isClicked, setIsClicked] = useState(false);
        const [comment, setComment] = useState('');
        const [comments, setComments] = useState<CommentApiResponse[]>([]);
        const [postAuthor, setPostAuthor] = useState<User>();
        const {logout, login, isAuthorised} = useAuth();

        function showNotification(message: string) {
            setNotification({isVisible: true, message});
        }

        function hideNotification() {
            setNotification(prev => ({...prev, isVisible: false}));
        }

        async function likeHandle() {
            const token = localStorage.getItem('token');
            if (isLiked) {
                try {
                    await axios.post('http://localhost:3000/api/dislike',
                        {
                            postId: post.id,
                        }
                        , {
                            headers: {
                                Authorization: token ? `Bearer ${token}` : '',
                            }
                        }
                    )

                    setLikes(likes - 1);
                    setIsLiked(false);
                    showNotification('Disliked');
                    return;
                } catch (error: any) {
                    if (error.response?.status === 401) {
                        logout();
                        showNotification('Session expired. Please log in again.');
                    }
                }
            }

            try {
                await axios.post('http://localhost:3000/api/like',
                    {
                        postId: post.id,
                    }
                    , {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : '',
                        }
                    }
                )

                setLikes(likes + 1);
                setIsLiked(true);
                showNotification('Liked');
                return;
            } catch (error: any) {
                if (error.response?.status === 401) {
                    logout();
                    showNotification('Session expired. Please log in again.');
                }
            }
        }

        async function addComment() {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.post('http://localhost:3000/api/comments',
                    {
                        postId: post.id,
                        text: comment
                    }
                    , {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : '',
                        }
                    }
                )

                const newComment = response.data;
                setComments((prev) => [...prev, newComment]);
                showNotification('Comment added successfully');
                setComment('');
            } catch (error: any) {
                if (error.response?.status === 401) {
                    logout();
                    showNotification('Session expired. Please log in again.');
                }
            }
        }

        async function deleteComment(commentId: number) {
            const token = localStorage.getItem('token')
            try {
                await axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    }
                });
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
                showNotification('Comment deleted successfully');
            } catch (error) {
                showNotification('Comment was not deleted successfully');
            }
        }

        useEffect(() => {
            async function fetchComments() {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.get(`http://localhost:3000/api/posts/${post.id}/comments`, {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : '',
                        },
                    });
                    console.log('Ответ по комментам', response.data);
                    setComments(response.data);
                } catch (error: any) {
                    console.log(error);
                }
            }

            async function fetchPostAuthor() {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.get(`http://localhost:3000/api/users/${post.authorId}`, {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : '',
                        }
                    })

                    setPostAuthor(response.data);
                    console.log('Ответ по авторам поста', response.data)
                } catch (error: any) {
                    if (error.response?.status === 401) {
                        showNotification('Session expired. Please log in again.');
                    }
                    console.log(error);
                }
            }

            fetchPostAuthor();
            fetchComments();
        }, [post.id, post.authorId, isAuthorised]);


        function handleCommentsCloseClick() {
            setIsClicked(false);
        }

        function handleCommentsOpenClick() {
            setIsClicked(true);
        }

        function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
            setComment(event.target.value);
        }

        return (
            <article className={styles['post-container']} data-testid={'post-card'}>
                <div className={styles['post-info-container']}>
                    <header className={styles['avatar-container']}>
                        <Image width={48} height={48} className={styles['avatar-img']} src={post.authorPhoto} alt={'author avatar'}/>

                        <div className={styles['name-and-time-container']}>
                            <span>{postAuthor?.firstName} </span>
                            <span className={styles['time']}>{formatTimeAgo(post.creationDate)}</span>
                        </div>
                    </header>


                    {(post.image.length > 0) ? (
                        <figure className={styles['post-img-container']}>
                            <Image width={652} height={458} className={styles['post-img']} src={post.image} alt={'post'}/>
                        </figure>
                    ) : ''}


                    <div className={styles['post-description']}>{post.content}</div>

                    <footer className={styles['likes-and-comments-container']}>
                        <div className={styles['likes-container']}>
                            <div onClick={likeHandle} data-testid={'like-button'}>
                                <LikeIcon filter={isLiked ?
                                    'brightness(0) saturate(100%) invert(67%) sepia(98%) saturate(635%) hue-rotate(335deg)'
                                    : 'none'}/>
                            </div>
                            {likes} likes
                        </div>

                        <div className={styles['likes-container']}>
                            <CommentsIcon/>
                            {isAuthorised ?
                                <>
                                    <span data-testid="comment-count">{comments.length}</span> comments
                                    {isClicked ?
                                        <div data-testid="close-comments" onClick={handleCommentsCloseClick}>
                                            <CommentsOpenedIcon/>
                                        </div>
                                        :
                                        <div data-testid="open-comments" onClick={handleCommentsOpenClick}>
                                            <CommentsClosedIcon/>
                                        </div>
                                    }
                                </>
                                :
                                <>
                                    You have to login to see the comments
                                </>
                            }
                        </div>
                    </footer>
                    {
                        isAuthorised ?
                            <>
                                {isClicked ?
                                    (
                                        <div className={styles['comments-section']}>
                                            {comments.map(comment =>
                                                <div className={styles['comment-container']} key={comment.id}>
                                                    <span data-testid={`comment-text-${comment.id}`}>
      #{comment.id}. {comment.text}
    </span>
                                                    <div
                                                        data-testid={`delete-comment-${comment.id}`} onClick={() => deleteComment(comment.id)}>
                                                        <TrashIcon/>
                                                    </div>
                                                </div>)}
                                        </div>
                                    )
                                    : ''}
                                <div className={styles['textarea-container']}>
                                    <label className={styles['label-container']} htmlFor={'comments-textarea'}>
                                        <PencilIcon/>
                                        <span>Add a comment</span>
                                    </label>
                                    <textarea
                                        id={'comments-textarea'}
                                        placeholder={'Write description here...'}
                                        className={styles['comments-textarea']}
                                        value={comment}
                                        onChange={handleChange}
                                    />
                                    <button className={styles['add-comment-btn']} onClick={() => addComment()}>Add a
                                        comment
                                    </button>
                                </div>
                            </>
                            : <></>
                    }
                </div>
                <PopUpNotification
                    isVisible={notification.isVisible}
                    message={notification.message}
                    onClose={hideNotification}
                />
            </article>
        );
    }
;

export default PostCard;