import React, { Component } from 'react'
import ChatboxBody from './ChatboxBody'
import ChatboxForm from './ChatboxForm'
import { Accordion, Icon, Responsive } from 'semantic-ui-react'

class Chatbox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            headerCollapse: false,
            windowHeight: window.innerHeight - 78
        }
    }

    handleHeaderClick = (e, titleProps) => {
        let result = !this.state.headerCollapse
        this.setState({ headerCollapse: result })
    }

    handleResponsive = () => {
        this.setState({ windowHeight: window.innerHeight - 78 })
    }

    render() {
        let headerStyle = ''
        let headerCollapse = this.state.headerCollapse
        let defaultBoxStyle = {
            position: 'fixed',
            bottom: '0',
            right: '0',
            paddingRight: '15px'
        }
        let mobileBoxStyle = {}

        if (headerCollapse) {
            headerStyle = (
                <div style={{
                    marginRight: '30px',
                    marginLeft: '20px'
                }}>
                    < Icon name='comments' size='large' style={{ paddingRight: '30px', paddingBottom: '25px'}} />
                    We're Online!
                </div>
            )

            // when collapse header in mobile, turn it back to desktop verion
            mobileBoxStyle = defaultBoxStyle
        }
        else {
            headerStyle = (
                <div style={{ 
                    textAlign: 'center',
                    marginRight: '10px'
                }}>
                    Live 24/7
                    < Icon name='minus' style={{ float: 'right' }} />
                </div>
            )

            // mobile chatbox is abit different when open
            mobileBoxStyle = {
                position: 'fixed',
                left: '0',
                bottom: '0',
                width: '100%',
                margin: 'auto'
            }
        }

        return (
            <div style={{ margin: '0 0 1000px' }}>

                <Responsive as={'div'} minWidth={767} maxWidth={2559}>
                    <div style={defaultBoxStyle}>

                        <Accordion fluid inverted={true}>

                            <Accordion.Title
                                active={!headerCollapse}
                                onClick={this.handleHeaderClick}
                                style={{
                                    backgroundColor: 'black',
                                    paddingBottom: '5px',
                                    paddingTop: '7px',
                                    borderRadius: '7px 7px 0 0'
                                }}
                            >
                                {headerStyle}
                            </Accordion.Title>

                            <Accordion.Content
                                active={!headerCollapse}
                                style={{
                                    padding: '0px'
                                }}
                            >
                                <ChatboxBody minHeight={'400px'} maxHeight={'400px'}/>
                                <ChatboxForm />
                            </Accordion.Content>

                        </Accordion>

                    </div>
                </Responsive>

                <Responsive as={'div'} {...Responsive.onlyMobile} onUpdate={this.handleResponsive}>
                    <div style={mobileBoxStyle}>

                        <Accordion fluid inverted={true}>

                            <Accordion.Title
                                active={!headerCollapse}
                                onClick={this.handleHeaderClick}
                                style={{
                                    backgroundColor: 'black',
                                    paddingBottom: '5px',
                                    paddingTop: '7px'
                                }}
                            >
                                {headerStyle}
                            </Accordion.Title>

                            <Accordion.Content
                                active={!headerCollapse}
                                style={{
                                    padding: '0px'
                                }}
                            >
                                <ChatboxBody 
                                    maxHeight={'0px'}
                                    minHeight={this.state.windowHeight.toString() + 'px'}
                                />
                                <ChatboxForm />
                            </Accordion.Content>

                        </Accordion>

                    </div>
                </Responsive>

            </div>
        )
    }
}

export default Chatbox
