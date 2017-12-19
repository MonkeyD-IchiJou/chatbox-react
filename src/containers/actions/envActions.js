export function setValidatingUser_act(payload) {

    return {
        type: 'SET_VALIDATING_USR',
        payload: payload
    }

}

export function setHasChatbotConnect_act(connection) {

    return {
        type: 'SET_CHATBOT_CONNECTION',
        payload: connection
    }

}

export function setHasLivechatConnect_act(connection) {

    return {
        type: 'SET_LIVECHAT_CONNECTION',
        payload: connection
    }

}
