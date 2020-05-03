import React from 'react';
import { useHistory } from "react-router-dom";

export default function CreatePost() {
    let history = useHistory();
    let rotate = {
        transform: 'rotate(270deg)',
    }
    return (
        <div className='top-nav'>
            <button onClick={history.goBack} className='top-nav__icon' style={rotate} >
                <svg className='top-nav__svg' viewBox="0 0 48 48">
                    <path className='svg-back-icon' />
                </svg>
            </button>
            <h1>New Post</h1>
            <a className='top-nav__link' >Share</a>
        </div>
    );
}