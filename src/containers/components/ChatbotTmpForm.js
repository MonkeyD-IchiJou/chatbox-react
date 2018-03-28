import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class ChatbotTmpForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  componentDidMount() {
    this.props.sendFormDisable()
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    this.props.sendAcknowledgeMsg(this.props.indexToPop, this.state.email)
    this.setState({
      email: ''
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>

        <Form.Input value={this.state.email} name='email' label='Agency Email' placeholder='Enter agency email address' type='email' required onChange={this.handleChange} />

        <Button type='submit'>Submit</Button>

      </Form>
    )
  }
}

export default ChatbotTmpForm
