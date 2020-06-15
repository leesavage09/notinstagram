import { useSelector } from 'react-redux'
import React from 'react';
import { normalizedPostsSelector } from '../redux/slice/normalized_posts_slice'
import { NoPosts } from './no-content-placeholders';
import Post from './post';

export default function PostFeed(props) {
    const postImages = []
    if (props.user.post_ids) {
        const posts = useSelector(normalizedPostsSelector.getPosts(props.user.post_ids))
        posts.forEach((post) => {
            postImages.push(<Post key={post.id} post={post} />)
        })
    }

    if (postImages.length <= 0) {
        return <NoPosts />
    }

    return (
        <div className="post-feed">
            {postImages}
        </div>
    )
}