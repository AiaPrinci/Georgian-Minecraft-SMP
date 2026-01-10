import './style.css';
import { HomeHeader } from './HomeHeader';
import { HowLSWorks } from './description';

const Home = () => {
    return (
        <div className='Home'>
            <HomeHeader />
            <HowLSWorks />
        </div>
    )
};

export default Home;