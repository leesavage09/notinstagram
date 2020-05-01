import React from 'react';
import { Link } from "react-router-dom";

export default function MobileHeader() {
    const path = window.location.pathname

    return (
        <div className='mobile_footer'>
            <Link to="/" className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className={path === '/' ? 'home_selected' : 'home'} />
                </svg>
            </Link>
            <Link to="/explore" className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className={path === '/explore' ? 'explore_selected' : 'explore'} />
                </svg>
            </Link>
            <Link to="/create-image" className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className='create' />
                </svg>
            </Link>
            <Link to="/activity" className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className={path === '/activity' ? 'activity_selected' : 'activity'} />
                </svg>
            </Link>
            <Link to="/account" className="footer_btn" >
                <div className={path === '/account' ? 'account_border' : ''}></div>
                <img className="account" alt="leesavage09's profile picture" src="https://instagram.fltn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/94246361_561658168093273_8809993563602419712_n.jpg?_nc_ht=instagram.fltn2-1.fna.fbcdn.net&amp;_nc_ohc=jyjQkwhQAnUAX_LL1eY&amp;oh=708be17a299ed16157d1d4787986aacf&amp;oe=5ED3EA64"></img>
            </Link>
        </div >
    );
}