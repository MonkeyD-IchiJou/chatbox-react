import React, { Component } from 'react'
import { connect } from 'react-redux'
import SocketConnect from './socketapi'
/*import {
    usrReqChatbot_act,
    usrReqLivechat_act
} from './actions/userActions'
import {
    setAppLoading_act
} from './actions/envActions'*/

class App extends Component {

    constructor(props) {
        super(props)

        // storing socket data in my App state locally
        this.state = {
            chatbotSocket: new SocketConnect('chatbotSocket'),
            livechatSocket: new SocketConnect('livechatSocket')
        }
    }

    componentDidMount() {

        let envReducer = this.props.envReducer
        let chatboxMode = envReducer.chatboxMode

        switch (chatboxMode) {
            case 'CHATBOT':
                // chatbot only, connect to my chatbot socket server pls
                this.connectChatbotSocket()
                break

            case 'LIVECHAT':
                break

            case 'CHATBOT_LIVECHAT':
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
    }

    connectChatbotSocket = () => {
        let envReducer = this.props.envReducer
        let chatbotSocket = this.state.chatbotSocket

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
            })
        })
    }

    emitMsgToChatbot = (msg) => {
        let chatbotSocket = this.state.chatbotSocket

        if (chatbotSocket.socket.connected) {
            // if connected to my socket server and joined the room liao
            chatbotSocket.socketEmit('client_send_chatbot', {
                msg: msg
            })
            // update ui component
        }
    }

    disconnectChatbotSocket = () => {
        
    }

    connectToLivechatSocket = () => {

        // disconnect the previous live chat if exist
        /*this.disconnectLivechatSocket()

        let envReducer = this.props.envReducer
        let userReducer = this.props.userReducer
        let livechatSocket = this.state.livechatSocket

        // if have livechatId...
        // try to connect with my livechat socket server
        livechatSocket.connectSocket(envReducer.backendUrl + '/lcIO')

        // live chat socket subscribtions
        livechatSocket.subscribe('connect', () => {

            console.log('adfasf')

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

        })*/

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
        /*this.props.dispatch(setValidatingUser_act(true))

        await this.props.dispatch(setLivechatRequirement_act(username, problem))

        this.emitUserInfoToLivechatSocket()

        successCB()

        // finish loading
        this.props.dispatch(setValidatingUser_act(false))*/

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
            <div>
                hey there
                <button onClick={()=>{this.emitMsgToChatbot('hello??')}} />
            </div>
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
