import { mdiClock, mdiHome, mdiMenu, mdiPlus, mdiPower } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../../context/user/userContext'
import { ADD_TASK_MODAL } from '../../pages/types'
import './menu.css'

export default function Menu({setModal}) {
    const navigate = useNavigate()

    const { logoutUser, isLoggedOut } = useContext(userContext)
    
    useEffect(() => {
        if (isLoggedOut) {
          navigate('/')
        } 
    
    }, [isLoggedOut])

  return (
      <div className='menu-item-wrapper'>
          <ul className='menu-item-list'>
              <li>
                   <Icon path={mdiMenu} className='menu-icon' /> <h2>Dashboard</h2>
              </li>
              <li>
                  <a href='/' target='_blank' rel='noreferrer'  >
                      <Icon path={mdiHome} className='menu-icon' />
                      <h2>Home</h2>
                  </a>
              </li>
              <li onClick={()=>setModal(ADD_TASK_MODAL)}>
                   <Icon path={mdiPlus} className='menu-icon' /> <h2> Add Task</h2>
              </li>
              <li>
                  <Icon path={mdiClock} className='menu-icon' /> <h2> Today&apos;s Tasks</h2>
              </li>
              <li onClick={()=>logoutUser()}>
                  <Icon path={mdiPower} className='menu-icon' /> <h2> Logout</h2>
              </li>
          </ul>
    </div>
  )
}
