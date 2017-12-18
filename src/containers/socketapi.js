import io from 'socket.io-client'

class SocketConnect {

    constructor(socketName) {
        this.socket = ''
        this.socketName = socketName
    }

    connectSocket(url) {
        this.socket = io(url)
    }

    disconnectSocket() {
        if(this.socket) {
            this.socket.close()
            console.log('disconnect socket')
        }
    }

    subscribe(channelName, callback) {
        if (this.socket) {
            this.socket.on(channelName, callback)
        }
    }

    socketEmit(channelName, data) {
        if (this.socket) { 
            this.socket.emit(channelName, data)
        }
    }

}

export default SocketConnect