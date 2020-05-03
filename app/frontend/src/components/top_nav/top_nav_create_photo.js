import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function CreatePhoto() {
    let history = useHistory();
    return (
        <div className='top-nav'>
            <button onClick={history.goBack} className='top-nav__icon'>
                <svg className='top-nav__svg' viewBox="0 0 48 48">
                    <path className='svg-close-icon' />
                </svg>
            </button>
            <h1>New Photo Post</h1>
            <Link className='top-nav__link' to='/create-post'>Next</Link>
        </div>
    );
}