import React, { useContext, useEffect, useState } from 'react'
import ProfileBar from '../components/profile-bar'
import ProfileContent from '../components/profile-content'
import './profile.css'
import "react-datepicker/dist/react-datepicker.css";
import Menu from '../components/menu';
import { ADD_TASK_MODAL, EDIT_TASK_MODAL, PROCESSING_MODAL } from './types';
import { AddTaskModal, EditTaskModal, ProcessingModal } from '../components/modal';
import userContext from '../context/user/userContext';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const getModalContent = (type) => {
    switch (type) {
        case ADD_TASK_MODAL:
            return <AddTaskModal />
        case EDIT_TASK_MODAL:
            return <EditTaskModal />
        case PROCESSING_MODAL:
            return <ProcessingModal />
    }
}

const modalState = {
    open: false,
    type: '',
}

export default function ProfilePage() {
    const [options, setOptions] = useState(modalState)

    
    const { loading, user, isLoggedIn, loadUser } = useContext(userContext)

    useEffect(() => {
        if (!isLoggedIn) {
          loadUser()
        }
    
    }, [])
    

    const modalHandler = () => {
        setOptions(modalState)
    }

    const handleSetContent = (type) => {
        setOptions({open:true, type})
    }

  return (
      <div className='profile'>
          <aside className='menu'>
              <Menu setModal={handleSetContent} />
          </aside>
          <main className='profile-main'>
              <ProfileBar />
              <ProfileContent setModal={handleSetContent} />
          </main>
          {options.open && 
            (<div className='modal'>
              <div className='modal-container'>
                  <div className='modal-content'>
                      <button className='close-modal' onClick={()=>modalHandler()}><Icon path={mdiClose} className='close-modal-icon'  /></button>
                      {getModalContent(options.type )}
                  </div>
              </div>
          </div>)
          }
          
    </div>
  )
}
