export function pushMsg_act(payload) {
  return {
    type: 'PUSH_MSG',
    payload: payload
  }
}

export function popMsg_act(payload) {
  return {
    type: 'POP_MSG',
    payload: payload
  }
}