import React from 'react';
import BottomNav from '../components/bottom_nav';
import {TopNavExplore} from '../components/top_nav';
import { useSelector } from 'react-redux'
import * as ExploreSelector from '../redux/selectors/page/explore_selector'
import UserListItem from '../components/user_list_item';
import { useHistory } from "react-router-dom";

export default function Explore() {
    const selectedUsers = useSelector(ExploreSelector.discoveredUsers())
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
