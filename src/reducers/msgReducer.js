const userReducer = (
  state = [{
    from: '',
    msgtime: '',
    msg: '',
    actionName: '',
    usermsg: ''
  }],
  action
) => {

  switch (action.type) {
    case "PUSH_MSG":
      state = [
        ...state
      ]
      state.push({
        from: action.payload.from,
        msgtime: new Date().toLocaleTimeString(),
        msg: action.payload.msg,
        actionName: action.payload.actionName,
        usermsg: action.payload.usermsg
      })
      break

    case "POP_MSG":
      state = [
        ...state
      ]
      state.splice(action.payload, 1)
      break

    default:
      break
  }

  return state

}

export default userReducer