import * as ActionTypes from '../actions/action_types'


const _nullUser = {
};

const SessionReducer = (state = _nullUser, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_SUCCESS:
      const { username, name, bio, email } = action.user;
      return Object.assign({}, { user: { username, name, bio, email } });
    case ActionTypes.LOGOUT_SUCCESS:
      return _nullUser;
    default:
      return state;
  }
};

export default SessionReducer