import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

class App extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                this is my chatbox pls.. the other one is fake af
                <Button>
                    touch
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        envReducer: state.envReducer,
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(App)
