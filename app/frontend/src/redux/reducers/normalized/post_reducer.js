import * as ActionTypes from '../../actions/action_types'


const _nullPosts = {

}

const PostReducer = (state = _nullPosts, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_SUCCESS:
      if (action.payload.posts) {
        return Object.assign({}, state, action.payload.posts);
      } else {
        return state
      }
    default:
      return state;
  }
};

export default PostReducer