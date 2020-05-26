import * as ActionTypes from '../../actions/action_types'
import merge from 'lodash/merge'

const _nullUsers = {

}

const UserReducer = (state = _nullUsers, action) => {
  switch (action.type) {
    case ActionTypes.FOUND_USERS_SUCCESS:
      if (action.payload.users) {
        return Object.assign({}, state, action.payload.users);
      } else {
        return state
      }
    case ActionTypes.GET_USER_SUCCESS:
      const addUsers = merge({}, action.payload.users, { [action.payload.user.id]: action.payload.user })
      return merge({}, state, addUsers);
    default:
      return state;
  }
};

export default UserReducer