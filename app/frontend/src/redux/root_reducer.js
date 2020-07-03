import { combineReducers } from 'redux';
import modalSlice from './slice/modal_slice'
import imageEditorSlice from './slice/image_editor_slice'
import sessionSlice from './slice/session_slice'
import exploreSlice from './slice/explore_slice'
import profileSlice from './slice/profile_slice'
import toastSlice from './slice/toast_slice'
import UILoadingSlice from './slice/ui_loading_slice'
import normalizedCommentsSlice from './slice/normalized_comments_slice'
import normalizedPostsSlice from './slice/normalized_posts_slice'
import normalizedUsersSlice from './slice/normalized_users_slice'
import normalizedHashtagsSlice from './slice/normalized_hashtags_slice'
import followersSlice from './slice/followers_slice'
import PostSlice from './slice/post_slice'
import FeedSlice from './slice/feed_slice'
import commentSlice from './slice/comment_slice'
import discoverSlice from './slice/discover_slice'

const rootReducer = combineReducers({
    [modalSlice.name]: modalSlice.reducer,
    [imageEditorSlice.name]: imageEditorSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [exploreSlice.name]: exploreSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
    [toastSlice.name]: toastSlice.reducer,
    [UILoadingSlice.name]: UILoadingSlice.reducer,
    [normalizedCommentsSlice.name]: normalizedCommentsSlice.reducer,
    [normalizedPostsSlice.name]: normalizedPostsSlice.reducer,
    [normalizedUsersSlice.name]: normalizedUsersSlice.reducer,
    [normalizedHashtagsSlice.name]: normalizedHashtagsSlice.reducer,
    [followersSlice.name]: followersSlice.reducer,
    [PostSlice.name]: PostSlice.reducer,
    [FeedSlice.name]: FeedSlice.reducer,
    [commentSlice.name]: commentSlice.reducer,
    [discoverSlice.name]: discoverSlice.reducer,
});

export default rootReducer;