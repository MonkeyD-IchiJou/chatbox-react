import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class ChatbotTmpForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            submittedusername: '',
            submittedemail: ''
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { username, email } = this.state
        this.setState({
            submittedusername: username,
            submittedemail: email,
            username: '',
            email: ''
        })
        this.props.sendAcknowledgeMsg(this.props.indexToPop)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>

                <Form.Input value={this.state.username} name='username' label='Username' placeholder='Username' required onChange={this.handleChange} />
                <Form.Input value={this.state.email} name='email' label='Email' placeholder='Email' type='email' required onChange={this.handleChange} />

                <Button type='submit'>Submit</Button>

            </Form>
        )
    }
}

export default ChatbotTmpForm
