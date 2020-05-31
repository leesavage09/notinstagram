import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { sessionSelector } from '../redux/slice/session_slice'
import { Link } from 'react-router-dom';
import { modalActions } from '../redux/slice/modal_slice'
import BottomNav from '../components/bottom_nav'
import { TopNavAccount } from '../components/top_nav'
import { TopNavBackWithTitle } from '../components/top_nav'
import SVGIcon from '../components/svg_icon'
import UserAvatar, { LARGE_LOADING_SPINNER } from '../components/user_avatar';
import queryString from 'query-string';
import { profileActions } from '../redux/slice/profile_slice'
import PostGrid from '../components/posts_grid';
import PostFeed from '../components/posts_feed';
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice'

export default function Profile(props) {
  const dispatch = useDispatch()
  const queryStr = props.location.search
  const params = queryString.parse(queryStr)
  const sessionUser = useSelector(sessionSelector.loggedInUser())
  const [lastGetURL, setLestGetURL] = useState()
  const Options = sessionUser.id == params.user_id ? <LoggedInProfile /> : <PublicProfile user_id={params.user_id} />

  useEffect(() => {
    if (lastGetURL !== props.location.search) {
      dispatch(profileActions.fetchDetails(params.user_id))
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

function ProfileActivity(props) {
  const [feedTypeFull, setFeedTypeFull] = useState(false);

  const POST_GRID_BUTTON_STYLE = "account-icons__svg account-icons__svg"
  const POST_GRID_BUTTON_STYLE_SELECTED = "account-icons__svg account-icons__svg--selected"

  const POST_FEED_BUTTON_STYLE = "feed-logo--dark-grey account-icons__sprite"
  const POST_FEED_BUTTON_STYLE_SELECTED = "feed-logo--blue account-icons__sprite"

  return (
    <div>
      <ul className='account-activity'>
        <li className='account-activity__item'>
          <span className='account-activity__count'>
            {props.user.number_posts}
          </span>
          posts
        </li>
        <li className='account-activity__item'>
          <span className='account-activity__count'>
            {props.user.number_followers}
          </span>
          followers
        </li>
        <li className='account-activity__item'>
          <span className='account-activity__count'>
            {props.user.number_following}
          </span>
          following
        </li>
      </ul>

      <div className='account-icons'>
        <a onClick={() => setFeedTypeFull(false)} className='account-icons__icon'>
          <SVGIcon className={feedTypeFull ? POST_GRID_BUTTON_STYLE : POST_GRID_BUTTON_STYLE_SELECTED} iconName='svg-post-grid-icon' />
        </a>
        <a onClick={() => setFeedTypeFull(true)} className='account-icons__icon'>
          <div className={feedTypeFull ? POST_FEED_BUTTON_STYLE_SELECTED : POST_FEED_BUTTON_STYLE} />
        </a>
        <a href="#" className='account-icons__icon'>
          <SVGIcon className='account-icons__svg' iconName='svg-bookmark-icon' />
        </a>
        <a href="#" className='account-icons__icon'>
          <SVGIcon className='account-icons__svg' iconName='svg-tagged-icon' />
        </a>
      </div>

      <div>
        {feedTypeFull ? <PostFeed user={props.user} /> : <PostGrid user={props.user} />}
      </div>

    </div>
  )
}

