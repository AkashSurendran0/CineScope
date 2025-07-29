import React from 'react';
import AuthApp from 'authApp/LoginPage';
import HomeApp from 'homeApp/Home';
import AddReviewApp from 'addReviewApp/AddReview';
import YourReview from 'yourReviewApp/YourReview';
import ProfileApp from 'profileApp/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RedirectToHome, RedirectToLogin } from './authenticator';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectToHome>
              <AuthApp />
            </RedirectToHome>
          }
        />
        <Route
          path="/"
          element={
            <RedirectToLogin>
              <HomeApp />
            </RedirectToLogin>
          }
        />
        <Route
          path="/addReview"
          element={
            <RedirectToLogin>
              <AddReviewApp />
            </RedirectToLogin>
          }
        />
        <Route
          path="/yourReviews"
          element={
            <RedirectToLogin>
              <YourReview />
            </RedirectToLogin>
          }
        />
        <Route
          path="/profile"
          element={
            <RedirectToLogin>
              <ProfileApp />
            </RedirectToLogin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
