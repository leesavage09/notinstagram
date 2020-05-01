import * as ActionTypes from '../actions/action_types'

const LoadingReducer = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_REQUEST:
      return true
    case ActionTypes.LOGIN_USER_SUCCESS:
      return false
    case ActionTypes.LOGIN_USER_FAILURE:
      return false
    case ActionTypes.LOGOUT_REQUEST:
      return true
    case ActionTypes.LOGOUT_SUCCESS:
      return false
    case ActionTypes.LOGOUT_FAILURE:
      return false
    case ActionTypes.CREATE_USER_REQUEST:
      return true
    case ActionTypes.CREATE_USER_SUCCESS:
      return false;
    case ActionTypes.CREATE_USER_FAILURE:
      return false;
    case ActionTypes.UPDATE_USER_REQUEST:
      return true
    case ActionTypes.UPDATE_USER_SUCCESS:
      return false;
    case ActionTypes.UPDATE_USER_FAILURE:
      return false;
    default:
      return false;
  }
};

export default LoadingReducer