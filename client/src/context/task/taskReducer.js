
import {  GET_USER_TASKS_SUCCESS, TASK_FAILED, TASK_REQUEST, UPDATE_TASK_SUCCESS } from './taskType';

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
        default:
            return state;
    }
}