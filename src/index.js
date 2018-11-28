import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'

// Components
import App from './App'
import routes from './routes'

const history = createHistory()

export const WrappedApp = (
  <Router history={history}>
    <App routes={routes} />
  </Router>
)

export const init = el => {
  if (el) {
    ReactDOM.render(WrappedApp, el)
  }
}

init(document.getElementById('root'))
