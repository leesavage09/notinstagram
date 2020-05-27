import * as ActionTypes from '../../actions/action_types'


const _null = {
    user_id: null
}

const ProfileReducer = (state = _null, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_SUCCESS:
            return Object.assign({}, state, { user_id: action.payload.user.id });
        case ActionTypes.GET_USER_FAILURE:
            return _null
        default:
            return state;
    }
};

export default ProfileReducer