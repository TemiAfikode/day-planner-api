import { mdiClock, mdiHome, mdiMenu, mdiPlus, mdiPower } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useContext } from 'react'
import {  Link } from 'react-router-dom'
import userContext from '../../context/user/userContext'
import { ADD_TASK_MODAL } from '../../pages/types'
import './menu.css'

export default function Menu({setModal}) {

    const { logoutUser } = useContext(userContext) 

  return (
      <div className='menu-item-wrapper'>
          <ul className='menu-item-list'>
              <li>
                   <Icon path={mdiMenu} className='menu-icon' /> <h2>Dashboard</h2>
              </li>
              <li>
                  <Link to='/' >
                      <Icon path={mdiHome} className='menu-icon' />
                      <h2>Home</h2>
                  </Link>
              </li>
              <li onClick={()=>setModal(ADD_TASK_MODAL)}>
                   <Icon path={mdiPlus} className='menu-icon' /> <h2> Add Task</h2>
              </li>
              <li>
                  <Icon path={mdiClock} className='menu-icon' /> <h2> Today&apos;s Tasks</h2>
              </li>
              <li onClick={() => logoutUser()}>
                  <Icon path={mdiPower} className='menu-icon' /> <h2> Logout</h2>
              </li>
          </ul>
    </div>
  )
}
