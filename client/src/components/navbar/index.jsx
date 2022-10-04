import React from 'react';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className='navbar-main'>
        <div className="container nav-container">
            <div className='nav-logo'>
                <img src='/imgs/logo.svg' alt='logo image' />
            </div>
            <ul className='nav-menu-list'>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#service">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
            </ul>
        </div>
    </nav>
  )
}
