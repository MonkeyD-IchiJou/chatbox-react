var SetLivechatRequirementPromise = (username, problem) => {
    return new Promise((resolve, reject) => {
        resolve({ username, problem })
    })
}

export function setLivechatRequirement_act(username, problem) {

    return {
        type: 'SET_LIVECHAT_REQUIREMENT',
        payload: SetLivechatRequirementPromise(username, problem)
    }

}

export function setAttentionLevel_act(requireAttention) {

    return {
        type: 'SET_ATTENTIONLEVEL',
        payload: requireAttention
    }

}

export function usrReqLivechat_act() {

    return {
        type: 'SET_REQ_LIVECHAT',
        payload: 'ok'
    }

}

export function usrReqChatbot_act() {

    return {
        type: 'SET_REQ_LIVECHAT',
        payload: 'ok'
    }

}