import React from 'react';
import { Link } from "react-router-dom";
import SVGIcon from '../../components/svg_icon';

export default function Options() {
    return (
        <div className='top-nav'>
            <Link to="/account" className='top-nav__icon'>
                <SVGIcon iconName='svg-close-icon' />
            </Link>
            <h1>Options</h1>
            <div className='top-nav__icon-spacer'></div>
        </div>
    );
}