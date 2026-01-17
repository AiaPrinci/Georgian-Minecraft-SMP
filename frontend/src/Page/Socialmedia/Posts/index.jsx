import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export const Posts = () => {
    const [authStatus, setAuthStatus] = useState(null);
    const navigate = useNavigate();
    const [commentsInput, setCommentsInput] = useState({});

    const [post, setPost] = useState({
        title: '',
        content: '',
        image: null
    });

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:5000/auth-status',
                    { withCredentials: true }
                );

                if (!res.data.logged_in) {
                    navigate('/login');
                    return;
                }

                setAuthStatus(res.data.user.username);

            } catch (error) {
                console.error('Error fetching auth status:', error);
            }
        };

        fetchAuthStatus();
    }, [navigate]);

    const handlePostUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("content", post.content);
        formData.append("created_at", post.created_at);
        if (post.image) formData.append("image", post.image);

        try {
            const res = await axios.post(
                'http://localhost:5000/posts',
                formData,
                { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("Post uploaded!");
            setPost({ title: "", content: "", image: null, created_at: "" });
        } catch (error) {
            console.error("Error uploading post:", error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${postId}`, { withCredentials: true });
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {

            try {
                const posts = await axios.get(
                    'http://localhost:5000/posts',
                    { withCredentials: true }
                );

                console.log(posts.data);
                setPosts(posts.data);
            } catch (error) {
                console.error("Error uploading post:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleAddComment = async (postId) => {
        try {
            await axios.post(
                `http://localhost:5000/posts/${postId}/comments`,
                { content: commentsInput[postId] },
                { withCredentials: true }
            );

            setCommentsInput({ ...commentsInput, [postId]: '' });

            const res = await axios.get(
                'http://localhost:5000/posts',
                { withCredentials: true }
            );
            setPosts(res.data);

            } catch (error) {
                console.error("Error adding comment:", error);
            }
    };

    const handleDeleteComment = async (commentId, postId) => {
        try {
            await axios.delete(`http://localhost:5000/comments/${commentId}`, { withCredentials: true });

            // Update posts state to remove the deleted comment
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: post.comments.filter(c => c.id !== commentId)
                    };
                }
                return post;
            }));
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
    };


    const handleLike = async (postId) => {
        try {
            await axios.post(
                `http://localhost:5000/posts/${postId}/like`,
                {},
                { withCredentials: true }
            );
            setPosts(posts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        likes: res.data.message === "Post liked" ? post.likes + 1 : post.likes - 1
                    }
                    : post
                ));
        } catch (error) {
            console.error("error adding like", error);
        }
    };


    return (
        <div className="Posts">
            <form onSubmit={handlePostUpload}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={post.title}
                        onChange={(e) =>
                            setPost({ ...post, title: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Content"
                        value={post.content}
                        onChange={(e) =>
                            setPost({ ...post, content: e.target.value })
                        }
                    />
                    <input
                        type="file"
                        onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
                    />
                    <button type="submit">Post</button>
                </form>
                <div className='posts'>
                    {posts.map(post => (
                        <div className='post'>
                            <p>{post.created_at}</p>
                            {authStatus === post.author.username && (
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                            )}
                            <Link to={`/users/${post.author.id}`}>
                                <img width='64px' src={`http://localhost:5000/static/uploads/${post.author.image}`} alt="" />
                                <b><p>{post.author.username}</p></b>
                            </Link>
                            <p>{post.title}</p>
                            <p>{post.content}</p>
                            {post.image && (
                                <img
                                    src={`http://localhost:5000/static/uploads/${post.image}`}
                                    alt="post"
                                    style={{ maxWidth: "500px" }}
                                />
                            )}

                            <div className="comments">
                                {post.comments.map(comment => (
                                    <p key={comment.id}>
                                        <img width="64px" src={`http://localhost:5000/static/uploads/${comment.user_pfp}`} alt="" />
                                        <Link to={`/users/${comment.user_id}`}><b>{comment.user}:</b> {comment.content}</Link>
                                        {authStatus === comment.user && (
                                            <button onClick={() => handleDeleteComment(comment.id, post.id)}>
                                                Delete
                                            </button>
                                        )}
                                    </p>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={commentsInput[post.id] || ''}
                                onChange={(e) =>
                                    setCommentsInput({
                                        ...commentsInput,
                                        [post.id]: e.target.value
                                    })
                                }
                            />

                            <button onClick={() => handleAddComment(post.id)}>
                                Comment
                            </button>
                            <p>Likes: {post.likes}</p>
                            <button onClick={() => handleLike(post.id)}>Like</button>
                        </div>
                    ))}
                </div>
        </div>
    )
}