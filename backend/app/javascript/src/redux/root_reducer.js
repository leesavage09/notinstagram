import { combineReducers } from 'redux';
import signup from '../components/signup/signup_reducer'
import login from '../components/login/login_reducer'

const rootReducer = combineReducers({
    signup,
    login
});

export default rootReducer;
