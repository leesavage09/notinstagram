import { combineReducers } from 'redux';
import ExploreReducer from './component/explore_reducer'
import ImageReducer from './component/image_reducer'

const componentReducer = combineReducers({
    explore: ExploreReducer,
    image: ImageReducer,
});

export default componentReducer;