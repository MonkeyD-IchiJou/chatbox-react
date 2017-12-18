import React, { Component } from 'react'
import { connect } from 'react-redux'
import SocketConnect from './socketapi'
import { setUser_act } from './actions/userActions'
import Chatbox from './components/Chatbox'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            livechatSocket: new SocketConnect('livechatSocket')
        }

        // need to get the username and email first, before i can connect to live chat
        this.props.dispatch(setUser_act('ichijou', 'ichijou8282@gmail.com', 1, 'some problem pls'))

    }

    connectToLivechatSocket = () => {

        // disconnect the previous live chat if exist
        this.disconnectLivechatSocket()

        let envReducer = this.props.envReducer
        let userReducer = this.props.userReducer

        let livechatSocket = this.state.livechatSocket
        let livechatId = envReducer.livechatId
        let username = userReducer.username
        let userproblem = userReducer.problem
        let attentionLevel = userReducer.requireAttention

        // need to have livechatId, username and userproblem.. then can connect to my server
        if (livechatId && username && userproblem) {
            // if have livechatId...
            // try to connect with my livechat socket server
            livechatSocket.connectSocket(envReducer.backendUrl + '/lcIO')

            // live chat socket subscribtions
            livechatSocket.subscribe('connect', () => {

                // asking to join room
                livechatSocket.socketEmit('client_join_room', {
                    roomId: livechatId,
                    username: username,
                    message: userproblem,
                    attentionLevel: attentionLevel
                })

                livechatSocket.subscribe('client_joined', (data) => {
                    livechatSocket.setSocketId(data.socketId)
                    console.log(livechatSocket.getSocketId())
                })

            })
        }

        
    }

    disconnectLivechatSocket = () => {
        this.state.livechatSocket.disconnectSocket()
    }

    componentWillUnmount() {
        this.disconnectLivechatSocket()
    }

    render() {
        return (
            <div>
                <Chatbox connectToLivechatSocket={this.connectToLivechatSocket}/>
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
