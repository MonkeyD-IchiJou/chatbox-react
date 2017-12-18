import defaultEnvStore from './defaultEnvStore'

const envReducer = (
    state = defaultEnvStore,
    action
) => {

    switch (action.type) {
        case "SET_BACKEND_URL_FULFILLED":
            state = {
                ...state,
                backendUrl: action.payload
            }
            break

        case "SET_VALIDATING_USR":
            state = {
                ...state,
                validatingUser: action.payload
            }
            break

        default:
            break
    }

    return state
}

export default envReducer
