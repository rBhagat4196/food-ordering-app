import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import {AnimatePresence} from "framer-motion"
import { Provider } from 'react-redux';
import store from './redux/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AnimatePresence>
      <Provider store={store}>
    <App />
      </Provider>
    </AnimatePresence>
    </BrowserRouter>
  </React.StrictMode>,
)
