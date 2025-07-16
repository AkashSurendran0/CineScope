import React from 'react'
import Profile from './components/profile'
import Store from 'sharedComp/Store'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    // <BrowserRouter>
      <Provider store={Store}>
        <Profile/>
      </Provider>
    // </BrowserRouter>
  )
}

export default App
