import React from 'react';
import ProfilePage from './pages/profile';
import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import LandingPage from './pages/landing-page';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import UserState from './context/user/userState'
import TaskState from './context/task/taskState'
import UiState from './context/ui/uiState'
import setAuthToken from './utils/setAxiosHeader';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/dashboard',
      element: <ProfilePage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    },

  ]
);

if (localStorage.accessToken) {
  setAuthToken(localStorage.accessToken)
}

export default function App() {
  return (
    <UserState>
      <TaskState>
        <UiState>
          <RouterProvider router={router} />
        </UiState>
      </TaskState>
    </UserState>
  )
}
