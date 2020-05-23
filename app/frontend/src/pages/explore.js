import React from 'react';
import BottomNav from '../components/bottom_nav';
import TopNav from '../components/top_nav/top_nav_explore';
import { useSelector, useDispatch } from 'react-redux'
import * as ExploreSelector from '../redux/selectors/page/explore_selector'
import UserListItem from '../components/user_list_item';
import { useHistory } from "react-router-dom";
import * as UserActions from '../redux/actions/pages/user_actions'

export default function Explore() {
    const selectedUsers = useSelector(ExploreSelector.discoveredUsers())
    const history = useHistory()
    const dispatch = useDispatch()

    const UserListItems = []
    selectedUsers.forEach(user => {
        UserListItems.push(
            <UserListItem
                key={user.id}
                user={user}
                onClick={() => { 
                    dispatch(UserActions.getUser(user.id,0))
                    history.push("user")
                }}
            />)
    });

    return (
        <div>
            <TopNav />
            <ul className="explore-items">
                {UserListItems}
            </ul>
            <BottomNav />
        </div>
    );
}
