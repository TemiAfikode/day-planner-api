import { mdiCheckboxMarkedCircleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'
import { Link } from 'react-router-dom'
import './pricing.css'

export default function Pricing() {
  return (
      <section className='pricing'>
          <div className='container pricing-container'>
              <h1 className='about-header'>Pricing</h1>
              <div className='pricing-wrapper'>
                  <ul className='pricing-card-list'>
                      <li className='pricing-card'>
                          <div className='pricing-card-header'>
                              <h2>Basic</h2>
                              <p>Forever free</p>
                          </div>
                          <div className='pricing-card-body'>
                              <div className='available-ft'>
                                  <span>
                                      <Icon path={mdiCheckboxMarkedCircleOutline} className='pricing-icon' />
                                  </span>
                                  <p>15 tasks max per day</p>
                              </div>
                              <div className='available-ft'>
                                  <span>
                                      <Icon path={mdiCheckboxMarkedCircleOutline} className='pricing-icon' />
                                  </span>
                                  <p>Edit task</p>
                              </div>
                              <div className='available-ft'>
                                  <span>
                                      <Icon path={mdiCheckboxMarkedCircleOutline} className='pricing-icon' />
                                  </span>
                                  <p>Delete task</p>
                              </div>
                              <div className='available-ft'>
                                  <span>
                                      <Icon path={mdiCheckboxMarkedCircleOutline} className='pricing-icon' />
                                  </span>
                                  <p>Prioritize task</p>
                              </div>
                          </div>
                          <div className='pricing-card-footer'>
                              <Link to='/register' className='btn btn-primary'>Free Acount</Link>
                          </div>
                      </li>
                      <li className='pricing-card'>
                          <div className='pricing-card-header'>
                              <h2>Pro</h2>
                              <p className='pro-price'>$10.99/month</p>
                          </div>
                          <div className='pricing-card-body'>
                              <div className='available-ft'>
                                  <span>
                                      <Icon path={mdiCheckboxMarkedCircleOutline} className='pricing-icon' />
                                  </span>
                                  <p>Unlimited tasks per day</p>
                              </div>
                              <div className='available-ft'>
                                  <span>
                                      <Icon path={mdiCheckboxMarkedCircleOutline} className='pricing-icon' />
                                  </span>
                                  <p>Edit task</p>
                              </div>
                              <div className='available-ft'>
                                  <span>
                                      <Icon path={mdiCheckboxMarkedCircleOutline} className='pricing-icon' />
                                  </span>
                                  <p>Delete task</p>
                              </div>
                              <div className='available-ft'>
                                  <span>
                                      <Icon path={mdiCheckboxMarkedCircleOutline} className='pricing-icon' />
                                  </span>
                                  <p>Prioritize task</p>
                              </div>
                              <div className='available-ft'>
                                  <span>
                                      <Icon path={mdiCheckboxMarkedCircleOutline} className='pricing-icon' />
                                  </span>
                                  <p>Share task with others</p>
                              </div>
                          </div>
                            <div className='pricing-card-footer'>
                              <Link to='/dashboard' className='btn btn-primary'>Get Started</Link>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
    </section>
  )
}
