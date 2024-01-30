import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./Global.css"
import 'remixicon/fonts/remixicon.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './Context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Context>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      zIndex={999999}
      theme="colored" />
  </Context>
)
