const userReducer = (
    state = { 
        username: '', 
        email: '', 
        requireAttention: 0, 
        problem: '',
        requestChatbot: true, 
        requestLivechat: false 
    },
    action
) => {

    switch (action.type) {
        case "SET_LIVECHAT_REQUIREMENT_FULFILLED":
            state = {
                ...state,
                username: action.payload.username,
                problem: action.payload.problem
            }
            break

        case "SET_ATTENTIONLEVEL":
            state = {
                ...state,
                requireAttention: action.payload
            }
            break

        case "SET_REQ_LIVECHAT":
            state = {
                ...state,
                requestLivechat: true,
                requestChatbot: false
            }
            break

        case "SET_REQ_CHATBOT":
            state = {
                ...state,
                requestChatbot: true,
                requestLivechat: false
            }
            break

        default:
            break
    }

    return state

}

export default userReducer