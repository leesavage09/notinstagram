import React, { useEffect } from 'react';
import { TopNavBackWithTitle } from '../components/top_nav'
import BottomNav from '../components/bottom_nav'
import { normalizedPostsSelector } from '../redux/slice/normalized_posts_slice';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux'
import Post from '../components/post';
import { PostActions } from '../redux/slice/post_slice';

export default function PostPage(props) {
    const dispatch = useDispatch()
    const query = queryString.parse(props.location.search)
    const post = useSelector(normalizedPostsSelector.getPost(query.id))

    useEffect(() => {
        dispatch(PostActions.showPost({ id: query.id }))
    }, [query.id]);

    if (!post) {
        return (<div />)
    }

    return (
        <div>
            <TopNavBackWithTitle title="Photo" />
            <Post key={post.id} post={post} />
            <BottomNav />
        </div>
    );
}
