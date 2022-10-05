import { is } from 'date-fns/locale'
import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import taskContext from '../context/task/taskContext'
import userContext from '../context/user/userContext'
import Dashboard from './dashboard'
import LandingPage from './landing-page'
import LoginPage from './login'
import RegisterPage from './register'

export default function MainPage() {
  const { loadUser, user, loading, isLoggedOut } = useContext(userContext)
  const { clearTasks } = useContext(taskContext)
  useEffect(() => {
    if (!user) {
      loadUser()
    }
  }, [])
  useEffect(() => {
    if (isLoggedOut) {
      clearTasks()
    }
  }, [isLoggedOut])

  if (loading) return null;

    const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/dashboard',
      element: user || localStorage.accessToken ? <Dashboard /> : <Navigate to="/" replace />
    },
    {
      path: '/login',
      element: user || localStorage.accessToken ? <Navigate to="/dashboard" replace /> : <LoginPage />
    },
    {
      path: '/register',
      element:  user || localStorage.accessToken ? <Navigate to="/dashboard" replace /> : <RegisterPage />
    },

  ]
);
  
    return (
      <RouterProvider router={router} />
  )
}
