import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import {loggedInUser} from '../../redux/selectors/user_selectors'

export default function Account() {
    const user = useSelector(loggedInUser)

    function discoverPeople() {
        alert("Comming Soon")
    }

    return (
        <div className='top-nav'>
            <Link to="/options" className='top-nav__icon'>
                <svg className='top-nav__svg' viewBox="0 0 48 48">
                    <path className='svg-options-icon' />
                </svg>
            </Link>
            <h1>{user.username}</h1>
            <button className='top-nav__icon' onClick={discoverPeople}>
                <svg className='top-nav__svg' viewBox="0 0 48 48">
                    <path className='svg-plus-people-icon'/>
                </svg>
            </button>
        </div>
    );
}