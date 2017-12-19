import React, { Component } from 'react'
import { Form, Input } from 'semantic-ui-react'

class ChatboxForm extends Component {

    handleSubmit = () => {
        console.log('submit liao')
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <Input
                        placeholder='Type here...'
                        size='big'
                        action={{ color: 'black', content: 'SEND' }}
                    />
                </Form.Field>
            </Form>
        )
    }
}

export default ChatboxForm
