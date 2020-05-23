import { combineReducers } from 'redux';
import ImageReducer from './component/image_reducer'

const componentReducer = combineReducers({
    image: ImageReducer,
});

export default componentReducer;