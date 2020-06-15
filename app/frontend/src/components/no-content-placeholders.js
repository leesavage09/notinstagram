import { useSelector } from 'react-redux'
import React from 'react';
import ImageSelectButton from './image_select_button';
import { useHistory } from "react-router-dom";
import { normalizedPostsSelector } from '../redux/slice/normalized_posts_slice'

export function NoNotifications() {
    return (
        <IconHeadingTitleLink
            iconClassName="big-like-icon"
            heading="Activity On Your Posts"
            subheading="When someone likes or comments on one of your posts, you'll see it here."
            postlink="true"
        />
    )
}

export function NoPosts() {
    return (
        <IconHeadingTitleLink
            iconClassName="big-like-icon"
            heading="Share Photos"
            subheading="When you share photos, they will appear on your profile."
            postlink="true"
        />
    )
}

export function NoSavedPosts() {
    return (
        <IconHeadingTitleLink
            iconClassName="big-bookmark-icon"
            heading="Save"
            subheading="Saving of posts is not yet a feature of notinstagram..."
        />
    )
}

export function NoTaggedPosts() {
    return (
        <IconHeadingTitleLink
            iconClassName="big-user-icon"
            heading="Photos of you"
            subheading="When people tag you in photos, they wont appear here as this is not a feature of notinstagram yet..."
        />
    )
}

function IconHeadingTitleLink(props) {
    const history = useHistory();
    return (
        <div className="no-content">
            <div className="no-content__like-icon ">
                <div className={props.iconClassName} />
            </div>
            <h2 className="no-content__heading">{props.heading}</h2>
            <h3 className="no-content__subheading">{props.subheading}</h3>
            {props.postlink ?
                <ImageSelectButton
                    className="no-content__create-post-link"
                    imageSelected={() => history.push("/create-post-image")}
                >
                    Share your first photo
                </ImageSelectButton> : ''
            }
        </div>
    )
}