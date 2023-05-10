import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from './components/ToastContainer'
import App from './App'

import { GlobalStyle } from './styles/global'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.Fragment>
    <GlobalStyle />
    <ToastContainer />
    <App />
  </React.Fragment>
)
