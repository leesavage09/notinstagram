 export const allMessages = state => {
    const messages = []
    Object.keys(state.ui.messages).forEach(key => {
        state.ui.messages[key].forEach(message => {
            messages.push(message)
        })
    })
    return messages;
}

export const allErrors = state => {
    return state.ui.errors ? allMessages(state) : []
}

export const allSuccesses = state => {
    return !state.ui.errors ? allMessages(state) : []
}

export const isAwaitingAsync = state => {
    return state.ui.is_awaiting_async
}
