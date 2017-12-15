import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.RenderApp = function (chatbotId, livechatId) {
    console.log(chatbotId)
    console.log(livechatId)
    new ReactDOM.render(<App />, document.getElementById('root'));
}
