import thunk from 'redux-thunk';
import rootReducer from './root_reducer';
import { configureStore } from '@reduxjs/toolkit'

const getStore = (preloadedState = {}) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [thunk],
        devTools: true,//process.env.NODE_ENV !== 'production',
        preloadedState,
        enhancers: null
    })
    return store;
}

export default getStore