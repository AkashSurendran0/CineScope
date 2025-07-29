import React from 'react'
import YourReview from './components/yourReview'
import Store from  'sharedComp/Store'
import {Provider} from 'react-redux'

function App() {
  return (
      <Provider store={Store}>
        <YourReview/>
      </Provider>
  )
}

export default App
