import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import BottomNav from '../components/bottom_nav';
import { TopNavBackWithTitle } from '../components/top_nav';
import queryString from 'query-string';
import UserListItem from '../components/user_list_item';
import { useHistory } from "react-router-dom";
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice';
import { followersActions, followersSelector } from '../redux/slice/followers_slice';
import { TextFollowButton } from '../components/followButtons';

export function Followers(props) {
    const user_id = queryString.parse(props.location.search).user_id
    return (<FollowsPage title="Followers" user_id={user_id} selector={followersSelector.followerIDs} action={followersActions.fetchFollowers} />)
}

export function Followings(props) {
    const user_id = queryString.parse(props.location.search).user_id
    return (<FollowsPage title="Following" user_id={user_id} selector={followersSelector.followingIDs} action={followersActions.fetchFollowings} />)
}

function FollowsPage(props) {
    const dispatch = useDispatch()
    const [lastUserID, setLastUserID] = useState()
    const followingIDs = useSelector(props.selector())
    const users = useSelector(normalizedUsersSelector.getUsers(followingIDs))
    const UserListItems = []

    useEffect(() => {
        if (lastUserID !== props.user_id) {
            dispatch(props.action(props.user_id))
            setLastUserID(props.user_id)
        }
    }, [props.user_id]);

    users.forEach(user => {
        UserListItems.push(<FollowableUserListItem key={user.id} user={user} />)
    });

    return (
        <div>
            <TopNavBackWithTitle title={props.title} />
            <ul className="follows-list">
                {UserListItems}
            </ul>
            <BottomNav />
        </div>
    );
}

function FollowableUserListItem(props) {
    const history = useHistory();

    return (
        <UserListItem
            key={props.user.id}
            user={props.user}
            onClick={() => {
                history.push(`profile/?user_id=${props.user.id}`)
            }}
        >
            <TextFollowButton
                className="follows-list__follow-button"
                user_id={props.user.id}
            />
        </UserListItem>
    )
}