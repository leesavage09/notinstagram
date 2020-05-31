import React from 'react';
import BottomNav from '../components/bottom_nav';
import { TopNavExplore } from '../components/top_nav';
import { useSelector } from 'react-redux'
import { exploreSelector } from '../redux/slice/explore_slice'
import UserListItem from '../components/user_list_item';
import { useHistory } from "react-router-dom";
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice';

export default function Explore() {
    const selected_user_ids = useSelector(exploreSelector.discoveredUsers())
    const selectedUsers = useSelector(normalizedUsersSelector.getUsers(selected_user_ids))
    const history = useHistory()

    const UserListItems = []
    selectedUsers.forEach(user => {
        UserListItems.push(
            <UserListItem
                key={user.id}
                user={user}
                onClick={() => {
                    history.push(`profile/?user_id=${user.id}&page=${0}`)
                }}
            />)
    });

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
