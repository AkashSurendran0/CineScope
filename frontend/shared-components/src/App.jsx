import React from 'react'
import Navbar from './components/navbar'
import SideBar from './components/sidebar'
import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Navbar/>
      <SideBar/>
    </Provider>
  )
}

export default App
