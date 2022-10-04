import React, { useReducer } from 'react'
import UiContext from './uiContext';
import uiReducer from './uiReducer'

const uiState = props => {
    const initialState = {}
    
    const [state, dispatch] = useReducer(uiReducer,initialState);

    return (
        <UiContext.Provider value={{
            
        }}>
            {props.children}
        </UiContext.Provider>
    )
}

export default uiState;