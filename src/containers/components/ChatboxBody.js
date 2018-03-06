import React, { Component } from 'react'
import { Icon, Segment, Comment, Divider, Image, Dimmer, Loader, List } from 'semantic-ui-react'
import LivechatFormBody from './LivechatFormBody'
import ChatbotTmpForm from './ChatbotTmpForm'

class ChatboxBody extends Component {

  constructor(props) {
    super(props)
    this.state={
      feedbackList: new Map(),
      actionsThumbsup: new Map(),
      actionsThumbsdown: new Map()
    }
  }

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
    const {
      allMsgs,
      backendUrl,
      handleButtonClick,
      sendAcknowledgeMsg,
      chatboxMode,
      sendFormDisabled,
      showLiveChatForm,
      setUserInfo,
      maxHeight,
      minHeight,
      maxWidth
    } = this.props

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

    botAvatar = (<Comment.Avatar as={Image} src={backendUrl + '/viewfile/avatarpic.png'} size='large' />)

    let allMsgsRender = ''

    if (allMsgs.length > 0) {
      allMsgsRender = allMsgs.map((msg, index) => {

        let dividermah = <Divider />

        if (allMsgs.length - 1 === index) {
          // if it is the last msg, then no need to add Divider
          dividermah = ''
        }

        if (msg.from) {
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

                  <Comment.Text><div className="cancelpls">{msg.msg}</div></Comment.Text>

                </Comment.Content>

                {dividermah}

              </Comment>
            )
          }
          else if (msg.from === 'bot') {

            let parsedmsg = JSON.parse(msg.msg)
            let msgrender = ''

            if (Array.isArray(parsedmsg)) {

              msgrender = parsedmsg.map((eachmsg, mindex) => {

                switch (eachmsg.type) {
                  case 'TEXT':
                    return (<div className="cancelpls" key={mindex}>{eachmsg.text}</div>)

                  case 'LINK':
                    return (<div className="cancelpls" key={mindex}><a href={eachmsg.link} target="_blank">{eachmsg.link}</a></div>)

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
                    return (<div className="cancelpls" key={mindex}><ChatbotTmpForm sendAcknowledgeMsg={sendAcknowledgeMsg} indexToPop={index} sendFormDisable={this.sendFormDisable} /></div>)

                  default:
                    return (<div key={mindex}></div>)

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

            // keep track of clients' feedbacks
            const { feedbackList, actionsThumbsup, actionsThumbsdown } = this.state
            const da_actionName = msg.actionName

            // default thumbs up and down ui
            let thumbsupAction = (
              <Comment.Action>
                <div className="cancelpls" onClick={() => {
                  this.setState({
                    feedbackList: feedbackList.set(da_actionName, 'UP'),
                    actionsThumbsup: actionsThumbsup.set(da_actionName, 1),
                    actionsThumbsdown: actionsThumbsdown.set(da_actionName, 0)
                  })
                }}>
                  <Icon name='thumbs outline up' />{0}
              </div>
              </Comment.Action>
            )
            let thumbsdownAction = (
              <Comment.Action>
                <div className="cancelpls" onClick={() => {
                  this.setState({
                    feedbackList: feedbackList.set(da_actionName, 'DOWN'),
                    actionsThumbsup: actionsThumbsup.set(da_actionName, 0),
                    actionsThumbsdown: actionsThumbsdown.set(da_actionName, 1)
                  })
                }}>
                  <Icon name='thumbs outline down' />{0}
              </div>
              </Comment.Action>
            )

            // update the ui if client alr have update feedback
            for (var [key, value] of feedbackList) {
              if (key === da_actionName) {
                switch (value) {
                  case "UP":
                    thumbsupAction = (
                      <Comment.Action active={true}>
                        <div className="cancelpls" onClick={() => {
                          this.setState({
                            feedbackList: feedbackList.set(da_actionName, 'NO'),
                            actionsThumbsup: actionsThumbsup.set(da_actionName, 0)
                          })
                        }}>
                          <Icon name='thumbs up' />{1}
                        </div>
                      </Comment.Action>
                    )
                    break

                  case "DOWN":
                    thumbsdownAction = (
                      <Comment.Action active={true} style={{ color: 'red' }}>
                        <div className="cancelpls" onClick={() => {
                          this.setState({
                            feedbackList: feedbackList.set(da_actionName, 'NO'),
                            actionsThumbsdown: actionsThumbsdown.set(da_actionName, 0)
                          })
                        }}>
                          <Icon name='thumbs down' />{1}
                        </div>
                    </Comment.Action>
                    )
                    break

                  default:
                    break
                }
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

                  <Comment.Actions>
                    {thumbsupAction}
                    {thumbsdownAction}
                  </Comment.Actions>

                </Comment.Content>

                {dividermah}

              </Comment>
            )
          }
          else {
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

                  <Comment.Author as={'a'}>{msg.from}</Comment.Author>

                  <Comment.Metadata>
                    <div>Today at {msg.msgtime}</div>
                  </Comment.Metadata>

                  <Comment.Text>{msg.msg}</Comment.Text>

                </Comment.Content>
                {dividermah}

              </Comment>
            )
          }
        }

        return ''

      })

    }

    renderbody = (
      <Comment.Group>
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
