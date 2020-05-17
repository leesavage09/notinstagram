import * as ActionTypes from '../../actions/action_types'


const _results = {
    profiles: [],
    hashtags: []
}

const ExploreReducer = (state = _results, action) => {
    switch (action.type) {
        case ActionTypes.FOUND_PROFILES_SUCCESS:
            return Object.assign({}, state, { profiles: Object.keys(action.payload.profiles) });
        default:
            return state;
    }
};

export default ExploreReducer