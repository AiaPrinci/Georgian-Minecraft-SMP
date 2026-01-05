import './style.css';
import { useState } from 'react';
import HeadingText from './HomeHeader.json';
import object from '../../../assets/images/MinecraftObject.svg';
import polygon from '../../../assets/svgs/polygon.svg';
import play from '../../../assets/svgs/play.svg';

export const HomeHeader = () => {
    const ip = "georgianchronicles.com";
    const [copyBtn, setCopyBtn] = useState("Copy IP");
    
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(ip);
            setCopyBtn("Copied");
            setTimeout(() => {setCopyBtn("Copy IP")}, 1000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const objectsLeftStyle = [
        {
            left: "20px",
            top: "250px",
            rotate: "calc(30deg)",
            width: "150px",
        },
        {
            left: "50px",
            top: "50px",
            rotate: "calc(120deg)",
            width: "125px",
        },
        {
            left: "150px",
            top: "190px",
            rotate: "calc(90deg)",
            width: "100px"
        },
        {
            left: "200px",
            top: "380px",
            rotate: "calc(90deg)",
            width: "100px",
        }
    ];

    const objectsRightStyle = [
        {
            right: "20px",
            top: "350px",
            rotate: "calc(30deg)",
            width: "150px",
        },
        {
            right: "50px",
            top: "50px",
            rotate: "calc(120deg)",
            width: "125px",
        },
        {
            right: "150px",
            top: "190px",
            rotate: "calc(90deg)",
            width: "100px"
        },
        {
            right: "200px",
            top: "380px",
            rotate: "calc(90deg)",
            width: "100px",
        }
    ];

    return (
        <div className='Home_Header'>
            {objectsLeftStyle.map(objectItem => (
                <img style={{left: `${objectItem.left}`, top: `${objectItem.top}`, rotate: `${objectItem.rotate}`, width: `${objectItem.width}`}} className='object' src={object} alt='object' />
            ))}
            {objectsRightStyle.map(objectItem => (
                <img style={{right: `${objectItem.right}`, top: `${objectItem.top}`, rotate: `${objectItem.rotate}`, width: `${objectItem.width}`}} className='object' src={object} alt='object' />
            ))}
            <div className='Home_Header_inner'>
                <div className='home_header'>
                    <div className='home_header_text_container'>
                        <p className='heading_header'>{HeadingText.headingHeader}</p>
                        <h1 className='heading'>{HeadingText.heading}</h1>
                        <p className='heading_description'>{HeadingText.headingDescription}</p>
                        <p className='heading_description_res'>{HeadingText.headingResDescription}</p>
                    </div>
                    <div className='server_ip_container'>
                        <p className='server_ip'>{ip}</p>
                        <div className='home_header_server_join_btn' onClick={copy}>
                            {copyBtn}
                        </div>
                    </div>
                </div>
                <div className='video_container'>
                    <img className='video_polygon' src={polygon} alt="polygon" />
                    <img className='play_btn' src={play} alt="play_btn" />
                </div>
            </div>
        </div>
    );
};