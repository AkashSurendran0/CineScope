import React from 'react'
import LoginPage from '../pages/loginPage'
import { store } from './store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
      <Provider store={store}>
        <LoginPage/>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}/>
      </Provider>
  )
}

export default App
