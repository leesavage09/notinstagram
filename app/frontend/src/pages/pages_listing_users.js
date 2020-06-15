import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import BottomNav from '../components/bottom_nav';
import { TopNavBackWithTitle } from '../components/top_nav';
import queryString from 'query-string';
import { FollowableUserListItem } from '../components/user_list_item';
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice';
import { followersActions, followersSelector } from '../redux/slice/followers_slice';
import { PostActions } from '../redux/slice/post_slice';
import { normalizedPostsSelector } from '../redux/slice/normalized_posts_slice';

export function Followers(props) {
    const user_id = queryString.parse(props.location.search).user_id
    return (<FollowsPage title="Followers" user_id={user_id} selector={followersSelector.followerIDs} action={followersActions.fetchFollowers} />)
}

export function Followings(props) {
    const user_id = queryString.parse(props.location.search).user_id
    return (<FollowsPage title="Following" user_id={user_id} selector={followersSelector.followingIDs} action={followersActions.fetchFollowings} />)
}

export function PostLikes(props) {
    const dispatch = useDispatch()
    const query = queryString.parse(props.location.search)
    const post = useSelector(normalizedPostsSelector.getPost(query.post_id))
    const liker_ids = post ? post.liker_ids : []
    const likers = useSelector(normalizedUsersSelector.getUsers(liker_ids))
    likers.sort((a, b) => a.id > b.id ? 1 : -1)

    useEffect(() => {
        dispatch(PostActions.showPost({ id: query.post_id }))
    }, [query.post_id]);

    return (
        <DisplayUsers users={likers} title="Likes" />
    )
}

function FollowsPage(props) {
    const dispatch = useDispatch()
    const followingIDs = useSelector(props.selector())
    const users = useSelector(normalizedUsersSelector.getUsers(followingIDs))

    useEffect(() => {
        dispatch(props.action(props.user_id))
    }, [props.user_id]);

    return (
        <DisplayUsers users={users} title={props.title} />
    );
}

function DisplayUsers(props) {
    const UserListItems = []
    props.users.forEach(user => {
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
    )
}