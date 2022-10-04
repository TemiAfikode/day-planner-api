import { mdiFacebook, mdiGithub, mdiGmail, mdiLinkedin, mdiPhone, mdiTwitter } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import './contact.css'

export default function Contact() {
  return (
      <footer className='contact'>
          <div className='container contact-container'>
              <h1 className='about-header'>Contact us</h1>
              <div className='contact-wrapper'>
                  <div className='contact-lhs'>
                      <p>
                          We would like to hear from you, our support team are respectful and always available to help you as quick as possible.
                      </p>
                      <p>
                          Making your day seamless is the only reason we&apos;re here.
                      </p>
                      <p>              
                          Follow us on our social media handle, you can also get quick response from our support team in on social media handle. 
                      </p>
                      <p>Thank you for chosing us.</p>
                      <div className='contact-social-icons'>
                          <div className='social-icon'>
                              <span className='social-icon-wrapper'>
                                  <Icon path={mdiPhone} className='icon-social-icon' />
                              </span>
                              <p>+1 (237) 223-4327</p>
                          </div>
                          <div className='social-icon'>
                              <span className='social-icon-wrapper'>
                                  <Icon path={mdiTwitter} className='icon-social-icon' />
                              </span>
                              <p>temitope_babalola</p>
                          </div>
                          <div className='social-icon'>
                              <span className='social-icon-wrapper'>
                                  <Icon path={mdiLinkedin} className='icon-social-icon' />
                              </span>
                              <p>Temitope Babalola</p>
                          </div>
                          <div className='social-icon'>
                              <span className='social-icon-wrapper'>
                                  <Icon path={mdiGmail} className='icon-social-icon' />
                              </span>
                              <p>temitopebabalola@gmail.com</p>
                          </div>
                          <div className='social-icon'>
                              <span className='social-icon-wrapper'>
                                  <Icon path={mdiGithub} className='icon-social-icon' />
                              </span>
                              <p>temitope_babalola</p>
                          </div>
                          <div className='social-icon'>
                              <span className='social-icon-wrapper'>
                                  <Icon path={mdiFacebook} className='icon-social-icon' />
                              </span>
                              <p>temitope_babalola</p>
                          </div>
                      </div>
                  </div>
                  <div className='contact-rhs'>
                      <form onSubmit={(e)=>e.preventDefault()} className='form' >
                          <div className='form-control'>
                              <label htmlFor="full-name">Full name:</label>
                              <input type="text" name="fullname" id="full-name" placeholder='Enter full name' />
                          </div>
                          <div className='form-control'>
                              <label htmlFor="email">Email:</label>
                              <input type="email" name="email" id="email" placeholder='Enter your email' />
                          </div>
                          <div className='form-control'>
                              <label htmlFor="message">Message:</label>
                              <textarea name="message" id="message" cols="30" rows="10" placeholder='Enter message'></textarea>
                          </div>
                          <div className='form-control'>
                              <button type='submit'>Submit</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          <div className='footer-wrapper'>
              <p>
                  &copy;{new Date().getFullYear()} All right reserved TemiTodo 
              </p>
          </div>
    </footer>
  )
}
