import './style.css';
import { HomeHeader } from './HomeHeader';
import { HowLSWorks } from './description';
import { Admins } from './admins';
import { AboutSocialMedia } from './aboutSocialMedia';

const Home = () => {
    return (
        <div className='Home'>
            <HomeHeader />
            <HowLSWorks />
            <AboutSocialMedia />
            <Admins />
        </div>
    )
};

export default Home;