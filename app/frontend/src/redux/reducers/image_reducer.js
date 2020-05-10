import * as ActionTypes from '../actions/action_types'

const _default = {
    selected_image: null,
    processed_image: null,
    image_processes: {
        fitWidth: false,
        rotation: 0
    }
};

const ImageReducer = (state = _default, action) => {
    Object.freeze(state);

    switch (action.type) {
        case ActionTypes.IMAGE_SELECT_SUCCESS:
            return Object.assign({}, state, { selected_image: action.payload })
        case ActionTypes.IMAGE_SAVED_SUCCESS:
            return Object.assign({}, state, { processed_image: action.payload })
        case ActionTypes.UPDATE_IMAGE_FILTERS:
            const ip = Object.assign({}, state.image_processes, action.payload)
            return Object.assign({}, state, { image_processes: ip })
        default:
            return state;
    }
};

export default ImageReducer;