import React from 'react';
import TopNav from '../components/top_nav/top_nav_options'
import BottomNav from '../components/mobile_footer'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/session_actions'

export default function Options() {
    const dispatch = useDispatch();
    function logoutClicked() {
        dispatch(logout())
    }

    return (
        <div className='options'>
            <TopNav />
            <div className='options__body'>
                <h3 className='options__title'>ACCOUNT</h3>
                <Link to='/accounts/edit' className='options__link'>
                    <div className='options__text'>Edit Profile</div>
                    <div className='right-chevron options__chevron'></div>
                </Link>

                <Link to='' className='options__link'>
                    <div className='options__text'>Change Password</div>
                    <div className='right-chevron options__chevron'></div>
                </Link>
            </div>

            <div className='options__body'>
                <h3 className='options__title'></h3>

                <a onClick={logoutClicked} className='options__link'>
                    <div className='options__text'>Log Out</div>
                    <div className='right-chevron options__chevron'></div>
                </a>
            </div>

            <BottomNav />
        </div>
    );
}
