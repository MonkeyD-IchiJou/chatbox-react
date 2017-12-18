import React, { Component } from 'react'
import { connect } from 'react-redux'
import SocketConnect from './socketapi'
import Chatbox from './components/Chatbox'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            livechatSocket: new SocketConnect('livechatSocket')
        }

        let livechatSocket = this.state.livechatSocket
        let livechatId = this.props.envReducer.livechatId

        // if have livechatId...
        // try to connect with my livechat socket server
        livechatSocket.connectSocket(this.props.envReducer.backendUrl + '/lcIO')

        // live chat socket subscribtions
        livechatSocket.subscribe('connect', () => {

            // asking to join room
            livechatSocket.socketEmit('client_join_room', {
                roomId: livechatId,
                username: 'username',
                message: 'message',
                attentionLevel: 1
            })

            livechatSocket.subscribe('client_joined', (data) => {
                //socketId = data.socketId
                console.log(data.socketId)
            })

        })

    }

    componentWillUnmount() {
        this.state.livechatSocket.disconnectSocket()
    }

    render() {
        return (
            <div>
                <Chatbox />
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
