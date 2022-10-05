import React,{useContext, useEffect, useState} from 'react'
import {  mdiCalendar, mdiChevronDoubleLeft, mdiChevronDoubleRight, mdiDotsVertical, mdiFilterVariant, mdiLoading, mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import {format, parseISO } from 'date-fns'
import './profile-content.css'
import ReactDatePicker from 'react-datepicker';
import { CALENDAR_DROP, FILTER_DROPDOWN, OPTIONS_DROPDOWN } from './types';
import { ADD_TASK_MODAL } from '../../pages/types';
import userContext from '../../context/user/userContext';
import taskContext from '../../context/task/taskContext';

const optionsState = {
        open: false,
        type: '',
        id:''
}
    
const filterOptions = [
  { value: 'todayTask', label: 'Today\'s Tasks' },
  {value:'due',label:'Due Task'},
  {value:'upcoming',label:'Upcoming Task'},
  { value: 'urgent', label: 'Urgent Tasks' },
  { value: 'important', label: 'Important Tasks' },
  { value: 'needful', label: 'Needful Tasks' },
  { value: 'neccessary', label: 'Neccessary Tasks' },
  { value: 'usual', label: 'Usual Tasks' },
  { value: 'completed', label: 'Completed Tasks' },
  { value: 'cancelled', label: 'Cancelled Tasks' },
]
const optionsValue = [
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
  { value: 'cancel', label: 'Cancel' },
]

export default function ProfileContent({setModal}) {
    const [startDate, setStartDate] = useState(new Date());
    const [options, setOptions] = useState(optionsState)
    const [optionsFilter, setOptionsFilter] = useState(false)
    const { user, isLoggedIn } = useContext(userContext)
    const { getTasks, updateTask,  tasks, loading} = useContext(taskContext)

    useEffect(() => {
     getTasks(user.data._id)
    }, [])
    

    const onDropdownOpen = (type, id) => {
            if(options.open) return onDropdownClose()
            setOptions({ open:true, type, id })
    }
    const onDropdownClose = () => {
            setOptions(optionsState)
    }
    const handleOpenModal = (type) => {
        setOptionsFilter(false)
        onDropdownClose()
        setModal(type)
    }

    const handleUpdate = (task) => {
       updateTask(task._id,{status: task.status === 'done' ? 'pending' : 'done'})
    }
  return (
    <div className='profile-content'>
        <div className='profile-content-lhs'>
              <h1 className='my-task-today'>My Tasks</h1>
              <div className='center-task-board'>
                  <div className='filter-wrapper'>
                      {options.open && options.type === CALENDAR_DROP &&
                          (<div className='calendar-wrapper'>
                              <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline />
                          </div>)
                      }
                      <div className='mobile-calendar'>
                          <button>
                              <Icon path={mdiCalendar} className='task-icon' />
                          </button>
                      </div>
                      <div onClick={()=>setOptionsFilter(!optionsFilter)}>
                          <p>Filter tasks </p>
                          <span>
                              <Icon path={mdiFilterVariant} className='task-icon' />
                          </span>
                      </div> 
                      {optionsFilter &&
                      (<div className='dropdown filter-dropdown'>
                          <ul>
                              {filterOptions.map((f,i) => 
                              <li onClick={()=>handleOpenModal(ADD_TASK_MODAL)} key={`filter-task-${i}`}>
                                  <p>{f.label }</p>
                              </li>
                              )}
                          </ul>
                        </div>)
                      } 
                  </div>
                      
                  <div className='task-list-wrapper'>
                      <ul className='task-list'>
                          {tasks.length > 0 && tasks.map(tk => (<li key={`task-list-${tk._id}`} className={`task-card ${tk.status}`}>
                              <div className='task-card-header'>
                                  <h3 className={`task-title ${tk.status}`}>
                                      {tk.task}
                                  </h3>
                                  <div>
                                      <span onClick={() => onDropdownOpen(ADD_TASK_MODAL, `task-${tk}`)}>
                                          <Icon path={mdiDotsVertical} className='task-icon' />
                                      </span>
                                  </div>
                              </div>
                              <div className='task-card-body'>
                                  <p>{tk.status}</p>
                                  <div>
                                      <p className='task-card-date'>{ format(parseISO(tk.dueDate), 'EEE. MMM. do, yyyy')}</p>
                                      <div className='task-checker-wrapper'>
                                          {loading ? <span className='task-checker-loading'><Icon path={mdiLoading} className='task-icon' spin={true} /></span> : tk.status !== 'cancelled' ? <input type="checkbox" name="taskchecker" id={`task-checker-${tk._id}`} className='task-checker' value={tk.status} checked={tk.status === 'done'} onChange={()=>handleUpdate(tk)} /> : null}
                                         
                                          <label htmlFor={`task-checker-${tk._id}`} className='task-checker-label'></label>
                                      </div>
                                  </div>
                              </div>
                              {options.open && options.id === `task-${tk}` &&
                                  (<div className='dropdown options-dropdown'>
                                      <ul>
                                          {optionsValue.map((f, i) =>
                                              <li onClick={() => handleOpenModal(ADD_TASK_MODAL)} key={`select-options-task-${i}`}>
                                                  <p>{f.label}</p>
                                              </li>
                                          )}
                                      </ul>
                                  </div>)
                              }
                              
                          </li>
                          ))}
                              
                      </ul>
                  </div>
                  <div className='pagination'>
                      <button className='prev-btn'>
                          <Icon path={mdiChevronDoubleLeft} className='task-icon' />
                      </button>
                      <button className='next-btn'>
                           <Icon path={mdiChevronDoubleRight} className='task-icon' />
                      </button>
                  </div>
              </div>
        </div>
        <div className='profile-content-rhs'>
              <div className='profile-content-rhs-content'>
                  <div className='content-greeting'>
                      <h2>
                          {isLoggedIn && <><span>Hello, {user.data.firstname}!</span> You have {tasks.length} tasks today.</> }
                    </h2>
                  </div>   
                  <div className='create-task-container'>
                      <div className='show-today-date'>
                          <p>{format(new Date(), 'MMMM dd, yyyy')}</p>
                          <h2>Today</h2>
                      </div>
                      <div className='add-task-btn'>
                          <button onClick={()=>setModal(ADD_TASK_MODAL)}>
                              <Icon path={mdiPlus} className='add-icon' /> <span>Add Task</span>
                          </button>
                      </div>
                  </div>
                  <div className='calendar-container'>
                      <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline />
                  </div>
            </div>
        </div>
    </div>
  )
}
