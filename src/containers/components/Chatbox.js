import React, { Component } from 'react'
import ChatboxBody from './ChatboxBody'
import ChatboxForm from './ChatboxForm'
import { Accordion, Icon } from 'semantic-ui-react'

class Chatbox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            headerCollapse: true
        }
    }

    handleHeaderClick = (e, titleProps) => {
        let result = !this.state.headerCollapse
        this.setState({ headerCollapse: result })
    }

    render() {
        return (
            <div style={{
                width: '60%',
                margin: '0 auto',
                marginTop: '15px'
            }}>
                <Accordion fluid styled inverted={true}>

                    <Accordion.Title
                        active={this.state.headerCollapse}
                        onClick={this.handleHeaderClick}
                        style={{ backgroundColor: 'black' }}
                    >
                        Chatting with Matt
                        <Icon name='dropdown' style={{ float: 'right' }} />
                    </Accordion.Title>

                    <Accordion.Content active={this.state.headerCollapse}>

                        <ChatboxBody />
                        <ChatboxForm />

                    </Accordion.Content>

                </Accordion>
            </div>
        )
    }
}

export default Chatbox
