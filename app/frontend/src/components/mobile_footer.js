import React from 'react';
import { Link } from "react-router-dom";
import SVGIcon from './svg_icon'
import * as SessionSelector from '../redux/selectors/session_selector'
import { useSelector } from 'react-redux'

export default function MobileFooter() {
    const path = window.location.pathname
    const user = useSelector(state => SessionSelector.loggedInUser(state))
    return (
        <div className='mobile-footer'>

            <Link to="/" className="mobile-footer__button" >
                <SVGIcon iconName='svg-home-icon' selected={path === '/'} />
            </Link>

            <Link to="/explore" className="mobile-footer__button" >
                <SVGIcon iconName='svg-explore-icon' selected={path === '/explore'} />
            </Link>

            <Link to="/create-post-image" className="mobile-footer__button" >
                <SVGIcon iconName='svg-create-icon' />
            </Link>

            <Link to="/activity" className="mobile-footer__button" >
                <SVGIcon iconName='svg-activity-icon' selected={path === '/activity'} />
            </Link>

            <Link to="/account" className="mobile-footer__button" >
                <div className={path === '/account' ? 'mobile-footer__account-border' : ''}></div>
                <img className="mobile-footer__account-image" alt="leesavage09's profile picture" src={user.image_url}></img>
            </Link>

        </div >
    );
}