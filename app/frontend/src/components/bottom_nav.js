import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import SVGIcon from './svg_icon'
import * as SessionSelector from '../redux/selectors/session_selector'
import { useSelector } from 'react-redux'
import ProfileImage from './profile_image';
import ImageSelectButton from './image_select_button';

export default function BottomNav() {
    const path = window.location.pathname
    const history = useHistory();
    const user = useSelector(state => SessionSelector.loggedInUser(state))

    return (
        <div className='mobile-footer'>

            <Link to="/" className="mobile-footer__button" >
                <SVGIcon iconName='svg-home-icon' selected={path === '/'} />
            </Link>

            <Link to="/explore" className="mobile-footer__button" >
                <SVGIcon iconName='svg-explore-icon' selected={path === '/explore'} />
            </Link>

            <ImageSelectButton
                className="mobile-footer__button"
                imageSelected={() => history.push("/create-post-image")}
            >
                <SVGIcon iconName='svg-create-icon' />
            </ImageSelectButton>

            <Link to="/activity" className="mobile-footer__button" >
                <SVGIcon iconName='svg-activity-icon' selected={path === '/activity'} />
            </Link>

            <Link to="/account" className="mobile-footer__button" >
                <div className={path === '/account' ? 'mobile-footer__account-border' : ''}></div>
                <ProfileImage
                    className="mobile-footer__account-image"
                    user={user}
                />
            </Link>

        </div >
    );
}