import './style.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logoBGnone.png';

const Header = () => {

    const Registration = [
        {
            name: 'Sign Up',
            link: '/signup',
            id: 'signup',
        },
        {
            name: 'Log In',
            link: '/login',
            id: 'login'
        }
    ];

    return (
        <header>
            <div className='header'>
                <Link to='/'>
                    <p className='header_heading'>Georgian <img className='header_logo' src={logo} alt="" /> Chronicles</p>
                </Link>
                <div className='header_list_container'>
                    <div className='registration_container'>
                        {/* {Registration.map(item => (
                            <Link to={item.link}>
                                <p id={item.id} className='signup_item'>{item.name}</p>
                            </Link>
                        ))} */}
                        <Link to='/signup'>
                            <div className='signupbtn'>
                                <p>SignUp</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;