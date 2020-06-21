import React, { useEffect } from 'react';
import BottomNav from '../components/bottom_nav';
import { TopNavExplore } from '../components/top_nav';
import { useSelector, useDispatch } from 'react-redux'
import { exploreSelector, exploreActions } from '../redux/slice/explore_slice'
import { SimpleUserListItem } from '../components/user_list_item';
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice';
import { PostGrid } from '../components/display_posts';

export default function Explore() {
    const dispatch = useDispatch()
    const selected_user_ids = useSelector(exploreSelector.discoveredUsers())
    const selectedUsers = useSelector(normalizedUsersSelector.getUsers(selected_user_ids))
    const UserListItems = []
    const randomPost_ids = useSelector(exploreSelector.posts())

    useEffect(() => {
        dispatch(exploreActions.cancelSearch())
        if (randomPost_ids.length < 1) dispatch(exploreActions.getRandomPosts())
    }, []);

    if (selectedUsers.length > 0) {
        selectedUsers.forEach(user => {
            UserListItems.push(
                <SimpleUserListItem key={user.id} user={user} />)
        });
    }
    else {
        UserListItems.push(<PostGrid key="1" post_ids={randomPost_ids} />)
    }

    return (
        <div>
            <TopNavExplore />
            <ul className="explore-items">
                {UserListItems}
            </ul>
            <BottomNav />
        </div>
    );
}
