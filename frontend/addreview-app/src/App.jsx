import React from 'react'
import AddReview from './components/addReview'
import Store from 'sharedComp/Store'
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={Store}>
      <AddReview/>
    </Provider>
  )
}

export default App
