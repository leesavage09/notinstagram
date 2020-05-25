import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { loggedInUser } from '../redux/selectors/session_selector'
import * as user_selector from '../redux/selectors/normalized/users_selector'
import { Link } from 'react-router-dom';
import { showChangeAvatarModal } from '../redux/actions/ui_actions'
import BottomNav from '../components/bottom_nav'
import LoggedInTopNav from '../components/top_nav/top_nav_account'
import ViewTopNav from '../components/top_nav/top_nav_back_with_title'
import SVGIcon from '../components/svg_icon'
import UserAvatar, { LARGE_LOADING_SPINNER } from '../components/user_avatar';
import queryString from 'query-string';
import * as UserActions from '../redux/actions/pages/user_actions'

export default function User(props) {
  const dispatch = useDispatch()
  const queryStr = props.location.search
  const params = queryString.parse(queryStr)
  const sessionUser = useSelector(loggedInUser())
  const [lastGetURL, setLestGetURL] = useState()
  const Options = sessionUser.id == params.user_id ? <LoggedInUserOptions /> : <ViewUserOptions user_id={params.user_id} />

  useEffect(() => {
    if (lastGetURL !== props.location.search) {
      dispatch(UserActions.getUser(params.user_id, params.page))
      setLestGetURL(queryStr)
    }
  }, [props.location.search]);

  return (
    <div>
      {Options}

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

      <BottomNav />
    </div>
  );
}


function LoggedInUserOptions() {
  const dispatch = useDispatch()
  const user = useSelector(loggedInUser())
  return (
    <div>
      <LoggedInTopNav />
      <div className='user-details'>
        <UserAvatar
          className="user-details__image"
          spinnerStyle={LARGE_LOADING_SPINNER}
          user={user}
          onClick={() => { dispatch(showChangeAvatarModal(true)) }}
        />
        <div className='user-details__info'>
          <h2 className='user-details__username'>{user.username}</h2>

          <Link to='/account/edit'
            className='ghost-button user-details__action-button'>
            Edit Profile
    </Link>
        </div>
      </div>
      <p className='user-details__bio'>
        <span className='user-details__name'>{user.name}</span>
        {user.bio}
      </p>
    </div>
  )
}

function ViewUserOptions(props) {
  let user = useSelector(user_selector.getUser(props.user_id))
  if (!user) {
    return (<div></div>)
  } 
    return (
      <div>
        <ViewTopNav title={user.username} />
        <div className='user-details'>
          <UserAvatar
            className="user-details__image"
            user={user}
          />
          <div className='user-details__info--user'>
            <h2 className='user-details__username'>{user.username}</h2>
            <button className='ghost-button user-details__action-button'>
              <div className="follow-user" />
            </button>
          </div>
        </div >
        <p className='user-details__bio'>
          <span className='user-details__name'>{user.name}</span>
          {user.bio}
        </p>
      </div>
    )
}
