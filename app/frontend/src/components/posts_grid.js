import { useSelector } from 'react-redux'
import React from 'react';
import * as PostSelector from '../redux/selectors/normalized/post_selector'

export default function PostGrid(props) {
    const postImages = []
    if (props.user.post_ids) {
        const posts = useSelector(PostSelector.getPosts(props.user.post_ids))
        posts.forEach((post) => {
            postImages.push(<img className="post-grid__img" key={post.id} src={post.image_url} />)
        })
    }

    return (
        <div className="post-grid">
            {postImages}
        </div>
    )
}