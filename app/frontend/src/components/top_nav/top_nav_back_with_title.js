import React from 'react';
import { useHistory } from "react-router-dom";
import SVGIcon from '../svg_icon';

export default function CreatePost(props) {
    let history = useHistory();
    let rotate = {
        transform: 'rotate(270deg)',
    }
    return (
        <div className='top-nav'>
            <button onClick={history.goBack} className='text-button top-nav__icon' style={rotate} >
                <SVGIcon iconName='svg-back-icon' />
            </button>
            <h1>{props.title}</h1>
            <div className='top-nav__icon-spacer'></div>
        </div>
    );
}