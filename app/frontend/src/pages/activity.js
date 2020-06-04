import React from 'react';
import { TopNavActivity } from '../components/top_nav'
import BottomNav from '../components/bottom_nav'
import { NoNotifications } from '../components/no-content-placeholders';

export default function Activity() {
    return (
        <div className="activity-page">
            <TopNavActivity />
            <NoNotifications/>
            <BottomNav />
        </div>
    );
}
