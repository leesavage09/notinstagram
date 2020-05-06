import React from 'react';
import { Link } from "react-router-dom";
import SVGIcon from './svg_icon'

export default function MobileFooter() {
    const path = window.location.pathname
    return (
        <div className='mobile-footer'>

            <Link to="/" className="mobile-footer__button" >
                <SVGIcon iconName='svg-home-icon' selected={path === '/'} />
            </Link>

            <Link to="/explore" className="mobile-footer__button" >
                <SVGIcon iconName='svg-explore-icon' selected={path === '/explore'} />
            </Link>

            <Link to="/create-image" className="mobile-footer__button" >
                <SVGIcon iconName='svg-create-icon' />
            </Link>

            <Link to="/activity" className="mobile-footer__button" >
                <SVGIcon iconName='svg-activity-icon' selected={path === '/activity'} />
            </Link>

            <Link to="/account" className="mobile-footer__button" >
                <div className={path === '/account' ? 'mobile-footer__account-border' : ''}></div>
                <img className="mobile-footer__account-image" alt="leesavage09's profile picture" src="https://instagram.fltn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/94246361_561658168093273_8809993563602419712_n.jpg?_nc_ht=instagram.fltn2-1.fna.fbcdn.net&amp;_nc_ohc=jyjQkwhQAnUAX_LL1eY&amp;oh=708be17a299ed16157d1d4787986aacf&amp;oe=5ED3EA64"></img>
            </Link>

        </div >
    );
}