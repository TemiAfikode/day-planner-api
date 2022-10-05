import React, { useReducer } from 'react'
import axios from 'axios';

import UserContext from './userContext';
import userReducer from './userReducer'
import {  LOAD_USER_SUCCESS, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS, REGISTER_USER_SUCCESS, USER_FAILED, USER_REQUEST } from './userType';
import axiosRequest from '../../utils/axiosRequest';
import setAuthToken from '../../utils/setAxiosHeader';
import { CLEAR_TASKS, GET_USER_TASKS_SUCCESS } from '../task/taskType';

const userState = props => {
    const initialState = {
        user: null,
        loading: false,
        error: null,
        isLoggedIn: false,
        isLoggedOut: false,
    }
    
    const [state, dispatch] = useReducer(userReducer, initialState);

    async function registerUser(payload) {
        dispatch({type: USER_REQUEST})
        try {
            const { data } = await axiosRequest.post('/users', payload);
            if (data.isSuccessful) {
                setAuthToken(data.token)
                dispatch({type: REGISTER_USER_SUCCESS, payload: data})
            } else {
                dispatch({type: USER_FAILED, payload: data})
            }
        } catch (error) {
            dispatch({type: USER_FAILED, payload: error.response ? error.response.data.error : error.message})
        }
    }

    async function loginUser(payload) {
        dispatch({type: USER_REQUEST})
        try {
            const { data } = await axiosRequest.post('/users/login', payload);
            if (data.isSuccessful) {
                setAuthToken(data.token)
                dispatch({type: LOGIN_USER_SUCCESS, payload: data})
            } else {
                dispatch({type: USER_FAILED, payload: data})
            }
        } catch (error) {
            dispatch({type: USER_FAILED, payload:  error.response ? error.response.data.error : error.message})
        }
    }

    async function loadUser() {
        setAuthToken(localStorage.accessToken)
        dispatch({type: USER_REQUEST})
        try {
            const { data } = await axiosRequest.get('/users/profile');
            if (data.isSuccessful) {
                dispatch({type: LOAD_USER_SUCCESS, payload: data})
            } else {
                dispatch({type: USER_FAILED, payload: data})
            }
        } catch (error) {
            dispatch({type: USER_FAILED, payload:  error.response ? error.response.data.error : error.message})
        }
    }

    async function logoutUser() {
        dispatch({type: USER_REQUEST})
        try {
            const { data } = await axiosRequest.get('/users/logout');
            if (data.isSuccessful) {
                dispatch({ type: CLEAR_TASKS })
                dispatch({ type: LOGOUT_USER_SUCCESS })
            } else {
                dispatch({type: USER_FAILED, payload: data})
            }
        } catch (error) {
            dispatch({type: USER_FAILED, payload:  error.response ? error.response.data.error : error.message})
        }
    }

    return (
        <UserContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            isLoggedIn: state.isLoggedIn,
            isLoggedOut: state.isLoggedOut,
            registerUser,
            loginUser,
            loadUser,
            logoutUser,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default userState;