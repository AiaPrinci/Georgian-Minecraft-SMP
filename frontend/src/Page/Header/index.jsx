import './style.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logoBGnone.png';

const Header = () => {

    const headerList = [
        {
            name: 'Home',
            link: '/',
        }
    ];

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
                <p className='header_heading'>Georgian <img className='header_logo' src={logo} alt="" /> Chronicles</p>
                <div className='header_list_container'>
                    <div className='header_list'>
                        {headerList.map(item => (
                            <Link to={item.link}>
                                <p className='header_item'>{item.name}</p>
                            </Link>
                        ))}
                    </div>
                    <div className='registration_container'>
                        {Registration.map(item => (
                            <Link to={item.link}>
                                <p id={item.id} className='signup_item'>{item.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;