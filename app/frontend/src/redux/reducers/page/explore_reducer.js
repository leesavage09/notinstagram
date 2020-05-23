import * as ActionTypes from '../../actions/action_types'


const _results = {
    users: [],
    hashtags: []
}

const ExploreReducer = (state = _results, action) => {
    switch (action.type) {
        case ActionTypes.FOUND_USERS_SUCCESS:
            if (action.payload.users) {
                return Object.assign({}, state, { users: Object.keys(action.payload.users) });
            } else {
                return _results
            }
        default:
            return state;
    }
};

export default ExploreReducer