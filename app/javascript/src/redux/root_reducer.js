import { combineReducers } from 'redux';
import SessionReducer from '../redux/reducers/session_reducer'
import SessionErrorsReducer from '../redux/reducers/session_errors_reducer';
import LoadingReducer from '../redux/reducers/loading_reducer'
import UserErrorsReducer from '../redux/reducers/user_errors_reducer'

const errorsReducer = combineReducers({
  session: SessionErrorsReducer,
  user: UserErrorsReducer
  });

const rootReducer = combineReducers({
    session: SessionReducer, 
    loading: LoadingReducer,
    errors: errorsReducer
});

export default rootReducer;