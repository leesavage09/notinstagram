export const CREATE_USER = "CREATE_USER";

export const createUser = (user) => ({
    type: CREATE_USER,
    user
});