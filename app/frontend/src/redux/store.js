import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root_reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (preloadedState = {}) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(thunk, logger)

        )
    );

    return store;
}

const logger = store => next => action => {
    console.log('Action received:', action);
    console.log('State pre-dispatch:', store.getState());

    let result = next(action);

    console.log('State post-dispatch:', store.getState());

    return result;
};



export default configureStore