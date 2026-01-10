import './style.css';
import slogans from './Slogans.json';

export const Slogan = () => {
    return (
        <main>
            <div className='slider'>
                <div className='list'>
                    {slogans.map((slogan, index) => (
                        <p key={index} id={slogan.id} className='item'>{slogan.slogan}</p>
                    ))}
                </div>
            </div>
        </main>
    );
};