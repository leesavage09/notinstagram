import { combineReducers } from 'redux';
import usersReducer from './normalized/user_reducer'
import postsReducer from './normalized/post_reducer'
import commentReducer from './normalized/comment_reducer'

const normalizedReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    comments: commentReducer,
});

export default normalizedReducer;