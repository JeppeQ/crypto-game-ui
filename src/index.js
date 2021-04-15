import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/fonts/AstroSpace.ttf'
import './index.scss'
import errorHandler from './helpers/errorHandler'

window.addEventListener('DOMContentLoaded', function () {
  errorHandler.start()
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);