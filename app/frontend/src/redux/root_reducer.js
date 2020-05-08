import { combineReducers } from 'redux';
import SessionReducer from '../redux/reducers/session_reducer'
import UIReducer from './reducers/ui_reducer';

const rootReducer = combineReducers({
    session: SessionReducer,
    ui: UIReducer
});

export default rootReducer;