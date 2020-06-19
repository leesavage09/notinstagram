import { TopNavFeed } from '../components/top_nav'
import BottomNav from '../components/bottom_nav'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { FeedSelector, FeedActions } from '../redux/slice/feed_slice';
import {PostFeed} from '../components/display_posts';

export default function Home() {
    const dispatch = useDispatch()
    const post_ids = useSelector(FeedSelector.post_ids())

    useEffect(() => {
        dispatch(FeedActions.getFeed({page:0}))
    }, []);

    const content = post_ids.length === 0 ? (
        <div className="home-feed__body">
            <h2 className="home-feed__title">Welcome to notinstagram</h2>
            <p>When you follow people, you'll see the photos and videos they post here.</p>
        </div>
    ) : (<PostFeed post_ids={post_ids} />)

    return (
        <div className="home-feed">
            <TopNavFeed />
            {content}
            <BottomNav />
        </div>
    );
}
