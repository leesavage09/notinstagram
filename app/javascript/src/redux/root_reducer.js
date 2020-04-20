import { combineReducers } from 'redux';
import SessionReducer from '../redux/reducers/session_reducer'
import SessionErrorsReducer from '../redux/reducers/session_errors_reducer';
import LoadingReducer from '../redux/reducers/loading_reducer'

const errorsReducer = combineReducers({
    session: SessionErrorsReducer
  });

const rootReducer = combineReducers({
    session: SessionReducer, 
    loading: LoadingReducer,
    errors: errorsReducer
});

export default rootReducer;