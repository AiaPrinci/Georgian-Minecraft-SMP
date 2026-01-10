import './style.css';
import logo from '../../assets/images/logoBGnone.png';

const Footer = () => {
    return (
        <footer>
            <div className='Footer'>
                <p className='footer_heading'>Georgian <img className='footer_logo' src={logo} alt="" /> Chronicles</p>
            </div>
        </footer>
    )
};

export default Footer;