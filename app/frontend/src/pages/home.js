import React from 'react';
import { TopNavFeed } from '../components/top_nav'
import BottomNav from '../components/bottom_nav'

export default function Home() {

    return (
        <div className="home-feed">
            <TopNavFeed />
            <div className="home-feed__body">
                <h2 className="home-feed__title">Welcome to notinstagram</h2>
                <p>When you follow people, you'll see the photos and videos they post here.</p>
            </div>
            <BottomNav />
        </div>
    );
}
