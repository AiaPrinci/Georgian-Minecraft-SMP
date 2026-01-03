import './style.css';
import { Link } from 'react-router-dom';

const Header = () => {

    const headerList = [
        {
            name: 'Home',
            link: '/',
        }
    ];

    return (
        <header>
            <div className='header'>
                <p className='header_heading'>Georgian Chronicles</p>
                <div className='header_list'>
                    {headerList.map(item => (
                        <Link to={item.link}>
                            <p className='header_item'>{item.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
};

export default Header;