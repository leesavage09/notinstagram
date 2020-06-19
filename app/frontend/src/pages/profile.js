import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { sessionSelector } from '../redux/slice/session_slice'
import { Link } from 'react-router-dom';
import { modalActions } from '../redux/slice/modal_slice'
import BottomNav from '../components/bottom_nav'
import { TopNavAccount } from '../components/top_nav'
import { TopNavBackWithTitle } from '../components/top_nav'
import UserAvatar, { LARGE_LOADING_SPINNER, HashtagAvatar } from '../components/user_avatar';
import queryString from 'query-string';
import { profileActions } from '../redux/slice/profile_slice'
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice'
import { normalizedHashtagsSelector } from '../redux/slice/normalized_hashtags_slice'
import ProfileActivity from '../components/profile-activity'
import { IconFollowButton, TextFollowButton } from '../components/followButtons';
import {PostGrid} from '../components/display_posts';

export default function Profile(props) {
  const dispatch = useDispatch()
  const query = queryString.parse(props.location.search)
  const user_id = query.user_id
  const hashtag_name = query.hashtag_name

  useEffect(() => {
    if (user_id) {
      dispatch(profileActions.fetchUserActivityDetails(user_id))
    }
    if (hashtag_name) {
      dispatch(profileActions.fetchHashtagActivityDetails(hashtag_name))
    }
  }, [props.location.search]);

  return (
    <div>
      <SelectedProfileType user_id={user_id} hashtag_name={hashtag_name} />
      <BottomNav />
    </div>
  );
}

function SelectedProfileType(props) {
  const loggedInUser = useSelector(sessionSelector.loggedInUser())
  if (props.hashtag_name != undefined) {
    return (<HastagProfile hashtag_name={props.hashtag_name} />)
  }
  else if (loggedInUser.id == props.user_id) {
    return <LoggedInProfile />
  }
  else {
    return <PublicProfile user_id={props.user_id} />
  }
}

function HastagProfile(props) {
  let hashtag = useSelector(normalizedHashtagsSelector.getHashtag("#" + props.hashtag_name))
  if (!hashtag) {
    return (<div></div>)
  }
  return (
    <div>
      <TopNavBackWithTitle title={hashtag.name} />
      <div className='profile-details'>
        <HashtagAvatar className="profile-details__image" hashtag={hashtag} />
        <div className='profile-details__info--user'>
          <p className='profile-details__hashtags-posts'><span className="profile-details__bold">{hashtag.number_posts}</span> posts</p>
          <TextFollowButton className="profile-details__block-button" hashtag_id={hashtag.id} />
        </div>
      </div >
      <PostGrid post_ids={hashtag.post_ids} />
    </div>
  )
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
            className='ghost-button profile-details__block-button'>
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
          <IconFollowButton user_id={user.id} />
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