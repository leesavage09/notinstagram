import * as ActionTypes from '../actions/action_types'


const _nullUser = {
};

const SessionReducer = (state = _nullUser, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_SUCCESS:
      return Object.assign({}, { user: action.user });
    case ActionTypes.CREATE_USER_SUCCESS:
      return Object.assign({}, { user: action.user });
    case ActionTypes.UPDATE_USER_SUCCESS:
      return Object.assign({}, { user: action.user });
    case ActionTypes.LOGOUT_SUCCESS:
      return _nullUser;
    default:
      return state;
  }
};

export default SessionReducer