import React from 'react';
import { Link, useHistory } from "react-router-dom";
import SVGIcon from './svg_icon';
import SearchInput from './search_input'
import { useSelector } from 'react-redux'
import { sessionSelector } from '../redux/slice/session_slice'
import ImageSelectButton from './image_select_button';

export const TopNavFeed = () => (
    <TopNav>
        <CreatePostButton />
        <div className='small-logo top-nav__logo' />
        <ChatButton />
    </TopNav>
)

export const TopNavExplore = () => (
    <TopNav>
        <SearchInput />
    </TopNav>
)

export const TopNavCreatePhoto = (props) => (
    <TopNav>
        <GoBackCloseButton />
        <h1>{props.title}</h1>
        <a className='top-nav__link'
            onClick={props.button_action}
        >{props.button_title}</a>
    </TopNav>
)

export const TopNavCreatePost = (props) => (
    <TopNav>
        <GoBackArrowButton />
        <h1>New Post</h1>
        <a className='top-nav__link'
            onClick={props.createPost}
        >Share</a>
    </TopNav>
)

export const TopNavActivity = () => (
    <TopNav>
        <NoButton />
        <h1>Activity</h1>
        <NoButton />
    </TopNav>
)

export const TopNavOptions = () => (
    <TopNav>
        <GoBackCloseButton />
        <h1>Options</h1>
        <NoButton />
    </TopNav>
)

export const TopNavAccount = () => {
    const user = useSelector(sessionSelector.loggedInUser())
    return (
        <TopNav>
            <AccountOptionsButton />
            <h1>{user.username}</h1>
            <FindUsersButton />
        </TopNav>
    )
}

export const TopNavBackWithTitle = (props) => (
    <TopNav>
        <GoBackArrowButton />
        <h1>{props.title}</h1>
        <NoButton />
    </TopNav>
)

const TopNav = (props) => (
    <div className='top-nav'>
        <div className='top-nav__container'>
            {props.children}
        </div>
    </div>
)

const NoButton = () => <div className='top-nav__icon-spacer'></div>

const ChatButton = () => (
    <button className='text-button top-nav__icon' onClick={() => {
        alert("Direct messaging, coming soon!")
    }}>
        <SVGIcon iconName='svg-chat-icon' />
    </button>
)

const AccountOptionsButton = () => (
    <Link to="/account/options" className='top-nav__icon'>
        <SVGIcon iconName='svg-options-icon' />
    </Link>
)

const FindUsersButton = () => (
    <button className='text-button top-nav__icon' onClick={() => {
        alert("Comming Soon")
    }}>
        <SVGIcon iconName='svg-plus-people-icon' />
    </button>
)

const CreatePostButton = () => {
    const history = useHistory()
    return (
        <ImageSelectButton
            className='text-button top-nav__icon'
            imageSelected={() => history.push("/create-post-image")}
        >
            <SVGIcon iconName='svg-camera-icon' />
        </ImageSelectButton>
    )
}

const GoBackCloseButton = () => {
    const history = useHistory()
    return (
        <a onClick={history.goBack} className='top-nav__icon'>
            <SVGIcon iconName='svg-close-icon' />
        </a>
    )
}

const GoBackArrowButton = () => {
    const history = useHistory()
    return (
        <button onClick={history.goBack} className='text-button top-nav__icon  top-nav__icon--rotated-270' >
            <SVGIcon iconName='svg-back-icon' />
        </button>
    )
}