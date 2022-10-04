import { LOAD_USER_FAILED, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from './userType';

export default function (state, action) {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('accessToken', action.payload.token)
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                user: action.payload
            }
        case REGISTER_USER_FAILED:
        case LOGIN_USER_FAILED:
        case LOAD_USER_FAILED:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                error: action.payload
            }
     case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                user: action.payload
            }
        default:
            return state;
    }
}