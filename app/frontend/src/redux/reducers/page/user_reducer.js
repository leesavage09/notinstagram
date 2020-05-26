import * as ActionTypes from '../../actions/action_types'


const _null = {
    loading: false,
    user_id: null
}

const UserReducer = (state = _null, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_SUCCESS:
            return Object.assign({}, state, { loading: false, user_id: action.payload.user.id });
        case ActionTypes.GET_USER_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionTypes.GET_USER_FAILURE:
            return _null
        default:
            return state;
    }
};

export default UserReducer