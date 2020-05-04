import React from 'react';
import { Link } from "react-router-dom";
import SVGIcon from '../../components/svg_icon';

export default function Feed() {

    function chat() {
        alert("Direct messaging, coming soon!")
    }

    return (
        <div className='top-nav'>
            <Link to="/create-image" className="top-nav__icon" >
                <SVGIcon iconName='svg-camera-icon' />
            </Link>

            <div className='top-nav__logo'></div>

            <button className='top-nav__icon' onClick={chat}>
                <SVGIcon iconName='svg-chat-icon' />
            </button>
        </div>
    );
}