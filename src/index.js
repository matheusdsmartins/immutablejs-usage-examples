import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'

const { store } = configureStore()

const renderApp = NextApp => {
  render(
    <Provider store={store}>
      <NextApp />
    </Provider>,
    document.getElementById('root')
  )
}

renderApp(App)

registerServiceWorker()
