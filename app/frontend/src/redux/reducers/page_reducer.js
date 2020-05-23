import { combineReducers } from 'redux';
import ExploreReducer from './page/explore_reducer'

const pageReducer = combineReducers({
    explore: ExploreReducer
});

export default pageReducer;