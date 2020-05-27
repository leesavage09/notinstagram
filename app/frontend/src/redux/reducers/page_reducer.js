import { combineReducers } from 'redux';
import ExploreReducer from './page/explore_reducer'
import ProfileReducer from './page/profile_reducer'

const pageReducer = combineReducers({
    explore: ExploreReducer,
    profile: ProfileReducer,
});

export default pageReducer;