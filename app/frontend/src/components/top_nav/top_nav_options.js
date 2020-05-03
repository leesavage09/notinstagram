import React from 'react';
import { Link } from "react-router-dom";

export default function Options() {
    return (
        <div className='top-nav'>
            <Link to="/account" className='top-nav__icon'>
                <svg className='top-nav__svg' viewBox="0 0 48 48">
                    <path className='svg-close-icon' />
                </svg>
            </Link>
            <h1>Options</h1>
            <div className='top-nav__icon-spacer'></div>
        </div>
    );
}