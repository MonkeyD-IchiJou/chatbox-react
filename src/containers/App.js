import React, { Component } from 'react'
import { connect } from 'react-redux'
import SocketConnect from './socketapi'
import { 
    setLivechatRequirement_act,
    usrReqLivechat_act
} from './actions/userActions'
import {
    setValidatingUser_act, 
    setHasLivechatConnect_act,
    setHasChatbotConnect_act
} from './actions/envActions'
import Chatbox from './components/Chatbox'

class App extends Component {

    constructor(props) {
        super(props)

        // storing socket data in my App state locally
        this.state = {
            livechatSocket: new SocketConnect('livechatSocket')
        }
    }

    componentWillMount() {

        let envReducer = this.props.envReducer
        let chatboxMode = envReducer.chatboxMode

        switch (chatboxMode) {
            case 'CHATBOT':
                this.props.dispatch(setHasChatbotConnect_act(true))
                break

            case 'LIVECHAT':
                this.connectToLivechatSocket()
                this.props.dispatch(usrReqLivechat_act()) // auto set to true, then chatbot set to false
                break

            case 'CHATBOT_LIVECHAT':
                // connect to chatbot
                this.props.dispatch(setHasChatbotConnect_act(true))

                // connect to live chat
                this.connectToLivechatSocket()
                break

            default:
                break
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        // do not update my component if i am validating the user
        return !nextProps.envReducer.validatingUser
    }

    componentWillUnmount() {
        this.disconnectLivechatSocket()
    }

    connectToLivechatSocket = () => {

        // disconnect the previous live chat if exist
        this.disconnectLivechatSocket()

        let envReducer = this.props.envReducer
        let userReducer = this.props.userReducer
        let livechatSocket = this.state.livechatSocket

        // if have livechatId...
        // try to connect with my livechat socket server
        livechatSocket.connectSocket(envReducer.backendUrl + '/lcIO')

        // live chat socket subscribtions
        livechatSocket.subscribe('connect', () => {

            // asking to join room
            livechatSocket.socketEmit('client_join_room', {
                roomId: envReducer.livechatId,
                username: userReducer.username,
                message: userReducer.userproblem,
                attentionLevel: userReducer.requireAttention
            })

            livechatSocket.subscribe('client_joined', (data) => {

                // set the socket id
                livechatSocket.setSocketId(data.socketId)

                // live chat has connected
                this.props.dispatch(setHasLivechatConnect_act(true))

            })

        })

    }

    disconnectLivechatSocket = () => {
        this.state.livechatSocket.disconnectSocket()
    }

    emitUserInfoToLivechatSocket = () => {
        // emit to live chat socket server about this updated username and problem
        this.state.livechatSocket.socketEmit('client_update_info', {
            username: this.props.userReducer.username,
            message: this.props.userReducer.problem
        })
    }

    updateUserInfo = async (username, problem, successCB) => {

        // loading screen start
        this.props.dispatch(setValidatingUser_act(true))

        await this.props.dispatch(setLivechatRequirement_act(username, problem))

        this.emitUserInfoToLivechatSocket()

        successCB()

        // finish loading
        this.props.dispatch(setValidatingUser_act(false))

    }

    render() {

        let envReducer = this.props.envReducer
        let chatboxMode = envReducer.chatboxMode

        switch (chatboxMode) {
            case 'CHATBOT':
                // only chatbot

                break

            case 'LIVECHAT':
                // straight away show the live chat form at the very begining pls

                break

            case 'CHATBOT_LIVECHAT':
                // chatbot first.. then if user want live chat.. then submit messages to live chat people

                break

            default:
                break
        }

        return (
            <Chatbox />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        envReducer: state.envReducer,
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(App)
