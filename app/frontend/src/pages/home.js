import { TopNavFeed } from '../components/top_nav'
import BottomNav from '../components/bottom_nav'
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from '../util/helpers'
import React, { useEffect, useState } from 'react';
import { FeedSelector, FeedActions } from '../redux/slice/feed_slice';
import { PostFeed } from '../components/display_posts';

export default function Home(props) {
    const dispatch = useDispatch()
    const post_ids = useSelector(FeedSelector.post_ids())
    const loading = useSelector(FeedSelector.loading())
    const no_more_posts = useSelector(FeedSelector.no_more_posts())
    const [page, setpage] = useState(1);

    const loadMore = () => {
        // if 70% of the way down the page
        if (!loading && document.documentElement.scrollTop > document.documentElement.offsetHeight * 0.50
        ) {
            dispatch(FeedActions.getFeed({ page: page }))
            setpage(page + 1)
        }
    }

    window.onscroll = no_more_posts ? null : debounce(loadMore, 50)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [props.location]);

    useEffect(() => {
        dispatch(FeedActions.getFeed({ page: 0 }))
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
