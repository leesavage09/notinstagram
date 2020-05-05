import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { loggedInUser } from '../../redux/selectors/user_selectors'
import SVGIcon from '../../components/svg_icon';

export default function Account() {
    const user = useSelector(loggedInUser)

    function discoverPeople() {
        alert("Comming Soon")
    }

    return (
        <div className='top-nav'>
            <Link to="/options" className='top-nav__icon'>
                <SVGIcon iconName='svg-options-icon' />
            </Link>
            <h1>{user.username}</h1>
            <button className='text-button top-nav__icon' onClick={discoverPeople}>
                <SVGIcon iconName='svg-plus-people-icon' />
            </button>
        </div>
    );
}