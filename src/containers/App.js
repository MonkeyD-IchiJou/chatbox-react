import React, { Component } from 'react'
import { connect } from 'react-redux'
import SocketConnect from './socketapi'
import {
  usrReqLivechat_act,
  usrUpdateInfo_act
} from './actions/userActions'
import {
  setAdminInfo_act
} from './actions/adminActions'
import {
  setChatboxMode_act
} from './actions/envActions'
import {
  pushMsg_act,
  popMsg_act
} from './actions/msgActions'
import Chatbox from './components/Chatbox'
import request from 'superagent'

class App extends Component {

  constructor(props) {
    super(props)

    // storing socket data in my App state locally
    this.state = {
      chatbotSocket: new SocketConnect('chatbotSocket'),
      livechatSocket: new SocketConnect('livechatSocket'),
      sendFormDisabled: false,
      LivechatCounter: 0,
      lcintervalId: 0
    }
  }

  componentDidMount() {

    const { envReducer, dispatch } = this.props
    const chatboxMode = envReducer.chatboxMode

    switch (chatboxMode) {
      case 'CHATBOT':
        // chatbot only, connect to my chatbot socket server pls
        this.connectChatbotSocket()
        break

      case 'LIVECHAT':
        // livechat only
        this.sendFormDisableMah(true)
        dispatch(usrReqLivechat_act())
        break

      default:
        break
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    // do not update my component if i am validating the user
    return !nextProps.envReducer.apploading
  }

  componentWillUnmount() {
    // clear the timer
    clearInterval(this.state.lcintervalId)

    // disconnect socket server
    this.state.chatbotSocket.disconnectSocket()
    this.state.livechatSocket.disconnectSocket()
  }

  timer = () => {
    this.emitMsgToChatbot('rating', true)
  }

  ChatbotToLivechat = () => {
    // disconnect the chatbot socket server
    this.state.chatbotSocket.disconnectSocket()

    // switch to live chat mode
    this.sendFormDisableMah(true)
    this.props.dispatch(setChatboxMode_act('LIVECHAT'))
    this.props.dispatch(usrReqLivechat_act())

    // clear itself
    clearInterval(this.state.lcintervalId)
  }

  sendFormDisableMah = (val) => {
    this.setState({ sendFormDisabled: val })
  }

  connectLivechatSocket = () => {

    const { envReducer, userReducer } = this.props
    let livechatSocket = this.state.livechatSocket

    // do not allow user to send any msg when I am connecting to socket server
    this.sendFormDisableMah(true)

    // disconnect the previous live chat if exist
    livechatSocket.disconnectSocket()

    // if have livechatId...
    // try to connect with my livechat socket server
    livechatSocket.connectSocket(envReducer.backendUrl + '/lcIO')

    // live chat socket subscribtions
    livechatSocket.subscribe('connect', () => {

      // asking to join room
      livechatSocket.socketEmit('client_join_room', {
        roomId: envReducer.livechatId,
        username: userReducer.username,
        message: userReducer.problem,
        attentionLevel: 1
      })

      livechatSocket.subscribe('client_joined', (data) => {
      })

      // waiting for admin to send me some msg
      livechatSocket.subscribe('client_receiving_msg', (data) => {

        this.props.dispatch(pushMsg_act({ from: data.adminUsername, msg: data.msg }))
        this.props.dispatch(setAdminInfo_act(data.adminUsername))

        // user can begin to send msg back to admin
        this.sendFormDisableMah(false)
      })

    })

  }

  connectChatbotSocket = () => {

    const { envReducer } = this.props
    let chatbotSocket = this.state.chatbotSocket

    // disconnect the chatbot socket if exist
    chatbotSocket.disconnectSocket()

    // connect to my socket server
    chatbotSocket.connectSocket(envReducer.backendUrl + '/cbIO')

    // my chatbot socket server subscription
    chatbotSocket.subscribe('connect', () => {

      // first, asking to join my chatbot room
      chatbotSocket.socketEmit('client_join_room', {
        roomId: envReducer.chatbotId
      })

      chatbotSocket.subscribe('client_joined', (data) => {
        // client successfully joined the room liao
        this.emitMsgToChatbot('who are you', true)
      })

    })
  }

  executeAction = (backendUrl, next_action, uuid, sender_id, usermsg) => {
    if (next_action === 'action_listen') {
      // stop calling execute action liao.. done
    }
    else {

      // if there is still got next action
      request
        .post(backendUrl + '/chatbot/v1/executeAction')
        .set('contentType', 'application/json; charset=utf-8')
        .set('dataType', 'json')
        .send({
          uuid: uuid,
          action: next_action,
          sender_id: sender_id
        })
        .end((err, res) => {

          try {
            if (err || !res.ok) {
              let errormsg = res.body.errors
              throw errormsg
            }
            else {
              let result = res.body

              if (!result) {
                throw new Error('no body msg')
              }

              // pre checking
              result.returnAct.forEach((act, index) => {
                switch (act.type) {
                  case 'QR':
                    this.sendFormDisableMah(true)
                    break
                  case 'CR':
                    if (act.customObj.livechat) {
                      // if got livechat counter...
                      const LivechatCounter = this.state.LivechatCounter
                      if (LivechatCounter < 2) {
                        this.setState({ LivechatCounter: LivechatCounter + 1 })
                      }
                      else {
                        this.emitMsgToChatbot('Livechat please', true)
                        this.setState({ lcintervalId: setInterval(this.ChatbotToLivechat, 5000) })
                      }
                    }
                    break
                  default:
                    break
                }
              })

              // store the action definition
              this.props.dispatch(pushMsg_act({ from: 'bot', msg: JSON.stringify(result.returnAct), actionName: next_action, usermsg: usermsg }))

              // execute again to see whether still got any action need to execute mah
              this.executeAction(backendUrl, result.result.next_action, uuid, sender_id, usermsg)

            }
          } catch (e) {
            console.log(e.toString())
          }

        })

    }
  }

  emitMsgToChatbot = (msg, nodispatch) => {

    let envReducer = this.props.envReducer
    const sender_id = this.state.chatbotSocket.socket.id
    const backendUrl = envReducer.backendUrl
    const cbuuid = envReducer.chatbotId

    request
      .post(backendUrl + '/chatbot/v1/query')
      .set('contentType', 'application/json; charset=utf-8')
      .set('dataType', 'json')
      .send({
        uuid: envReducer.chatbotId,
        text_message: msg,
        sender_id: 'admin: ' + this.state.chatbotSocket.socket.id
      })
      .end((err, res) => {

        try {
          if (err || !res.ok) {
            let errormsg = res.body.errors
            throw errormsg
          }
          else {
            let result = res.body

            if (!result) {
              throw new Error('no body msg')
            }

            this.executeAction(backendUrl, result.next_action, cbuuid, sender_id, msg)
          }
        } catch (e) {
          console.log(e.toString())
        }

      })

    if (nodispatch === true) {
      // do not do anything
    }
    else {
      // store this user msg
      this.props.dispatch(pushMsg_act({ from: 'user', msg: msg }))
    }

  }

  emitMsgToLivechatSocket = (msg) => {

    const { userReducer, adminReducer } = this.props
    let livechatSocket = this.state.livechatSocket

    // emit to live chat socket server about this updated username and problem
    livechatSocket.socketEmit('client_send_admin_msg', {
      clientSocketId: livechatSocket.socket.id,
      clientUsername: userReducer.username,
      adminUsername: adminReducer.adminName,
      msg: msg
    })

    this.props.dispatch(pushMsg_act({ from: 'user', msg: msg }))

  }

  setUserInfo = (username, email, problem) => {
    this.props.dispatch(usrUpdateInfo_act(username, email, problem)).then((result) => {
      // connect to livechat after updating the userinfo
      this.connectLivechatSocket()
    })
  }

  popMessage = (indexToPop) => {
    this.props.dispatch(popMsg_act(indexToPop))
  }

  render() {

    const { envReducer, userReducer, msgReducer } = this.props

    let chatboxMode = envReducer.chatboxMode

    switch (chatboxMode) {
      case 'CHATBOT':
        // only chatbot
        return (
          <Chatbox
            sendMsg={this.emitMsgToChatbot}
            popMessage={this.popMessage}
            allMsgs={msgReducer}
            chatboxMode={chatboxMode}
            setUserInfo={this.setUserInfo}
            backendUrl={envReducer.backendUrl}
            sendFormDisabled={this.state.sendFormDisabled}
            sendFormDisableMah={this.sendFormDisableMah}
            headerName={'Ask NEC Chatbot'}
          />
        )

      case 'LIVECHAT':
        // live chat mode
        return (
          <Chatbox
            sendMsg={this.emitMsgToLivechatSocket}
            popMessage={this.popMessage}
            allMsgs={msgReducer}
            chatboxMode={chatboxMode}
            setUserInfo={this.setUserInfo}
            backendUrl={envReducer.backendUrl}
            sendFormDisabled={this.state.sendFormDisabled}
            sendFormDisableMah={this.sendFormDisableMah}
            userReducer={userReducer}
            headerName={'Live Chat Session'}
          />
        )

      default:
        return ''

    }

  }
}

const mapStateToProps = (state) => {
  return {
    envReducer: state.envReducer,
    userReducer: state.userReducer,
    msgReducer: state.msgReducer,
    adminReducer: state.adminReducer
  }
}

export default connect(mapStateToProps)(App)
