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
});

export default rootReducer;