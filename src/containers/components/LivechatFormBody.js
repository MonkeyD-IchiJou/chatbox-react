import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class LivechatFormBody extends Component {

    handleSubmit = () => {
        console.log('submit liao')
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>

                <Form.Input label='Username' placeholder='Username' />
                <Form.Input label='Email' placeholder='Email' />
                <Form.TextArea label='Message' placeholder='Tell us more about you...' />

                <Button type='submit'>Submit</Button>

            </Form>
        )
    }
}

export default LivechatFormBody
