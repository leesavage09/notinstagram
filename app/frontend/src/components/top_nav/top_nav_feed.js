import React from 'react';
import { Link } from "react-router-dom";

export default function Feed() {

    function chat() {
        alert("Direct messaging, coming soon!")
    }

    return (
        <div className='top-nav'>
            <Link to="/create-image" className="top-nav__icon" >
                <svg className='top-nav__svg' viewBox="0 0 48 48">
                    <path className='svg-camera-icon' />
                </svg>
            </Link>

            <div className='top-nav__logo'></div>

            <button className='top-nav__icon' onClick={chat}>
                <svg className='top-nav__svg' viewBox="0 0 48 48">
                    <path className='svg-chat-icon' />
                </svg>
            </button>
        </div>
    );
}