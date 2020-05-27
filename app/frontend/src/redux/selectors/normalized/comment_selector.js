export const getComment = (id) => {
    return state => state.normalized.comments[id]
}

export const getComments = (ids) => {
    return state => {
        const comments = []
        ids.forEach(id => {
            comments.push(state.normalized.comments[id])
        });
        return comments
    }
}