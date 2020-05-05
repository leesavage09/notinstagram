import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { logout } from '../redux/actions/session_actions'
import { loggedInUser } from '../redux/selectors/user_selectors'
import { Link } from 'react-router-dom';
import BottomNav from '../components/mobile_footer'
import TopNav from '../components/top_nav/top_nav_account'
import SVGIcon from '../components/svg_icon'

export default function Account() {
  const user = useSelector(loggedInUser)
  const dispatch = useDispatch();

  function logoutClicked() {
    dispatch(logout())
  }
  return (
    <div>
      <TopNav />
      <div className='account-details'>
        <img className="account-details__image" alt="leesavage09's profile picture" src="https://instagram.fltn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/94246361_561658168093273_8809993563602419712_n.jpg?_nc_ht=instagram.fltn2-1.fna.fbcdn.net&amp;_nc_ohc=jyjQkwhQAnUAX_LL1eY&amp;oh=708be17a299ed16157d1d4787986aacf&amp;oe=5ED3EA64"></img>
        <div className='account-details__info'>
          <h2 className='account-details__username'>{user.username}</h2>
          <Link to='/accounts/edit' className='ghost-button account-details__action-button'>Edit Profile</Link>
        </div>
      </div>
      <p className='account-details__name'>{user.name}</p>

      <ul className='account-activity'>
        <li className='account-activity__item'>
          <span className='account-activity__count'>
            5
          </span>
          posts
        </li>
        <li className='account-activity__item'>
          <span className='account-activity__count'>
            25
          </span>
          followers
        </li>
        <li className='account-activity__item'>
          <span className='account-activity__count'>
            15
          </span>
          following
        </li>
      </ul>

      <div className='account-icons'>
        <a href="#" className='account-icons__icon'>
          <SVGIcon className='account-icons__svg account-icons__svg--selected' iconName='svg-posts-grid' />
        </a>
        <a href="#" className='account-icons__icon'>
          <div className='feed-logo--dark-grey account-icons__sprite' />
        </a>
        <a href="#" className='account-icons__icon'>
          <SVGIcon className='account-icons__svg' iconName='svg-posts-bookmarked' />
        </a>
        <a href="#" className='account-icons__icon'>
          <SVGIcon className='account-icons__svg' iconName='svg-posts-tagged' />
        </a>
      </div>

      <p><a href='#' onClick={logoutClicked}>Log out</a></p>
      <BottomNav />
    </div>
  );
}
