import { combineReducers } from 'redux';
import ProfilesReducer from './normalized/profiles_reducer'

const normalizedReducer = combineReducers({
    profiles: ProfilesReducer
});

export default normalizedReducer;