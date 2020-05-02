import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function ProtectedContainer(props) {
    let header;
    let footer = <MobileFooter />

    switch (window.location.pathname) {
        case '/activity':
            header = <ActivityHeader />
            break;
        case '/explore':
            header = <ExploreHeader />
            break;
        case '/create-image':
            header = <CreatePhoto />
            footer = ''
            break;
        case '/create-post':
            header = <CreatePost />
            footer = ''
            break;
        case '/account':
            header = <AccountHeader />
            break;
        case '/options':
            header = <OptionsHeader />
            footer = ''
            break;
        default:
            header = <MainHeader />
            break;
    }

    return (
        <div>
            {header}
            {props.children}
            {footer}
        </div>
    );
}

function MobileFooter() {
    const path = window.location.pathname
    return (
        <div className='mobile_footer'>
            <Link to="/" className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className={path === '/' ? 'home_selected' : 'home'} />
                </svg>
            </Link>
            <Link to="/explore" className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className={path === '/explore' ? 'explore_selected' : 'explore'} />
                </svg>
            </Link>
            <Link to="/create-image" className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className='create' />
                </svg>
            </Link>
            <Link to="/activity" className="footer_btn" >
                <svg viewBox="0 0 48 48">
                    <path className={path === '/activity' ? 'activity_selected' : 'activity'} />
                </svg>
            </Link>
            <Link to="/account" className="footer_btn" >
                <div className={path === '/account' ? 'account_border' : ''}></div>
                <img className="account" alt="leesavage09's profile picture" src="https://instagram.fltn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/94246361_561658168093273_8809993563602419712_n.jpg?_nc_ht=instagram.fltn2-1.fna.fbcdn.net&amp;_nc_ohc=jyjQkwhQAnUAX_LL1eY&amp;oh=708be17a299ed16157d1d4787986aacf&amp;oe=5ED3EA64"></img>
            </Link>
        </div >
    );
}

function MainHeader() {

    function chat() {
        alert("Direct messaging, coming soon!")
    }

    return (
        <div className='mobile_header'>
            <Link to="/create-image" className="icon" >
                <svg viewBox="0 0 48 48">
                    <path d="M38.5 46h-29c-5 0-9-4-9-9V17c0-5 4-9 9-9h1.1c1.1 0 2.2-.6 2.7-1.7l.5-1c1-2 3.1-3.3 5.4-3.3h9.6c2.3 0 4.4 1.3 5.4 3.3l.5 1c.5 1 1.5 1.7 2.7 1.7h1.1c5 0 9 4 9 9v20c0 5-4 9-9 9zm6-29c0-3.3-2.7-6-6-6h-1.1C35.1 11 33 9.7 32 7.7l-.5-1C31 5.6 29.9 5 28.8 5h-9.6c-1.1 0-2.2.6-2.7 1.7l-.5 1c-1 2-3.1 3.3-5.4 3.3H9.5c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6h29c3.3 0 6-2.7 6-6V17zM24 38c-6.4 0-11.5-5.1-11.5-11.5S17.6 15 24 15s11.5 5.1 11.5 11.5S30.4 38 24 38zm0-20c-4.7 0-8.5 3.8-8.5 8.5S19.3 35 24 35s8.5-3.8 8.5-8.5S28.7 18 24 18z"></path>
                </svg>
            </Link>

            <div className='small_logo'></div>

            <button className='icon' onClick={chat}>
                <svg viewBox="0 0 48 48">
                    <path d="M46.5 3.5h-45C.6 3.5.2 4.6.8 5.2l16 15.8 5.5 22.8c.2.9 1.4 1 1.8.3L47.4 5c.4-.7-.1-1.5-.9-1.5zm-40.1 3h33.5L19.1 18c-.4.2-.9.1-1.2-.2L6.4 6.5zm17.7 31.8l-4-16.6c-.1-.4.1-.9.5-1.1L41.5 9 24.1 38.3z"></path><path d="M14.7 48.4l2.9-.7"></path>
                </svg>
            </button>
        </div>
    );
}

function ActivityHeader() {
    return (
        <div className='mobile_header center'>
            <h1>Activity</h1>
        </div>
    );
}

function AccountHeader() {

    function discoverPeople() {
        alert("Comming Soon")
    }

    return (
        <div className='mobile_header'>
            <Link to="/options" className='icon'>
                <svg viewBox="0 0 48 48">
                    <path d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"></path>
                </svg>
            </Link>
            <h1>username</h1>
            <button className='icon' onClick={discoverPeople}>
                <svg viewBox="0 0 48 48">
                    <path d="M32 25.5c5.2 0 9.5-4.3 9.5-9.5S37.2 6.5 32 6.5s-9.5 4.3-9.5 9.5 4.3 9.5 9.5 9.5zm0-16c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5zm5.5 19h-11c-5.5 0-10 4.5-10 10V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-3.9 3.1-7 7-7h11c3.9 0 7 3.1 7 7V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-5.5-4.5-10-10-10zm-20-4.5c0-.8-.7-1.5-1.5-1.5h-5.5V17c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v5.5H2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5.5V31c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-5.5H16c.8 0 1.5-.7 1.5-1.5z"></path>
                </svg>
            </button>
        </div>
    );
}

function OptionsHeader() {
    return (
        <div className='mobile_header'>
            <Link to="/account" className='icon'>
                <svg viewBox="0 0 48 48">
                    <path d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z"></path>
                </svg>
            </Link>
            <h1>Options</h1>
            <div className='icon-spacer'></div>
        </div>
    );
}

function CreatePhoto() {
    let history = useHistory();
    return (
        <div className='mobile_header'>
            <button onClick={history.goBack} className='icon'>
                <svg viewBox="0 0 48 48">
                    <path d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z"></path>
                </svg>
            </button>
            <h1>New Photo Post</h1>
            <Link to='/create-post'>Next</Link>
        </div>
    );
}

function CreatePost() {
    let history = useHistory();
    let rotate = {
        transform: 'rotate(270deg)',
    }
    return (
        <div className='mobile_header'>
            <button onClick={history.goBack} className='icon' style={rotate} >
                <svg viewBox="0 0 48 48">
                    <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                </svg>
            </button>
            <h1>New Post</h1>
            <a>Share</a>
        </div>
    );
}

function ExploreHeader() {
    const searchBox = React.createRef();
    const cancelBtn = React.createRef();

    function startTyping(e) {
        console.log(e.target.value)
        cancelBtn.current.className = "show"
        searchBox.current.className = "typing"
    }

    function cancel() {
        cancelBtn.current.className = "hide"
        searchBox.current.className = ""
    }

    return (
        <div className='mobile_header'>
            <input
                ref={searchBox}
                type="text"
                placeholder='Search'
                onClick={startTyping}
            />
            <button ref={cancelBtn} onClick={cancel} className="hide">Cancel</button>
        </div>
    );
}