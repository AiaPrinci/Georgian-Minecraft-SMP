import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Posts } from './Posts';
import { Link } from 'react-router-dom';

const Social = () => {
    const [authStatus, setAuthStatus] = useState({});
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

                setAuthStatus(res.data.user);
            } catch (error) {
                console.error('Error fetching auth status:', error);
            }
        };

        fetchAuthStatus();
    }, [navigate]);



    return (
        <div className="Social">
            <div className="Social_about"></div>

            <Posts />

            <div className="Social_profile">
                <Link to={`/users/${authStatus.id}`}>
                    <img src={`http://localhost:5000/static/uploads/${authStatus.profile_image}`} width="64px"  alt="" />
                    <p>{authStatus.username}</p>
                </Link>
            </div>
        </div>
    );
};

export default Social;