import defaultEnvStore from './defaultEnvStore'

const envReducer = (
    state = defaultEnvStore,
    action
) => {

    switch (action.type) {
        case "SET_VALIDATING_USR":
            state = {
                ...state,
                validatingUser: action.payload
            }
            break

        case "SET_CHATBOT_CONNECTION":
            state = {
                ...state,
                chatbotConnect: action.payload
            }
            break

        case "SET_LIVECHAT_CONNECTION":
            state = {
                ...state,
                livechatConnect: action.payload
            }
            break

        default:
            break
    }

    return state
}

export default envReducer
