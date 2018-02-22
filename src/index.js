import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Provider } from 'react-redux'
import store, { history } from './store'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import HttpsRedirect from 'react-https-redirect'

ReactDOM.render(
  <Provider store={store}>
    <HttpsRedirect>
      <Router history={history}>
        <App />
      </Router>
    </HttpsRedirect>
  </Provider>, document.getElementById('root'))

registerServiceWorker()
