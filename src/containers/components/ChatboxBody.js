import React, { Component } from 'react'
import LivechatFormBody from './LivechatFormBody'
import {Icon, Segment, Comment } from 'semantic-ui-react'

class ChatboxBody extends Component {

    render() {

        let chatMessageBody = (
            <Comment.Group>

                <Comment>

                    <Comment.Avatar as={Icon} circular inverted color='black' size='big' name='spy' />

                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>

                </Comment>

                <Comment>

                    <Comment.Avatar as={Icon} circular inverted color='teal' size='big' name='user' />

                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>

                </Comment>

                <Comment>

                    <Comment.Avatar as={Icon} circular inverted color='black' size='big' name='spy' />

                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>

                </Comment>

                <Comment>

                    <Comment.Avatar as={Icon} circular inverted color='teal' size='big' name='user' />

                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>

                </Comment>

                <Comment>

                    <Comment.Avatar as={Icon} circular inverted color='black' size='big' name='spy' />

                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>

                </Comment>

                <Comment>

                    <Comment.Avatar as={Icon} circular inverted color='teal' size='big' name='user' />

                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>

                </Comment>

            </Comment.Group>
        )

        let livechatFormBody = (
            <LivechatFormBody />
        )

        let messageBody = this.props.showLiveChatForm ? livechatFormBody : chatMessageBody

        return (
            <Segment style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {messageBody}
            </Segment>
        )
    }
}

export default ChatboxBody
