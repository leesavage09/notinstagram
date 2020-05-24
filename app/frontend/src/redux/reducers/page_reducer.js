import { combineReducers } from 'redux';
import ExploreReducer from './page/explore_reducer'
import UserReducer from './page/user_reducer'

const pageReducer = combineReducers({
    explore: ExploreReducer,
    user: UserReducer,
});

export default pageReducer;