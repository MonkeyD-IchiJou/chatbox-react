import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import store from './store'
import { Provider } from 'react-redux'
import defaultEnvStore from './reducers/defaultEnvStore'
import 'semantic-ui-css/semantic.min.css'
import 'babel-polyfill'

window.RenderApp = function (chatbotId, livechatId) {

  defaultEnvStore.chatbotId = chatbotId
  defaultEnvStore.livechatId = livechatId

  if (chatbotId) {
    defaultEnvStore.chatboxMode = 'CHATBOT'
  }
  if (livechatId) {
    defaultEnvStore.chatboxMode = 'LIVECHAT'
  }
  if (chatbotId && livechatId) {
    // if got both chatbot and livechat id.. then default to chatbot mode
    defaultEnvStore.chatboxMode = 'CHATBOT'
  }

  // tmp, delete in production mode pls
  //defaultEnvStore.chatboxMode = 'CHATBOT'
  //defaultEnvStore.chatboxMode = 'LIVECHAT'

  //defaultEnvStore.chatbotId = 'n6Avu8RVGLffnp8ghz8PaavD5R6cYzHWRPbQxh26fpCtdqgps'
  //defaultEnvStore.livechatId = 'QRdCHThaReh4vgQwuqN71LWBopF12ufXRAfcoSvzMGLRM7Cn6'

  new ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}
