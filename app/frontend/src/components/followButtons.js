import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { followersActions, followersSelector } from '../redux/slice/followers_slice';
import { sessionSelector } from '../redux/slice/session_slice';

export function TextFollowButton(props) {
    const dispatch = useDispatch()
    const userLoading = useSelector(followersSelector.loadingUser())[props.user_id]
    const hashtagLoading = useSelector(followersSelector.loadingHashtag())[props.hashtag_id]
    const loggedInUser = useSelector(sessionSelector.loggedInUser())
    if (loggedInUser.id === props.user_id) {
        return (<div />)
    }
    else if (props.user_id && loggedInUser.followed_user_ids.includes(props.user_id)) {
        return (//unfollow button
            <button
                className={props.className + " ghost-button"}
                disabled={userLoading}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(followersActions.unfollowUser(props.user_id))
                }}>
                Following
        </button>
        )
    }
    else if (props.user_id) {
        return (//follow button
            <button
                className={props.className + " blue-button"}
                disabled={userLoading}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(followersActions.followUser(props.user_id))
                }}>
                Follow
        </button>
        )
    }
    else if (props.hashtag_id && loggedInUser.followed_hashtag_ids.includes(props.hashtag_id)) {
        return (//unfollow button
            <button
                className={props.className + " ghost-button"}
                disabled={hashtagLoading}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(followersActions.unfollowHashtag(props.hashtag_id))
                }}>
                Following
        </button>
        )
    }
    else {
        return (//follow button
            <button
                className={props.className + " blue-button"}
                disabled={hashtagLoading}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(followersActions.followHashtag(props.hashtag_id))
                }}>
                Follow
        </button>
        )
    }
}

export function IconFollowButton(props) {
    const dispatch = useDispatch()
    const loading = useSelector(followersSelector.loadingUser())[props.user_id]
    const loggedInUser = useSelector(sessionSelector.loggedInUser())
    if (loggedInUser.id === props.user_id) {
        return (<div />)
    }
    else if (loggedInUser.followed_user_ids.includes(props.user_id)) {
        return (//unfollow button
            <button
                className='ghost-button'
                disabled={loading}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(followersActions.unfollowUser(props.user_id))
                }} >
                <div className="follow-user" />
            </button>
        )
    }
    else {
        return (//follow button
            <button
                className='blue-button'
                style={{ width: "200px" }}
                disabled={loading}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(followersActions.followUser(props.user_id))
                }}>
                Follow
            </button>
        )
    }
}