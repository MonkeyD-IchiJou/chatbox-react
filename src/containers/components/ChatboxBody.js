import React, { Component } from 'react'
import {Icon, Segment, Comment, Divider } from 'semantic-ui-react'

class ChatboxBody extends Component {

    render() {
        const allMsgs = this.props.allMsgs
        let renderbody = ''
        if (allMsgs.length > 0) {
            let ii = 0
            renderbody = allMsgs.map((msg) => {
                ii++
                if (msg.from === 'user') {
                    return (
                        <Comment key={ii}>

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

                                <Comment.Text>{msg.msg}</Comment.Text>

                                <Comment.Actions>
                                    <Comment.Action style={{ margin: '0' }}>
                                        <Icon name='hide' size='large' />
                                    </Comment.Action>
                                </Comment.Actions>

                            </Comment.Content>

                            <Divider />

                        </Comment>
                    )
                }
                else if (msg.from === 'bot') {
                    return (
                        <Comment key={ii}>

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

                                <Comment.Text>{msg.msg[0]}</Comment.Text>

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
                            <Divider />

                        </Comment>
                    )
                }
                return ''
            })
        }

        return (
            <Segment className="handle" style={{ 
                maxHeight: this.props.maxHeight,
                minHeight: this.props.minHeight,
                minWidth: '350px',
                overflowY: 'auto',
                borderRadius: '0',
                margin: '0'
            }}>
                <Comment.Group minimal>
                    {renderbody}
                </Comment.Group>
            </Segment>
        )
    }
}

export default ChatboxBody
