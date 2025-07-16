import React from 'react'
import AuthApp from 'authApp/LoginPage'
import HomeApp from 'homeApp/Home'
import AddReviewApp from 'addReviewApp/AddReview'
import YourReview from 'yourReviewApp/YourReview'
import ProfileApp from 'profileApp/Profile'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AuthApp/>}/>
        <Route path='/' element={<HomeApp/>}/>
        <Route path='/addReview' element={<AddReviewApp/>}/>
        <Route path='/yourReviews' element={<YourReview/>}/>
        <Route path='/profile' element={<ProfileApp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
