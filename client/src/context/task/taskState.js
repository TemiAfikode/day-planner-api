import axios from 'axios';
import React,{ useReducer } from 'react'
import axiosRequest from '../../utils/axiosRequest';
import TaskContext from './taskContext';
import taskReducer from './taskReducer'
import {  CREATE_TASK_SUCCESS, GET_USER_TASKS_SUCCESS, TASK_FAILED, TASK_REQUEST, UPDATE_TASK_SUCCESS } from './taskType';

const taskState = props => {
    const initialState = {
        tasks: [],
        loading: false,
        task: null,
        error: null,
    }
    
    const [state, dispatch] = useReducer(taskReducer, initialState);

    async function getTasks() {
        dispatch({type: TASK_REQUEST})
        try {
            const { data } = await axiosRequest.get('/tasks/my-tasks');
            if (data.isSuccessful) {
                dispatch({type: GET_USER_TASKS_SUCCESS, payload: data})
            } else {
                dispatch({type: TASK_FAILED, payload: data})
            }
        } catch (error) {
            console.log(error)
            dispatch({type: TASK_FAILED, payload: error.response ? error.response.data.error : error.message})
        }
    }

    async function updateTask(id, task) {
        dispatch({type: TASK_REQUEST})
        try {
            const { data } = await axiosRequest.put(`/tasks/${id}`, task);
            
            if (data.isSuccessful) {
                dispatch({type: UPDATE_TASK_SUCCESS, payload: data})
            } else {
                dispatch({type: TASK_FAILED, payload: data})
            }
        } catch (error) {
            dispatch({type: TASK_FAILED, payload: error.response ? error.response.data.error : error.message})
        }
    }

    async function createTask(task) {
        dispatch({type: TASK_REQUEST})
        try {
            const { data } = await axiosRequest.post(`/tasks`, task);
            
            if (data.isSuccessful) {
                dispatch({type: CREATE_TASK_SUCCESS, payload: data})
            } else {
                dispatch({type: TASK_FAILED, payload: data})
            }
        } catch (error) {
            dispatch({type: TASK_FAILED, payload: error.response ? error.response.data.error : error.message})
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks: state.tasks,
            loading: state.loading,
            task: state.task,
            error: state.error,
            getTasks,
            updateTask,
            createTask,
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default taskState