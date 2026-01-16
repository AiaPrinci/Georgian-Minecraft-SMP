import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Social = () => {
    const [authStatus, setAuthStatus] = useState(null);
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        content: '',
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

        try {
            const res = await axios.post(
                'http://localhost:5000/posts',
                post,
                { withCredentials: true }
            );

            console.log(res.data);
            alert("Post uploaded!");

            setPost({ title: '', content: '' });
        } catch (error) {
            console.error("Error uploading post:", error);
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

    return (
        <div className="Social">
            <div className="Social_about"></div>

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
                    <button type="submit">Post</button>
                </form>
                <div className='posts'>
                    {posts.map(post => (
                        <div className='post'>
                            <p>{post.author.username}</p>
                            <p>{post.title}</p>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="Social_profile">
                <p>{authStatus}</p>
            </div>
        </div>
    );
};

export default Social;