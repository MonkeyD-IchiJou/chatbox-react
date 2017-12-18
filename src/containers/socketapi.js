import io from 'socket.io-client'

class SocketConnect {

    constructor(socketName) {
        this.socket = ''
        this.socketName = socketName
        this.socketId = ''
    }

    connectSocket(url) {
        this.socket = io(url)
    }

    disconnectSocket() {
        if(this.socket) {
            this.socket.close()
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

    setSocketId(sid) {
        this.socketId = sid
    }

    getSocketId() {
        return this.socketId
    }

}

export default SocketConnect