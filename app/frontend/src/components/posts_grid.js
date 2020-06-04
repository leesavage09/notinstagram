import { useSelector } from 'react-redux'
import React from 'react';
import { normalizedPostsSelector } from '../redux/slice/normalized_posts_slice'
import { NoPosts } from './no-content-placeholders';

export default function PostGrid(props) {
    const postImages = []
    if (props.user.post_ids) {
        const posts = useSelector(normalizedPostsSelector.getPosts(props.user.post_ids))
        posts.forEach((post) => {
            postImages.push(<img className="post-grid__img" key={post.id} src={post.image_url} />)
        })
    }

    if (postImages.length<=0) {
        return <NoPosts/>
    }

    return (
        <div className="post-grid">
            {postImages}
        </div>
    )
}