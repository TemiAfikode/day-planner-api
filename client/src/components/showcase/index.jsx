import React from 'react';
import Icon from '@mdi/react'
import { mdiMouse } from '@mdi/js'
import './showcase.css'
import { Link } from 'react-router-dom';

export default function Showcase() {
  return (
    <header className='showcase'>
        <div className='showcase-main'>
            <img className='design-eclipse' src='/imgs/design-eclipse.svg' alt="" />
            <div className='container showcase-container'>
            <span className='mouse-scroll'>
                <Icon path={mdiMouse} className='icon-img'/> Scroll
            </span>
                <div className='showcase-lhs'>
                    <h1>Stay Organised and achieve more daily...</h1>
                    <p>With Temi Task Manager you can organise your daily to do tasks and priotise them in a way that you wouldn&apos;t leave any undone..</p>
                    <Link to='/login' className='btn btn-primary'>Free Acount</Link>
                </div>
                <div className='showcase-rhs'>
                    <img src='/imgs/showcase-img.svg' alt='showcase image' />
                </div>
            </div>
        </div>
    </header>
  )
}
