
import {  CLEAR_TASKS, CREATE_TASK_SUCCESS, GET_USER_TASKS_SUCCESS, TASK_FAILED, TASK_REQUEST, UPDATE_TASK_SUCCESS } from './taskType';

export default function (state, action) {
        switch (action.type) {
        case TASK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_USER_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.payload.data
            }
            case TASK_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            case UPDATE_TASK_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    tasks: state.tasks.map(task => {
                        if (task._id === action.payload.data._id) {
                            return action.payload.data
                        } else {
                            return task
                        }
                    })
                }
            case CREATE_TASK_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    tasks: [action.payload.data, ...state.tasks],
                    task: action.payload,
                }
            case CLEAR_TASKS:
                return {
                    ...state,
                    loading: false,
                    tasks: [],
                    task: null,
                }
        default:
            return state;
    }
}