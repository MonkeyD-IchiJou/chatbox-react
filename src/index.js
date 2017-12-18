import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import store from './store'
import { Provider } from 'react-redux'

window.RenderApp = function (chatbotId, livechatId) {

    console.log(chatbotId)
    console.log(livechatId)

    new ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}
