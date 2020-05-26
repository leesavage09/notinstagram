export const getPost = (id) => {
    return state => state.normalized.posts[id]
}

export const getPosts = (ids) => {
    return state => {
        const posts = []
        ids.forEach(id => {
            posts.push(state.normalized.posts[id])
        });
        return posts
    }
}