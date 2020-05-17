import * as ActionTypes from '../../actions/action_types'


const _nullProfiles = {

}

const ProfilesReducer = (state = _nullProfiles, action) => {
  switch (action.type) {
    case ActionTypes.FOUND_PROFILES_SUCCESS:
    return Object.assign({}, state, action.payload.profiles);
    default:
      return state;
  }
};

export default ProfilesReducer