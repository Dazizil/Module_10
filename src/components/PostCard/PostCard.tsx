import React, {ChangeEvent, useState} from 'react';
import {Comment, Post} from "../../types/MockDataTypes";
import './postCard.css'
import LikeIcon from '../icons/LikeIcon'
import PencilIcon from '../icons/PencilIcon'
import {useAuth} from "../../context/AuthContext";
import {useTheme} from "../../context/ThemeContext";
import TrashIcon from '../icons/ThrashIcon'
import {formatTimeAgo} from "../../utils/helpers";
import CommentsClosedIcon from "../icons/CommentsClosedIcon";
import CommentsOpenedIcon from "../icons/CommentsOpenedIcon";
import CommentsIcon from "../icons/CommentsIcon";


const PostCard = ({post}: { post: Post }) => {
    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments);
    const {isAuthenticated} = useAuth();
    const {theme} = useTheme()

    function likeHandle() {
        if (isLiked) {
            setLikes(likes - 1);
            setIsLiked(false);
            return;
        }
        setLikes(likes + 1);
        setIsLiked(true);
    }

    function commentCreator(comment: string) {
        const newComment: Comment = {
            id: `${comments.length + 1}`,
            text: `${comment}`
        };
        setComments(comments => [...comments, newComment])
        setComment('')
    }

    function deleteComment(commentId: string) {
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    }

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
                    <img className={'avatar-img'} src={post.authorAvatar} alt={'author avatar'}/>

                    <div className={'name-and-time-container'}>
                        <span>{post.author} </span>
                        <span className={'time'}>{formatTimeAgo(post.timestamp)}</span>
                    </div>
                </header>


                {(post.imageUrl.length > 0) ? (
                    <figure className={'post-img-container'}>
                        <img className={'post-img'} src={post.imageUrl} alt={'post'}/>
                    </figure>
                ) : ''}


                <div className={'post-description'}>{post.description}</div>

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
                        {isAuthenticated ?
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
                    isAuthenticated ?
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
                                <button className={'add-comment-btn'} onClick={() => commentCreator(comment)}>Add a
                                    comment
                                </button>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </article>
    )
        ;
};

export default PostCard;