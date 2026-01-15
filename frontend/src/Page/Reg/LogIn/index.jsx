import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import logo from '@/assets/images/logoBGnone.png';
import { Link } from 'react-router-dom';

const LogIn = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', loginData);
            alert('Login successful!');
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
        <>
            <div className='SignUp'>
            <div className='SignUp_container'>
                <p className='signup_heading'>Georgian <img className='signup_logo'  src={logo} alt="logo" /> Chronicles</p>
                <div className='signup_title_container'>
                    <p className='signup_title'>შეიყვანე შენი ანგარიშის მონაცემები</p>
                    <p className='signup_email_label'>შეიყვანე შენი ნამდვილი მონაცემები</p>
                </div>
                <form className='reg_form' method='post' action='' onSubmit={handleSubmit}>
                    <input
                        className='reg_input'
                        placeholder='Email'
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    />
                    <input
                        className='reg_input'
                        placeholder='Password'
                        type="password"
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    />
                    <button className='reg_btn'>Next</button>
                </form>
                <p className='signup_footer'>არ გაქვს ანგარიში? <Link to="/signup"><span>Sign Up</span></Link></p>
            </div>
        </div>
        </>
    )
}

export default LogIn;