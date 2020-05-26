import * as ActionTypes from '../../actions/action_types'


const _results = {
    users: [],
    hashtags: [],
    loading: false
}

const ExploreReducer = (state = _results, action) => {
    switch (action.type) {
        case ActionTypes.FOUND_USERS_SUCCESS:
            if (action.payload.users) {
                return Object.assign({}, state, { loading: false, users: Object.keys(action.payload.users) });
            }
            if (action.payload.hastags) {
                return Object.assign({}, state, { loading: false, users: Object.keys(action.payload.hashtags) });
            }
            else {
                return _results
            }
        case ActionTypes.FOUND_USERS_FAILURE:
            return Object.assign({}, state, { loading: false });
        case ActionTypes.FOUND_USERS_REQUEST:
            return Object.assign({}, state, { loading: true });
        default:
            return state;
    }
};

export default ExploreReducer