import { useSelector } from 'react-redux'
import React from 'react';
import { normalizedPostsSelector } from '../redux/slice/normalized_posts_slice'
import { NoPosts } from './no-content-placeholders';
import { useHistory } from "react-router-dom";

export default function PostGrid(props) {
    const postImages = []

    if (props.user.post_ids) {
        const history = useHistory()
        const posts = useSelector(normalizedPostsSelector.getPosts(props.user.post_ids))
        posts.forEach((post) => {
            postImages.push(
                <img
                    className="post-grid__img"
                    key={post.id}
                    src={post.image_url}
                    onClick={() => { history.push("/post?id=" + post.id) }}
                />
            )
        })
    }

    if (postImages.length <= 0) {
        return <NoPosts />
    }

    return (
        <div className="post-grid">
            {postImages}
        </div>
    )
}