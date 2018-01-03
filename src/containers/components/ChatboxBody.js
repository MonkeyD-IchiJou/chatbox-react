import React, { Component } from 'react'
import {Icon, Segment, Comment, Divider, Button, Image } from 'semantic-ui-react'

class ChatboxBody extends Component {

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    scrollToBottom() {
        this.el.scrollTop = this.el.scrollHeight
    }

    render() {
        const allMsgs = this.props.allMsgs
        let renderbody = ''

        if (allMsgs.length > 0) {
            renderbody = allMsgs.map((msg, index) => {

                let dividermah = <Divider />

                if (allMsgs.length-1 === index) {
                    // if it is the last msg, then no need to add Divider
                    dividermah = ''
                }

                if (msg.from === 'user') {
                    return (
                        <Comment key={index}>

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

                            {dividermah}

                        </Comment>
                    )
                }
                else if (msg.from === 'bot') {

                    let msgrender = msg.msg.map((eachmsg, index) => {
                        let msgsplit = eachmsg.split(":")
                        let msgheader = msgsplit[0]

                        // button is number
                        if (!isNaN(msgheader)) {
                            let buttonmsg = msgsplit[1].split('(')
                            let buttonname = buttonmsg[0]
                            let buttonpayload = buttonmsg[1].split(')')[0]
                            return (
                                <Button key={index} onClick={() => { this.props.handleButtonClick(buttonpayload) }} style={{marginTop: '10px'}}>
                                    {buttonname}
                                </Button>
                            )
                        }
                        else {
                            if(msgheader === 'Image') {
                                // check whether is an image or not
                                return (
                                    <Image key={index} src={eachmsg.slice(7)} size='small' style={{ marginTop: '10px' }}/>
                                )
                            }
                            else {
                                // just a normal txt
                                return (<div key={index}>{msgheader}</div>)
                            }
                        }
                    })

                    return (
                        <Comment key={index}>

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

                                <Comment.Text>{msgrender}</Comment.Text>

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
                            {dividermah}

                        </Comment>
                    )
                }
                return ''
            })
        }

        return (
            <div ref={el => { this.el = el }} className="handle" style={{
                maxHeight: this.props.maxHeight,
                minHeight: this.props.minHeight,
                minWidth: '350px',
                overflowY: 'auto',
                borderRadius: '0',
                margin: '0'
            }}>
                <Segment style={{
                    minHeight: this.props.minHeight,
                    minWidth: '350px',
                    borderRadius: '0',
                    margin: '0'
                }}>
                    <Comment.Group minimal>
                        {renderbody}
                    </Comment.Group>
                </Segment>
            </div>
        )
    }
}

export default ChatboxBody
