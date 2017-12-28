import React, { Component } from 'react'
import { Segment, Form, Input } from 'semantic-ui-react'

class ChatboxForm extends Component {

    handleSubmit = () => {
        console.log('submit liao')
    }

    render() {
        return (
            <Segment style={{
                borderRadius: '0',
                margin: '0',
                padding: '5px'
            }}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Input
                            size='small'
                            placeholder='Type here...'
                            icon='send'
                        />
                    </Form.Field>
                </Form>
            </Segment>
        )
    }
}

export default ChatboxForm
