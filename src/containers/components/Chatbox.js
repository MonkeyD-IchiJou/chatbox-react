import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class Chatbox extends Component {
    render() {
        return (
            <div>
                this is my chatbox pls.. the other one is fake af
                <Button onClick={() => { this.props.connectToLivechatSocket()}}>
                    connecttolivechat
                </Button>
            </div>
        )
    }
}

export default Chatbox
