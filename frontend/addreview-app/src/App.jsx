import React from 'react'
import AddReview from './components/addReview'
import Store from 'sharedComp/Store'
import {Provider} from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Provider store={Store}>
      <AddReview/>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}/>
    </Provider>
  )
}

export default App
