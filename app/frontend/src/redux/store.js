import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (preloadedState = {}) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );

    return store;
}

export default configureStore