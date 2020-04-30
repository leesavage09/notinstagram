import React from 'react';

export default function MobileHeader() {

    return (
        <div className='mobile_footer'>
            <a className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className='home_selected' />
                </svg>
            </a>
            <a className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className="search"/>
                </svg>
            </a>
            <a className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className="create"/>
                </svg>
            </a>
            <a className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className="activity"/>
                </svg>
            </a>
            <a className="footer_btn" >
                {/* <div className="account_border"></div> */}
                <img className="account" alt="leesavage09's profile picture" src="https://instagram.fltn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/94246361_561658168093273_8809993563602419712_n.jpg?_nc_ht=instagram.fltn2-1.fna.fbcdn.net&amp;_nc_ohc=jyjQkwhQAnUAX_LL1eY&amp;oh=708be17a299ed16157d1d4787986aacf&amp;oe=5ED3EA64"></img>
            </a>
        </div >
    );
}