import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { logout } from '../redux/actions/session_actions'
import { loggedInUser } from '../redux/selectors/user_selectors'
import BottomNav from '../components/mobile_footer'
import TopNav from '../components/top_nav/top_nav_account'

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
        <div>
          <h2 className='account-details__username'>{user.username}</h2>
          <button className='account-details__edit-button'>Edit Proifle</button>
        </div>

      </div>

      <p><a href='#' onClick={logoutClicked}>Log out</a></p>
      <BottomNav />
    </div>
  );
}
