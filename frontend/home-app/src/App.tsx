import React from 'react'
import Home from './components/home'
import Store from 'sharedComp/Store'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
      <Provider store={Store}>
        <Home/>
      </Provider>
  )
}

export default App
