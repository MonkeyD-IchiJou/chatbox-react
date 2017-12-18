const userReducer = (
    state = { username: '', email: '', requireAttention: 1, problem: '' },
    action
) => {

    switch (action.type) {
        case "SET_USER_INFO":
            state = {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                requireAttention: action.payload.requireAttention,
                problem: action.payload.problem
            }
            break

        default:
            break
    }

    return state

}

export default userReducer