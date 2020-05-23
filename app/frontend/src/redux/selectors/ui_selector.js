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

export const isAwaitingAsync = () => {
    return state => state.ui.is_awaiting_async
}

export const showChangeAvatarModal = () => {
    return state => state.ui.show_change_avatar_modal;
}