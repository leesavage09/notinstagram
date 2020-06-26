import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { HomeIcon, HomeIconSelected, ExploreIconSelected, ExploreIcon, CreateIcon, ActivityIconSelected, ActivityIcon } from './svg_icon'
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
                    {path === '/' ? <HomeIconSelected /> : <HomeIcon />}
                </Link>

                <Link to="/explore" className="bottom-nav__button" >
                    {path === '/explore' ? <ExploreIconSelected /> : <ExploreIcon />}
                </Link>

                <ImageSelectButton
                    className="bottom-nav__button"
                    imageSelected={() => history.push("/create-post-image")}
                >
                    <CreateIcon />
                </ImageSelectButton>

                <Link to="/activity" className="bottom-nav__button" >
                    {path === '/activity' ? <ActivityIconSelected /> : <ActivityIcon />}
                </Link>

                <Link to={`/profile?user_id=${user.id}`} className="bottom-nav__button" >
                    <div className={path === '/profile' ? 'bottom-nav__account-border' : ''}></div>
                    <UserAvatar
                        className="bottom-nav__account-image"
                        user={user}
                    />
                </Link>

            </div >
        </div>
    );
}