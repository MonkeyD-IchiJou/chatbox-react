import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'

class LivechatFormBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            problem: '',
            submittedusername: '',
            submittedemail: '',
            submittedproblem: '',
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { username, email, problem } = this.state
        this.setState({
            submittedusername: username,
            submittedemail: email,
            submittedproblem: problem
        })
        this.props.setUserInfo(username, email, problem)
    }

    render() {
        return (
            <div>
                <Message
                    warning
                    header='Connecting to our Livechat agent...'
                    content="Before that, please help us to fill up the form below"
                />
                <Form onSubmit={this.handleSubmit}>

                    <Form.Input name='username' label='Username' placeholder='Username' required onChange={this.handleChange}/>
                    <Form.Input name='email' label='Email' placeholder='Email' type='email' required onChange={this.handleChange}/>
                    <Form.TextArea name='problem' label='Message' placeholder='What is the problem that you are facing' required onChange={this.handleChange}/>

                    <Button type='submit'>Submit</Button>

                </Form>
            </div>
        )
    }
}

export default LivechatFormBody
