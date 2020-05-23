import * as ActionTypes from '../../actions/action_types'


const _nullProfiles = {

}

const UserReducer = (state = _nullProfiles, action) => {
  switch (action.type) {
    case ActionTypes.FOUND_PROFILES_SUCCESS:
      if (action.payload.users) {
        return Object.assign({}, state, action.payload.users);
      } else {
        return state
      }
    default:
      return state;
  }
};

export default UserReducer