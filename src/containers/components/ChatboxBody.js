import React, { Component } from 'react'
import { Icon, Segment, Comment, Divider, Image, Dimmer, Loader, List } from 'semantic-ui-react'
import LivechatFormBody from './LivechatFormBody'
import ChatbotTmpForm from './ChatbotTmpForm'

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

    sendFormDisable = () => {
        this.props.sendFormDisableMah(true)
    }

    render() {
        const { allMsgs, backendUrl, handleButtonClick, sendAcknowledgeMsg, chatboxMode, sendFormDisabled, showLiveChatForm, setUserInfo, maxHeight, minHeight, maxWidth } = this.props

        let renderbody = ''

        let botAvatar = (
            <Comment.Avatar
                as={Icon}
                inverted
                color='black'
                size='large'
                name='spy'
            />
        )

        botAvatar = (<Comment.Avatar as={Image} src={backendUrl + '/viewfile/avatarpic.png'} size='large'/>)

        let allMsgsRender = ''

        if (allMsgs.length > 0) {
            allMsgsRender = allMsgs.map((msg, index) => {

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
                                size='large'
                                name='user'
                            />

                            <Comment.Content>

                                <Comment.Author as={'a'}>User</Comment.Author>

                                <Comment.Metadata>
                                    <div>Today at {msg.msgtime}</div>
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

                    let parsedmsg = JSON.parse(msg.msg)
                    let msgrender = ''

                    if (Array.isArray(parsedmsg)) {

                        msgrender = parsedmsg.map((eachmsg, mindex)=>{

                            switch (eachmsg.type) {
                                case 'TEXT':
                                    return (<div key={mindex}>{eachmsg.text}</div>)

                                case 'IMG':
                                    let imageUrl = eachmsg.image
                                    if (imageUrl.indexOf("http://") === 0 || imageUrl.indexOf("https://") === 0) {
                                    }
                                    else {
                                        imageUrl = backendUrl + '/viewfile/' + imageUrl
                                    }

                                    return (
                                        <Image key={mindex} src={imageUrl} size='small' style={{ marginTop: '10px', width: 'auto' }} />
                                    )

                                case 'QR':
                                    return (
                                        <List key={mindex} bulleted>
                                            {eachmsg.buttons.map((button, bi) => {
                                                return (
                                                    <List.Item as='a' key={bi} onClick={() => { handleButtonClick(button.payload) }} style={{ marginTop: '10px' }}>
                                                        {button.text}
                                                    </List.Item>
                                                )
                                            })}
                                        </List>
                                    )

                                case 'TMP':
                                    return (<div className="cancelpls" key={mindex}><ChatbotTmpForm sendAcknowledgeMsg={sendAcknowledgeMsg} indexToPop={index} sendFormDisable={this.sendFormDisable}/></div>)

                                default:
                                    return (<div key={mindex}>adsf</div>)

                            }
                        })

                    }
                    else {
                        switch (parsedmsg.type) {
                            case 'TEXT':
                                msgrender = parsedmsg.text
                                break

                            default:
                                break
                        }
                    }

                    return (
                        <Comment key={index}>

                            {botAvatar}

                            <Comment.Content>

                                <Comment.Author as={'a'}>Chatbot</Comment.Author>

                                <Comment.Metadata>
                                    <div>Today at {msg.msgtime}</div>
                                </Comment.Metadata>

                                <Comment.Text>{msgrender}</Comment.Text>

                            </Comment.Content>
                            {dividermah}

                        </Comment>
                    )
                }

                
                return ''
            })
        }

        renderbody = (
            <Comment.Group minimal>
                {allMsgsRender}
            </Comment.Group>
        )


        if (chatboxMode === 'LIVECHAT') {
            if (showLiveChatForm) {
                // if request to show livechat form
                renderbody = (
                    <div className="cancelpls">
                        <LivechatFormBody setUserInfo={setUserInfo} />
                    </div>
                )
            }
            else if (sendFormDisabled) {
                // if form is disabled
                renderbody = (
                    <Dimmer active inverted>
                        <Loader inverted>Searching for a live agent</Loader>
                    </Dimmer>
                )
            }
        }

        return (
            <div ref={el => { this.el = el }} className="handle" style={{
                maxHeight: maxHeight,
                minHeight: minHeight,
                minWidth: '350px',
                maxWidth: maxWidth,
                overflowY: 'auto',
                borderRadius: '0',
                margin: '0'
            }}>
                <Segment style={{
                    minHeight: minHeight,
                    minWidth: '350px',
                    maxWidth: maxWidth,
                    borderRadius: '0',
                    margin: '0'
                }}>
                    {renderbody}
                </Segment>
            </div>
        )
    }
}

export default ChatboxBody
