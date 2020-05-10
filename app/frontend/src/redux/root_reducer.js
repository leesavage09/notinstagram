import { combineReducers } from 'redux';
import SessionReducer from '../redux/reducers/session_reducer'
import UIReducer from './reducers/ui_reducer';
import ImageReducer from './reducers/image_reducer'

const rootReducer = combineReducers({
    session: SessionReducer,
    ui: UIReducer,
    image: ImageReducer
});

export default rootReducer;