import './style.css';
import logo from '@/assets/images/logoBGnone.png';

const SignUp = () => {
    return (
        <div className='SignUp'>
            <div className='SignUp_container'>
                <p className='signup_heading'>Georgian <img className='signup_logo'  src={logo} alt="logo" /> Chronicles</p>
                <div className='signup_title_container'>
                    <p className='signup_title'>შექმენი შენი SMP-ის ანგარიში</p>
                    <p className='signup_email_label'>შეიყვანე შენი ელფოსტა</p>
                </div>
                <input className='reg_input' placeholder='Email' type="Email" />
                <div className='reg_btn'>Next</div>
                <p className='signup_footer'>უკვე გაქვს ანგარიში? <span>Log In</span></p>
            </div>
        </div>
    );
};

export default SignUp;