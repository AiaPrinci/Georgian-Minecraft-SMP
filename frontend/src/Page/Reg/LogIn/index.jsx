import React, { use, useState } from 'react';
import './style.css';
import axios from 'axios';
import logo from '@/assets/images/logoBGnone.png';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [authStatus, setAuthStatus] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/login', loginData, { withCredentials: true });

            const statusResponse = await axios.get('http://localhost:5000/auth-status', { withCredentials: true });

            setAuthStatus(statusResponse.data);
            console.log('Auth status:', statusResponse.data);
            if (statusResponse.data.logged_in) {
                navigate('/social');
                localStorage.setItem("userId", statusResponse.data.user.id);
            }

            if (statusResponse.data.logged_in) {
                alert(`Login successful! Welcome ${statusResponse.data.user.username}`);
            } else {
                alert('Login failed: session not stored.');
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.error);
            } else {
                console.log(error);
                alert('An error occurred.');
            }
        }
    };

    return (
        <div className='SignUp'>
            <div className='SignUp_container'>
                <p className='signup_heading'>
                    Georgian <img className='signup_logo' src={logo} alt="logo" /> Chronicles
                </p>
                <div className='signup_title_container'>
                    <p className='signup_title'>შეიყვანე შენი SMP-ის ანგარიში</p>
                    <p className='signup_email_label'>შეიყვანე შენი ნამდვილი მონაცემები</p>
                </div>
                <form className='reg_form' onSubmit={handleSubmit}>
                    <input
                        className='reg_input'
                        placeholder='Email'
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    />
                    <input
                        className='reg_input'
                        placeholder='Password'
                        type="password"
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                    <button className='reg_btn'>Login</button>
                </form>
                <p className='signup_footer'>
                    არ გაქვს ანგარიში? <Link to="/signup"><span>Sign Up</span></Link>
                </p>
            </div>
        </div>
    );
};

export default LogIn;