import thunk from 'redux-thunk';
import rootReducer from './root_reducer';
import { configureStore } from '@reduxjs/toolkit'
import { sessionActions } from '../redux/slice/session_slice'

const getStore = (preloadedState = {}) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [thunk, testIfAuthorized],
        devTools: true,//process.env.NODE_ENV !== 'production',
        preloadedState,
        enhancers: null
    })
    return store;
}

const testIfAuthorized = store => next => action => {
    if (
        action.payload &&
        action.payload.response &&
        action.payload.response.data &&
        action.payload.response.data.errors &&
        action.payload.response.data.errors[0] &&
        action.payload.response.data.errors[0] === "unauthorized not logged in"
    ) {
        next(sessionActions.reauthenticate());
        return
    }
    next(action)
}

export default getStore