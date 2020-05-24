import React from 'react';
import { useHistory } from "react-router-dom";
import SVGIcon from '../../components/svg_icon';

export default function Options() {
    const history = useHistory()
    return (
        <div className='top-nav'>
            <a onClick={history.goBack}  className='top-nav__icon'>
                <SVGIcon iconName='svg-close-icon' />
            </a>
            <h1>Options</h1>
            <div className='top-nav__icon-spacer'></div>
        </div>
    );
}