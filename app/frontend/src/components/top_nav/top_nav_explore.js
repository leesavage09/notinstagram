import React from 'react';

export default function Explore() {
    const searchBox = React.createRef();
    const cancelBtn = React.createRef();

    function startTyping(e) {
        console.log(e.target.value)
        cancelBtn.current.className = "top-nav__search-cancel"
        searchBox.current.className = "top-nav__search-input top-nav__search-input--has-text"
    }

    function handleCancel() {
        cancelBtn.current.className = "top-nav__search-cancel top-nav__search-cancel--hide"
        searchBox.current.className = "top-nav__search-input"
        searchBox.current.value = '';
    }

    return (
        <div className='top-nav'>
            <input
                className='top-nav__search-input'
                ref={searchBox}
                type="text"
                placeholder='Search'
                onClick={startTyping}
            />
            <button
                className="top-nav__search-cancel--hide"
                ref={cancelBtn}
                onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
}