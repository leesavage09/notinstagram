import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { PostGridIcon, BookmarkIcon, TaggedIcon } from './svg_icon'
import { PostFeed, PostGrid } from './display_posts';
import { NoSavedPosts, NoTaggedPosts } from './no-content-placeholders';

const SVG_STYLE = "account-icons__svg account-icons__svg"
const SVG_SELECTED_STYLE = "account-icons__svg account-icons__svg--selected"
const POST_FEED_BUTTON_STYLE = "feed-logo--dark-grey account-icons__sprite"
const POST_FEED_BUTTON_STYLE_SELECTED = "feed-logo--blue account-icons__sprite"

function ProfileActivity(props) {
    const history = useHistory();
    const [feedType, setFeedType] = useState("PostGrid");
    const [postGridButtonStyle, setpostGridButtonStyle] = useState(SVG_SELECTED_STYLE);
    const [postFeedButtonStyle, setpostFeedButtonStyle] = useState(POST_FEED_BUTTON_STYLE);
    const [savedPostButtonStyle, setsavedPostButtonStyle] = useState(SVG_STYLE);
    const [taggedPostButtonStyle, settaggedPostButtonStyle] = useState(SVG_STYLE);

    const selectGridFeed = () => {
        setpostGridButtonStyle(SVG_SELECTED_STYLE)
        setpostFeedButtonStyle(POST_FEED_BUTTON_STYLE)
        setsavedPostButtonStyle(SVG_STYLE)
        settaggedPostButtonStyle(SVG_STYLE)
        setFeedType("PostGrid")
    }
    const selectPostFeed = () => {
        setpostGridButtonStyle(SVG_STYLE)
        setpostFeedButtonStyle(POST_FEED_BUTTON_STYLE_SELECTED)
        setsavedPostButtonStyle(SVG_STYLE)
        settaggedPostButtonStyle(SVG_STYLE)
        setFeedType("PostFeed")
    }
    const selectSavePost = () => {
        setpostGridButtonStyle(SVG_STYLE)
        setpostFeedButtonStyle(POST_FEED_BUTTON_STYLE)
        setsavedPostButtonStyle(SVG_SELECTED_STYLE)
        settaggedPostButtonStyle(SVG_STYLE)
        setFeedType("NoSavedPosts")
    }
    const selectTaggedPost = () => {
        setpostGridButtonStyle(SVG_STYLE)
        setpostFeedButtonStyle(POST_FEED_BUTTON_STYLE)
        setsavedPostButtonStyle(SVG_STYLE)
        settaggedPostButtonStyle(SVG_SELECTED_STYLE)
        setFeedType("NoTaggedPosts")
    }

    return (
        <div>
            <ul className='profile-activity'>
                <li className='profile-activity__item'>
                    <span className='profile-activity__count'>
                        {props.user.number_posts}
                    </span>
                    posts
          </li>
                <li
                    className='profile-activity__item'
                    onClick={() => {
                        history.push("/followers?user_id=" + props.user.id)
                    }}>
                    <span className='profile-activity__count'>
                        {props.user.number_followers}
                    </span>
                    followers
          </li>
                <li
                    className='profile-activity__item'
                    onClick={() => {
                        history.push("/followings?user_id=" + props.user.id)
                    }}>
                    <span className='profile-activity__count'>
                        {props.user.number_following}
                    </span>
                    following
          </li>
            </ul>
            <div className='account-icons'>
                <a onClick={selectGridFeed} className='account-icons__icon'>
                    <PostGridIcon className={postGridButtonStyle} />
                </a>
                <a onClick={selectPostFeed} className='account-icons__icon'>
                    <div className={postFeedButtonStyle} />
                </a>
                <a onClick={selectSavePost} className='account-icons__icon'>
                    <BookmarkIcon className={savedPostButtonStyle} />
                </a>
                <a onClick={selectTaggedPost} className='account-icons__icon'>
                    <TaggedIcon className={taggedPostButtonStyle} />
                </a>
            </div>

            <div>
                {getFeedType(feedType, props.user)}
            </div>

        </div>
    )
}

export default ProfileActivity


function getFeedType(type, user) {
    switch (type) {
        case "PostGrid":
            return <PostGrid post_ids={user.post_ids} />
        case "PostFeed":
            return <PostFeed post_ids={user.post_ids} />
        case "NoSavedPosts":
            return <NoSavedPosts />
        case "NoTaggedPosts":
            return <NoTaggedPosts />
    }
}