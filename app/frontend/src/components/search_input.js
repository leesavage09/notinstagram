import React from 'react';
import { debounce } from '../util/helpers'
import { exploreSelector, exploreActions } from '../redux/slice/explore_slice'
import { useSelector, useDispatch } from 'react-redux'
import LoadingSpinner, { SMALL_LOADING_SPINNER } from './loading_spinner';

const SEARCH_INPUT_DEFAULT_STYLE = "white-input search__input"
const SEARCH_INPUT_FOCUSED_STYLE = "white-input search__input search__input--has-text"
const CANCLE_BUTTON_HIDDEN_STYLE = "text-button search__cancel search__cancel--hide"
const CANCLE_BUTTON_VISIBLE_STYLE = "text-button search__cancel"

export default function SearchInput() {
    const searchBox = React.createRef();
    const cancelBtn = React.createRef();
    const dispatch = useDispatch()
    const loading = useSelector(exploreSelector.loading())
    const spinnerElement = loading ? <LoadingSpinner spinnerStyle={SMALL_LOADING_SPINNER} /> : ''


    const inputFocus = () => {
        cancelBtn.current.className = CANCLE_BUTTON_VISIBLE_STYLE
        searchBox.current.className = SEARCH_INPUT_FOCUSED_STYLE
    }

    const doSearch = () => {
        if (searchBox.current.value !== "") {
            dispatch(exploreActions.searchUsers(searchBox.current.value))
        }
    }

    const inputChanged = debounce(doSearch, 800)

    const handleCancel = () => {
        cancelBtn.current.className = CANCLE_BUTTON_HIDDEN_STYLE
        searchBox.current.className = SEARCH_INPUT_DEFAULT_STYLE
        searchBox.current.value = '';
    }

    return (
        <div className='search'>
            <input
                className={SEARCH_INPUT_DEFAULT_STYLE}
                ref={searchBox}
                type="text"
                placeholder='Search'
                onFocus={inputFocus}
                onChange={inputChanged}
            />
            <div className="search__spinner">{spinnerElement}</div>
            <button
                className={CANCLE_BUTTON_HIDDEN_STYLE}
                ref={cancelBtn}
                onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
}