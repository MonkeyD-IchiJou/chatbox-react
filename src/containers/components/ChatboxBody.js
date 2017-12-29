import React, { Component } from 'react'
import {Icon, Segment, Comment, Divider } from 'semantic-ui-react'

class ChatboxBody extends Component {

    render() {

        let botTxtMsg = (
            <Comment >

                <Comment.Avatar
                    as={Icon}
                    inverted
                    color='black'
                    size='large'
                    name='spy'
                />

                <Comment.Content>

                    <Comment.Author as={'a'}>Matt</Comment.Author>

                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>

                    <Comment.Text>How artistic!</Comment.Text>

                    <Comment.Actions>
                        <Comment.Action style={{ margin: '0' }}>
                            <Icon name='smile' size='large' />
                        </Comment.Action>
                        <Comment.Action style={{ margin: '0' }}>
                            <Icon name='meh' size='large' />
                        </Comment.Action>
                        <Comment.Action style={{ margin: '0' }}>
                            <Icon name='frown' size='large' />
                        </Comment.Action>
                    </Comment.Actions>

                </Comment.Content>

            </Comment>
        )

        let userTxtMsg = (
            <Comment>

                <Comment.Avatar
                    as={Icon}
                    color='teal'
                    size='large'
                    name='user'
                />

                <Comment.Content>

                    <Comment.Author as={'a'}>User</Comment.Author>

                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>

                    <Comment.Text>Dude this is awesome</Comment.Text>

                    <Comment.Actions>
                        <Comment.Action style={{ margin: '0' }}>
                            <Icon name='hide' size='large' />
                        </Comment.Action>
                    </Comment.Actions>

                </Comment.Content>

            </Comment>
        )

        let chatMessageBody = (
            <Comment.Group minimal>
                {botTxtMsg}
                <Divider />
                {userTxtMsg}
                <Divider />
                {botTxtMsg}
                <Divider />
                {userTxtMsg}
                <Divider />
                {botTxtMsg}
                <Divider />
                {userTxtMsg}
                <Divider />
                {botTxtMsg}
            </Comment.Group>
        )

        let messageBody = chatMessageBody

        return (
            <Segment className="handle" style={{ 
                maxHeight: this.props.maxHeight,
                minHeight: this.props.minHeight,
                minWidth: '350px',
                overflowY: 'auto',
                borderRadius: '0',
                margin: '0'
            }}>
                {messageBody}
            </Segment>
        )
    }
}

export default ChatboxBody
