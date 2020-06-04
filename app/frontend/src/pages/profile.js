import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { sessionSelector } from '../redux/slice/session_slice'
import { Link } from 'react-router-dom';
import { modalActions } from '../redux/slice/modal_slice'
import BottomNav from '../components/bottom_nav'
import { TopNavAccount } from '../components/top_nav'
import { TopNavBackWithTitle } from '../components/top_nav'
import UserAvatar, { LARGE_LOADING_SPINNER } from '../components/user_avatar';
import queryString from 'query-string';
import { profileActions } from '../redux/slice/profile_slice'
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice'
import ProfileActivity from '../components/profile-activity'

export default function Profile(props) {
  const [lastGetURL, setLestGetURL] = useState()
  const dispatch = useDispatch()
  const queryStr = props.location.search
  const user_id = queryString.parse(queryStr).user_id
  const sessionUser = useSelector(sessionSelector.loggedInUser())
  const Options = sessionUser.id == user_id ? <LoggedInProfile /> : <PublicProfile user_id={user_id} />

  useEffect(() => {
    if (lastGetURL !== queryStr) {
      dispatch(profileActions.fetchDetails(user_id))
      setLestGetURL(queryStr)
    }
  }, [props.location.search]);

  return (
    <div>
      {Options}
      <BottomNav />
    </div>
  );
}

function LoggedInProfile() {
  const dispatch = useDispatch()
  const user = useSelector(sessionSelector.loggedInUser())
  return (
    <div>
      <TopNavAccount />
      <div className='profile-details'>
        <UserAvatar
          className="profile-details__image"
          spinnerStyle={LARGE_LOADING_SPINNER}
          user={user}
          onClick={() => { dispatch(modalActions.showChangeAvatarModal(true)) }}
        />
        <div className='profile-details__info'>
          <h2 className='profile-details__username'>{user.username}</h2>

          <Link to='/account/edit'
            className='ghost-button profile-details__action-button'>
            Edit Profile
    </Link>
        </div>
      </div>
      <p className='profile-details__bio'>
        <span className='profile-details__name'>{user.name}</span>
        {user.bio}
      </p>

      <ProfileActivity user={user} />
    </div>
  )
}

function PublicProfile(props) {
  let user = useSelector(normalizedUsersSelector.getUser(props.user_id))
  if (!user) {
    return (<div></div>)
  }
  return (
    <div>
      <TopNavBackWithTitle title={user.username} />
      <div className='profile-details'>
        <UserAvatar
          className="profile-details__image"
          user={user}
        />
        <div className='profile-details__info--user'>
          <h2 className='profile-details__username'>{user.username}</h2>
          <button className='ghost-button profile-details__action-button'>
            <div className="follow-user" />
          </button>
        </div>
      </div >
      <p className='profile-details__bio'>
        <span className='profile-details__name'>{user.name}</span>
        {user.bio}
      </p>


      <ProfileActivity user={user} />
    </div>
  )
}