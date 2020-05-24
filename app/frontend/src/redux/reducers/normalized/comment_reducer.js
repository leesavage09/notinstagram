import * as ActionTypes from '../../actions/action_types'


const _nullComments = {

}

const CommentReducer = (state = _nullComments, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_SUCCESS:
      if (action.payload.comments) {
        return Object.assign({}, state, action.payload.comments);
      } else {
        return state
      }
    default:
      return state;
  }
};

export default CommentReducer