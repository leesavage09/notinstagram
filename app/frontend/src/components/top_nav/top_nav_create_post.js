import React from 'react';
import { useHistory } from "react-router-dom";
import SVGIcon from '../../components/svg_icon';

export default function CreatePost() {
    let history = useHistory();
    let rotate = {
        transform: 'rotate(270deg)',
    }
    return (
        <div className='top-nav'>
            <button onClick={history.goBack} className='text-button top-nav__icon' style={rotate} >
                <SVGIcon iconName='svg-back-icon' />
            </button>
            <h1>New Post</h1>
            <a className='top-nav__link' >Share</a>
        </div>
    );
}