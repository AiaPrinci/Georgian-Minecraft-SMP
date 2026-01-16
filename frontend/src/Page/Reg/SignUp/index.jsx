import './style.css';
import logo from '@/assets/images/logoBGnone.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [regData, setRegData] = useState({
        email: '',
        username: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/register', regData);

            console.log(response.data);
            alert('Registration successful!');
            alert('please login to continue');
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
                <p className='signup_heading'>Georgian <img className='signup_logo'  src={logo} alt="logo" /> Chronicles</p>
                <div className='signup_title_container'>
                    <p className='signup_title'>შექმენი შენი SMP-ის ანგარიში</p>
                    <p className='signup_email_label'>შეიყვანე შენი ნამდვილი მონაცემები</p>
                </div>
                <form className='reg_form' method='post' action='' onSubmit={handleSubmit}>
                    <input
                        className='reg_input'
                        placeholder='Username'
                        type="text"
                        required
                        value={regData.username}
                        onChange={(e) => setRegData({...regData, username: e.target.value})}
                    />
                    <input
                        className='reg_input'
                        placeholder='Email'
                        type="email"
                        required
                        value={regData.email}
                        onChange={(e) => setRegData({...regData, email: e.target.value})}
                    />
                    <input
                        className='reg_input'
                        placeholder='Password'
                        type="password"
                        required
                        value={regData.password}
                        onChange={(e) => setRegData({...regData, password: e.target.value})}
                    />
                    <button className='reg_btn'>Register</button>
                </form>
                <p className='signup_footer'>უკვე გაქვს ანგარიში? <Link to="/login"><span>Log In</span></Link></p>
            </div>
        </div>
    );
};

export default SignUp;