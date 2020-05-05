import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SVGIcon from '../../components/svg_icon';

export default function CreatePhoto() {
    let history = useHistory();
    return (
        <div className='top-nav'>
            <button onClick={history.goBack} className='text-button top-nav__icon'>
                <SVGIcon iconName='svg-close-icon' />
            </button>
            <h1>New Photo Post</h1>
            <Link to='/create-post'>Next</Link>
        </div>
    );
}