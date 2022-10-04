import React, { useReducer } from 'react'
import axios from 'axios';

import UserContext from './userContext';
import userReducer from './userReducer'
import { LOAD_USER_FAILED, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from './userType';

const userState = props => {
    const initialState = {
        user: null,
        loading: false,
        error: null,
        isLoggedIn: false,
    }
    
    const [state, dispatch] = useReducer(userReducer, initialState);

    async function registerUser(payload) {
        dispatch({type: REGISTER_USER_REQUEST})
        try {
            const { data } = await axios.post('http://localhost:9000/api/users', payload, { headers: { 'Content-Type': 'application/json' } });
            if (data.isSuccessful) {
                dispatch({type: REGISTER_USER_SUCCESS, payload: data})
            } else {
                dispatch({type: REGISTER_USER_FAILED, payload: data})
            }
        } catch (error) {
            dispatch({type: REGISTER_USER_FAILED, payload: error.response ? error.response.data.error : error.message})
        }
    }

    async function loginUser(payload) {
        dispatch({type: LOGIN_USER_REQUEST})
        try {
            const { data } = await axios.post('http://localhost:9000/api/users/login', payload, { headers: { 'Content-Type': 'application/json' } });
            if (data.isSuccessful) {
                dispatch({type: LOGIN_USER_SUCCESS, payload: data})
            } else {
                dispatch({type: LOGIN_USER_FAILED, payload: data})
            }
        } catch (error) {
            dispatch({type: LOGIN_USER_FAILED, payload:  error.response ? error.response.data.error : error.message})
        }
    }

    async function loadUser() {
        dispatch({type: LOAD_USER_REQUEST})
        try {
            const { data } = await axios.get('http://localhost:9000/api/users/profile');
            if (data.isSuccessful) {
                dispatch({type: LOAD_USER_SUCCESS, payload: data})
            } else {
                dispatch({type: LOAD_USER_FAILED, payload: data})
            }
        } catch (error) {
            dispatch({type: LOAD_USER_FAILED, payload:  error.response ? error.response.data.error : error.message})
        }
    }

    return (
        <UserContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            isLoggedIn: state.isLoggedIn,
            registerUser,
            loginUser,
            loadUser,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default userState;