import { mdiAccountCircle, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useContext } from 'react'
import userContext from '../../context/user/userContext'
import './profile-bar.css'

export default function ProfileBar() {
    const { user, isLoggedIn } = useContext(userContext)
    
  return (
      <nav className='profile-nav'>
          <div className='profile-nav-container'>
              <div className='profile-nav-rhs'>
                  <div className='profile-nav-logo'>
                      <img src='/imgs/logo.svg' alt='logo' />
                  </div>
                  <form className='search-form' onSubmit={(e) => e.preventDefault()}>
                      <input type='text' className='search-input' placeholder='Search for task' />
                      <span className='search-form-icon'>
                          <Icon path={mdiMagnify} className='search-icon' />
                      </span>
                  </form>
              </div>
              <div className='profile-nav-lhs'>
                  <div className='avatar-wrapper'>
                      <Icon path={mdiAccountCircle} className='avatar-icon' />
                  </div>
                  {isLoggedIn &&  <p className='profile-nav-fullname'>{`${user.data.firstname} ${user.data.lastname}`}</p>}
                 
              </div>
          </div>
    </nav>
  )
}
