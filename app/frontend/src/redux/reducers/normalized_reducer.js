import { combineReducers } from 'redux';
import usersReducer from './normalized/user_reducer'

const normalizedReducer = combineReducers({
    users: usersReducer
});

export default normalizedReducer;