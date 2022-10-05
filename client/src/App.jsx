import React from 'react';
import UserState from './context/user/userState'
import TaskState from './context/task/taskState'
import UiState from './context/ui/uiState'
import setAuthToken from './utils/setAxiosHeader';
import MainPage from './pages';


if (localStorage.accessToken) {
  setAuthToken(localStorage.accessToken)
}

export default function App() {

  return (
    <UserState>
      <TaskState>
        <UiState>
          <MainPage />
        </UiState>
      </TaskState>
    </UserState>
  )
}
