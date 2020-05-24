import * as ActionTypes from '../../actions/action_types'


const _null = {
    loading: false,
    user: null
}

const ExploreReducer = (state = _null, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_SUCCESS:
            return Object.assign({}, state, { loading: false, user: action.payload.user });
        case ActionTypes.GET_USER_REQUEST:
            return Object.assign({}, state, { loading: true });
        case ActionTypes.GET_USER_FAILURE:
            return _null
        default:
            return state;
    }
};

export default ExploreReducer