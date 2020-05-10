import React from 'react';
import { useHistory } from "react-router-dom";
import SVGIcon from '../../components/svg_icon';

export default function CreatePhoto(props) {
    let history = useHistory();
    return (
        <div className='top-nav'>
            <button onClick={history.goBack} className='text-button top-nav__icon'>
                <SVGIcon iconName='svg-close-icon' />
            </button>
            <h1>{props.title}</h1>
            <a className='top-nav__link' onClick={props.button_action}>
                {props.button_title}
            </a>
        </div>
    );
}