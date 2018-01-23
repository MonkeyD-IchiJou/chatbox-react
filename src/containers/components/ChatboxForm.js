import React, { Component } from 'react'
import { Segment, Form, Button, Input } from 'semantic-ui-react'

class ChatboxForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            msg: '',
            submittedMsg: '',
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { msg } = this.state
        this.setState({ submittedMsg: msg, msg: '' })
        this.props.sendMsg(msg)
    }

    render() {
        const { msg } = this.state
        return (
            <Segment style={{
                borderRadius: '0',
                margin: '0',
                padding: '5px'
            }}>
                <Form onSubmit={this.handleSubmit}>
                    <Input required name='msg' placeholder='Type here...' onChange={this.handleChange} value={msg} disabled={this.props.sendFormDisabled} label={<Button>SEND</Button>} labelPosition='right' fluid/>
                </Form>

            </Segment>
        )
    }
}

export default ChatboxForm
