export const allMessages = () => {
    return state => {
        const messages = []
        Object.keys(state.ui.messages).forEach(key => {
            state.ui.messages[key].forEach(message => {
                messages.push(message)
            })
        })
        return messages;
    }
}

export const allErrors = () => {
    return state => state.ui.errors ? allMessages()(state) : []
}

export const allSuccesses = () => {
    return state => !state.ui.errors ? allMessages()(state) : []
}

export const isButton_loading = () => {
    return state => state.ui.button_loading
}

export const isAvatar_loading = () => {
    return state => state.ui.avatar_loading
}

export const showChangeAvatarModal = () => {
    return state => state.ui.show_change_avatar_modal;
}