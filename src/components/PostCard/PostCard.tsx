import React, {useState} from 'react';
import {Comment, Post} from "../../mockData";
import './postCard.css'
import likeIcon from '../../assets/LikeImage.svg'
import commentsIcon from '../../assets/CommentsIcon.svg'
import PencilIcon from '../../assets/PencilIcon.svg'
import {useAuth} from "../../context/AuthContext";
import commentsOpened from '../../assets/CommentsOpenedIcon.svg'
import {useTheme} from "../../context/ThemeContext";
import DarkLikeIcon from '../../assets/DarkLikeImage.svg'
import DarkCommentsIcon from '../../assets/DarkComments.svg'
import DarkCommentsOpened from '../../assets/DarkCommentsOpened.svg'
import commentsClosed from '../../assets/CommentsClosedIcon.svg'
import DarkCommentsClosed from '../../assets/DarkCommentsClosed.svg'
import DarkPencilIcon from '../../assets/DarkPencilIcon.svg'
import TrashIcon from '../../assets/TrashIcon.svg'
import DarkTrashIcon from '../../assets/DarkTrashIcon.svg'

function formatTimeAgo(timestamp: string): string {
    let now = Date.now();
    let postTime = Date.parse(timestamp);
    let diffMs = now - postTime;

    //Если дата в будущем
    if (diffMs < 0) return "just now";

    let seconds = Math.floor(diffMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return new Date(postTime).toLocaleDateString();
}

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
                        {theme === 'dark' ?
                            <img style={{
                                filter: isLiked ?
                                    'brightness(0) saturate(100%) invert(67%) sepia(98%) saturate(635%) hue-rotate(335deg)'
                                    : 'none'
                            }} onClick={likeHandle} src={likeIcon} alt={'like'}/>
                            :
                            <img style={{
                                filter: isLiked ?
                                    'brightness(0) saturate(100%) invert(67%) sepia(98%) saturate(635%) hue-rotate(335deg)'
                                    : 'none'
                            }} onClick={likeHandle} src={DarkLikeIcon} alt={'like'}/>
                        }

                        {likes} likes
                    </div>

                    <div className={'likes-container'}>
                        {theme === 'dark' ?
                            <img src={commentsIcon} alt={'comments'}/>
                            :
                            <img src={DarkCommentsIcon} alt={'comments'}/>
                        }
                        {isAuthenticated ?
                            <>
                                {comments.length} comments
                                {isClicked ?
                                    theme === 'dark' ?
                                        <img
                                            onClick={() => setIsClicked(false)}
                                            src={commentsOpened}
                                            alt={'Comments opened'}
                                        />
                                        :
                                        <img
                                            onClick={() => setIsClicked(false)}
                                            src={DarkCommentsOpened}
                                            alt={'Comments opened'}
                                        />
                                    :
                                    theme === 'dark' ?
                                        <img
                                            onClick={() => setIsClicked(true)}
                                            src={commentsClosed}
                                            alt={'Comments closed'}
                                        />
                                        :
                                        <img
                                            onClick={() => setIsClicked(true)}
                                            src={DarkCommentsClosed}
                                            alt={'Comments closed'}
                                        />
                                }
                            </>
                            :
                            <>
                                You have to login to see the comments
                            </>
                        }
                    </div>
                </footer>
                {isAuthenticated ?
                    <>
                        {isClicked ?
                            (
                                <div className={'comments-section'}>
                                    {comments.map(comment =>
                                        <div className={'comment-container'}>
                                            <span>#{comment.id}. {comment.text}</span>
                                            <img src={theme === 'dark' ? TrashIcon : DarkTrashIcon} onClick={() => deleteComment(comment.id)}/>
                                        </div>)}
                                </div>
                            )
                            : ''}
                        <div className={'textarea-container'}>
                            <label className={'label-container'} htmlFor={'comments-textarea'}>
                                {theme === 'dark' ?
                                    <img src={PencilIcon} alt={'Pencil'}/>
                                    :
                                    <img src={DarkPencilIcon} alt={'Pencil'}/>
                                }
                                <span>Add a comment</span>
                            </label>
                            <textarea
                                id={'comments-textarea'}
                                placeholder={'Write description here...'}
                                className={'comments-textarea'}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
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
    );
};

export default PostCard;