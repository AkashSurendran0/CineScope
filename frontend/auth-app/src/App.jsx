import React from 'react'
import LoginPage from '../pages/loginPage'
import { store } from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <LoginPage/>
    </Provider>
  )
}

export default App
