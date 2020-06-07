import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import SVGIcon from './svg_icon'
import { sessionSelector } from '../redux/slice/session_slice'

import { useSelector } from 'react-redux'
import UserAvatar from './user_avatar';
import ImageSelectButton from './image_select_button';

export default function BottomNav() {
    const path = window.location.pathname
    const history = useHistory();
    const user = useSelector(sessionSelector.loggedInUser())

    return (
        <div className='bottom-nav'>
            <div className='bottom-nav__container'>

                <Link to="/" className="bottom-nav__button" >
                    <SVGIcon iconName='svg-home-icon' selected={path === '/'} />
                </Link>

                <Link to="/explore" className="bottom-nav__button" >
                    <SVGIcon iconName='svg-explore-icon' selected={path === '/explore'} />
                </Link>

                <ImageSelectButton
                    className="bottom-nav__button"
                    imageSelected={() => history.push("/create-post-image")}
                >
                    <SVGIcon iconName='svg-create-icon' />
                </ImageSelectButton>

                <Link to="/activity" className="bottom-nav__button" >
                    <SVGIcon iconName='svg-activity-icon' selected={path === '/activity'} />
                </Link>

                <Link to={`/profile?user_id=${user.id}`} className="bottom-nav__button" >
                    <div className={path === '/account' ? 'bottom-nav__account-border' : ''}></div>
                    <UserAvatar
                        className="bottom-nav__account-image"
                        user={user}
                    />
                </Link>

            </div >
        </div>
    );
}