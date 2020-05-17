import { combineReducers } from 'redux';
import SessionReducer from '../redux/reducers/session_reducer'
import UIReducer from './reducers/ui_reducer';
import componentReducer from './reducers/component_reducer'
import normalizedReducer from './reducers/normalized_reducer'

const rootReducer = combineReducers({
    session: SessionReducer,
    ui: UIReducer,
    component: componentReducer,
    normalized: normalizedReducer
});

export default rootReducer;