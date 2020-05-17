import React from 'react';
import { debounce } from '../../util/helpers'
import * as ProfileActions from '../../redux/actions/normalized/profile_actions'
import { useSelector, useDispatch } from 'react-redux'
import * as UISelector from '../../redux/selectors/ui_selector'
import LoadingSpinner, { SMALL_LOADING_SPINNER } from '../../components/loading_spinner';

const SEARCH_INPUT_DEFAULT_STYLE = "white-input top-nav__search-input"
const SEARCH_INPUT_FOCUSED_STYLE = "white-input top-nav__search-input top-nav__search-input--has-text"
const CANCLE_BUTTON_HIDDEN_STYLE = "text-button top-nav__search-cancel top-nav__search-cancel--hide"
const CANCLE_BUTTON_VISIBLE_STYLE = "text-button top-nav__search-cancel"

export default function Explore() {
    const searchBox = React.createRef();
    const cancelBtn = React.createRef();
    const dispatch = useDispatch()
    const loading = useSelector(UISelector.isAwaitingAsync())
    const spinnerElement = loading ? <LoadingSpinner spinner={SMALL_LOADING_SPINNER} /> : ''


    const inputFocus = () => {
        cancelBtn.current.className = CANCLE_BUTTON_VISIBLE_STYLE
        searchBox.current.className = SEARCH_INPUT_FOCUSED_STYLE
    }

    const doSearch = () => {
        if (searchBox.current.value !== "") {
            dispatch(ProfileActions.searchForProfiles(searchBox.current.value))
        }
    }

    const inputChanged = debounce(doSearch, 800)

    const handleCancel = () => {
        cancelBtn.current.className = CANCLE_BUTTON_HIDDEN_STYLE
        searchBox.current.className = SEARCH_INPUT_DEFAULT_STYLE
        searchBox.current.value = '';
    }

    return (
        <div className='top-nav'>
            <input
                className={SEARCH_INPUT_DEFAULT_STYLE}
                ref={searchBox}
                type="text"
                placeholder='Search'
                onFocus={inputFocus}
                onChange={inputChanged}
            />
            <div className="top-nav__spinner">{spinnerElement}</div>
            <button
                className={CANCLE_BUTTON_HIDDEN_STYLE}
                ref={cancelBtn}
                onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
}