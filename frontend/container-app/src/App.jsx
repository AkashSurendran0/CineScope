import React from 'react'
import AuthApp from 'authApp/LoginPage'
import HomeApp from 'homeApp/Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AuthApp/>}/>
        <Route path='/' element={<HomeApp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
