import * as ActionTypes from '../actions/action_types'
import merge from 'lodash/merge'


const _nullUser = {
};

const SessionReducer = (state = _nullUser, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.CREATE_USER_SUCCESS:
    case ActionTypes.UPDATE_USER_SUCCESS:
    case ActionTypes.UPDATE_USER_AVATAR_SUCCESS:
    case ActionTypes.REMOVE_USER_AVATAR_SUCCESS:
      return Object.assign({}, { user: action.payload });
    case ActionTypes.GET_USER_SUCCESS:
      if (action.payload.user.id === state.user.id) {
        return merge({}, state, { user: action.payload.user });
      } else {
        return state
      }
    case ActionTypes.LOGOUT_SUCCESS:
      return _nullUser;
    default:
      return state;
  }
};

export default SessionReducer