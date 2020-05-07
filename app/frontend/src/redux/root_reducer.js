import { combineReducers } from 'redux';
import SessionReducer from '../redux/reducers/session_reducer'
import MessageReducer from './reducers/message_reducer';
import LoadingReducer from '../redux/reducers/loading_reducer'

const rootReducer = combineReducers({
    session: SessionReducer, 
    loading: LoadingReducer,
    messages: MessageReducer
});

export default rootReducer;