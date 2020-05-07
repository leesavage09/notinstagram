export const errorsMessages = state => {
    const errors = []
    Object.keys(state.messages.messages).forEach(key => {
        state.messages.messages[key].forEach(message => {
            errors.push(message)
        })
    })
    return errors;
}

export const sessionSaved = state => {
    return state.messages.update_user_success; 
}
