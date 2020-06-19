import { useSelector } from 'react-redux'
import React from 'react';
import { normalizedPostsSelector } from '../redux/slice/normalized_posts_slice'
import { NoPosts } from './no-content-placeholders';
import Post from './post';
import { useHistory } from "react-router-dom";

export function PostFeed(props) {
    return <Display type="post-feed" post_ids={props.post_ids} />
}

export function PostGrid(props) {
    return <Display type="post-grid" post_ids={props.post_ids} />
}

function Display(props) {
    const postItems = []
    const history = useHistory()
    const post_ids = props.post_ids || []
    const posts = useSelector(normalizedPostsSelector.getPosts(post_ids))

    if (!posts) return <NoPosts />

    switch (props.type) {
        case "post-grid":
            loadGridItems(postItems, posts, history)
            break;
        case "post-feed":
            loadFeedItems(postItems, posts)
    }

    return (
        <div className={props.type}>
            {postItems}
        </div>
    )
}

function loadFeedItems(array, posts) {
    posts.forEach((post) => {
        array.push(<Post key={post.id} post={post} />)
    })
}

function loadGridItems(array, posts, history) {
    posts.forEach((post) => {
        array.push(
            <img
                className="post-grid__img"
                key={post.id}
                src={post.image_url}
                onClick={() => { history.push("/post?id=" + post.id) }}
            />
        )
    })
}