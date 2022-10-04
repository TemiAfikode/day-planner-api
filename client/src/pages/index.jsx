import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute, { ReversedRoute } from '../components/protectedRoute'
import userContext from '../context/user/userContext'
import LandingPage from './landing-page'
import LoginPage from './login'
import ProfilePage from './profile'
import RegisterPage from './register'

export default function MainPage() {
    const { validToken } = useContext(userContext)
    return (
      <Router>
        <Routes >
            <Route index element={<LandingPage />} />
            <Route element={<ProtectedRoute token={validToken} />}>
                <Route path='dashboard' element={<ProfilePage />} />
            </Route>
                
            <Route element={<ReversedRoute token={validToken} />}>
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
            </Route>
                
        </Routes>
      </Router>
  
  )
}
