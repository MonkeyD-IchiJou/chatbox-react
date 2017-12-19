import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import store from './store'
import { Provider } from 'react-redux'
import defaultEnvStore from './reducers/defaultEnvStore'
import 'semantic-ui-css/semantic.min.css'

window.RenderApp = function (chatbotId, livechatId) {

    defaultEnvStore.chatbotId = chatbotId
    defaultEnvStore.livechatId = livechatId

    if (chatbotId) {
        defaultEnvStore.chatboxMode = 'CHATBOT'
    }
    if(livechatId) {
        defaultEnvStore.chatboxMode = 'LIVECHAT'
    }
    if(chatbotId && livechatId) {
        defaultEnvStore.chatboxMode = 'CHATBOT_LIVECHAT'
    }

    new ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    )
}
