import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { followersActions, followersSelector } from '../redux/slice/followers_slice';
import { sessionSelector } from '../redux/slice/session_slice';

export function TextFollowButton(props) {
    const loggedInUser = useSelector(sessionSelector.loggedInUser())
    if (loggedInUser.followed_user_ids.includes(props.user_id)) {
        return <UnfollowButton
            className={props.className}
            user_id={props.user_id} />
    }
    else {
        return <FollowButton
            className={props.className}
            user_id={props.user_id} />
    }
}

export function IconFollowButton(props) {
    const loggedInUser = useSelector(sessionSelector.loggedInUser())
    if (loggedInUser.followed_user_ids.includes(props.user_id)) {
        return <UnfollowIconButton user_id={props.user_id} />
    }
    else {
        return <FollowIconButton user_id={props.user_id} />
    }
}

const FollowButton = (props) => {
    const dispatch = useDispatch()
    const loading = useSelector(followersSelector.loading())[props.user_id]
    return (
        <button
            className={props.className + " blue-button"}
            disabled={loading}
            onClick={(e) => {
                e.stopPropagation()
                dispatch(followersActions.follow(props.user_id))
            }}>
            Follow
        </button>
    )
}

const UnfollowButton = (props) => {
    const dispatch = useDispatch()
    const loading = useSelector(followersSelector.loading())[props.user_id]
    return (
        <button
            className={props.className + " ghost-button"}
            disabled={loading}
            onClick={(e) => {
                e.stopPropagation()
                dispatch(followersActions.unfollow(props.user_id))
            }}>
            Following
        </button>
    )
}

const FollowIconButton = (props) => {
    const dispatch = useDispatch()
    const loading = useSelector(followersSelector.loading())[props.user_id]
    return (<button
        className='blue-button'
        style={{width:"200px"}}
        disabled={loading}
        onClick={(e) => {
            e.stopPropagation()
            dispatch(followersActions.follow(props.user_id))
        }}>
        Follow
</button>)
}

const UnfollowIconButton = (props) => {
    const dispatch = useDispatch()
    const loading = useSelector(followersSelector.loading())[props.user_id]
    return (<button
        className='ghost-button'
        disabled={loading}
        onClick={(e) => {
            e.stopPropagation()
            dispatch(followersActions.unfollow(props.user_id))
        }} >
        <div className="follow-user" />
    </button>)
}