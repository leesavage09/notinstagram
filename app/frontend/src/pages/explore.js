import React from 'react';
import BottomNav from '../components/bottom_nav';
import TopNav from '../components/top_nav/top_nav_explore';
import { useSelector, useDispatch } from 'react-redux'
import * as ExploreSelector from '../redux/selectors/component/explore_selector'
import ProfileItem from '../components/profile_Item';

export default function Explore() {
    const selectedProfiles = useSelector(ExploreSelector.discoveredProfiles())

    const profileItemElements = []
    selectedProfiles.forEach(profile => {
        profileItemElements.push(
            <ProfileItem
                key={profile.id}
                profile={profile}
                onClick={() => { console.log("show profile",profile.id) }}
            />)
    });

    return (
        <div>
            <TopNav />
            <ul className="explore-items">
                {profileItemElements}
            </ul>
            <BottomNav />
        </div>
    );
}
