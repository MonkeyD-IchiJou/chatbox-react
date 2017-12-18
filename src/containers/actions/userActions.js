export function setUser_act(username, email, requireAttention, problem) {

    return {
        type: 'SET_USER_INFO',
        payload: { username, email, requireAttention, problem }
    }

}