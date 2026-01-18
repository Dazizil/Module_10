import React, {ChangeEvent, useEffect, useState} from 'react';
import './postCard.css'
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
        const {logout, isAuthorised} = useAuth();

        function showNotification (message: string) {
            setNotification({isVisible: true, message});
        }

        function hideNotification () {
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
                                Authorization: token ? `Bearer ${token}` : undefined,
                            }
                        }
                    )

                    setLikes(likes - 1);
                    setIsLiked(false);
                    showNotification('Disliked');
                    return;
                } catch (error: any) {
                    if (error.response?.status === 401) {
                        logout()
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
                            Authorization: token ? `Bearer ${token}` : undefined,
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
                            Authorization: token ? `Bearer ${token}` : undefined,
                        }
                    }
                )

                const newComment = response.data;
                setComments((prev) => [...prev, newComment]);
                showNotification('Comment added successfully');
                setComment('')
            } catch (error: any) {
                if (error.response?.status === 401) {
                    logout();
                }
            }
        }

        async function deleteComment(commentId: number) {
            const token = localStorage.getItem('token')
            try {
                await axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    }
                });
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
                showNotification('Comment deleted successfully');
            } catch (error) {
                console.error('Ошибка удаления комментария:', error);
            }
        }

        useEffect(() => {
            const token = localStorage.getItem('token');
            const fetchComments = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/posts/${post.id}/comments`, {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : undefined,
                        },
                    });
                    console.log('Ответ по комментам', response.data);
                    setComments(response.data);
                } catch (error: any) {
                    if (error.response?.status === 401) {
                        logout()
                    }
                    console.log(error);
                }
            };

            async function fetchPostAuthor() {
                try {
                    const response = await axios.get(`http://localhost:3000/api/users/${post.authorId}`, {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : undefined,
                        }
                    })

                    setPostAuthor(response.data);
                    console.log('Ответ по авторам поста', response.data)
                } catch (error: any) {
                    if (error.response?.status === 401) {
                        logout();
                    }
                    console.log(error);
                }
            }

            fetchPostAuthor();
            fetchComments();
        }, [post.id]);


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
            <article className={'post-container'}>
                <div className={'post-info-container'}>
                    <header className={'avatar-container'}>
                        <img className={'avatar-img'} src={post.authorPhoto} alt={'author avatar'}/>

                        <div className={'name-and-time-container'}>
                            <span>{postAuthor?.firstName} </span>
                            <span className={'time'}>{formatTimeAgo(post.creationDate)}</span>
                        </div>
                    </header>


                    {(post.image.length > 0) ? (
                        <figure className={'post-img-container'}>
                            <img className={'post-img'} src={post.image} alt={'post'}/>
                        </figure>
                    ) : ''}


                    <div className={'post-description'}>{post.content}</div>

                    <footer className={'likes-and-comments-container'}>
                        <div className={'likes-container'}>
                            <div onClick={likeHandle}>
                                <LikeIcon filter={isLiked ?
                                    'brightness(0) saturate(100%) invert(67%) sepia(98%) saturate(635%) hue-rotate(335deg)'
                                    : 'none'}/>
                            </div>
                            {likes} likes
                        </div>

                        <div className={'likes-container'}>
                            <CommentsIcon/>
                            {isAuthorised ?
                                <>
                                    {comments.length} comments
                                    {isClicked ?
                                        <div onClick={handleCommentsCloseClick}>
                                            <CommentsOpenedIcon/>
                                        </div>
                                        :
                                        <div onClick={handleCommentsOpenClick}>
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
                                        <div className={'comments-section'}>
                                            {comments.map(comment =>
                                                <div className={'comment-container'}>
                                                    <span>#{comment.id}. {comment.text}</span>
                                                    <div onClick={() => deleteComment(comment.id)}>
                                                        <TrashIcon/>
                                                    </div>
                                                </div>)}
                                        </div>
                                    )
                                    : ''}
                                <div className={'textarea-container'}>
                                    <label className={'label-container'} htmlFor={'comments-textarea'}>
                                        <PencilIcon/>
                                        <span>Add a comment</span>
                                    </label>
                                    <textarea
                                        id={'comments-textarea'}
                                        placeholder={'Write description here...'}
                                        className={'comments-textarea'}
                                        value={comment}
                                        onChange={handleChange}
                                    />
                                    <button className={'add-comment-btn'} onClick={() => addComment()}>Add a
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