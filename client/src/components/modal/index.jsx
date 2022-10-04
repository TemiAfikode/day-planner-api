import React, { useContext, useEffect, useState } from 'react'
import ReactSelect from 'react-select';
import taskContext from '../../context/task/taskContext';
import validateState from '../../validation/stateValidation';
import './modal.css'

const options = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'important', label: 'Important' },
  { value: 'needful', label: 'Needful' },
  { value: 'neccessary', label: 'Neccessary' },
  { value: 'usual', label: 'Usual' },
];

const initialTaskState = {
  tag: 'usual',
  dueDate: '',
  dueTime: '',
  task: '',
}

const initialErrorState = {
        open: false,
        errors:[{message:'', path:''}]
    }

export function AddTaskModal() {
    const [selectedOption, setSelectedOption] = useState({value: 'usual', label: 'Usual'});
    const [value, setValue] = useState(initialTaskState)
  const [showError, setShowError] = useState(initialErrorState)
  const [showInfo, setShowInfo] = useState(false)
  
  const { loading, createTask, error, task } = useContext(taskContext)

  useEffect(() => {
    if (error) {
      setShowError({
          open: true,
          errors: [{ message: error && error.message, path: error && error.path[0] }]
      })
    } else if (task) {
      setValue(initialTaskState)
    }
  }, [error, task])
  
    const onChange = (e) => {
      setShowError(initialErrorState)
      setValue({...value, [e.target.name]: e.target.value})
  }

  const handleSelectionChange = (tag) => {
    setSelectedOption(tag)
    setValue({ ...value, tag: tag.value })
  }

    const onSubmit = (e) => {
      e.preventDefault()
      const errors = validateState(value)
      if (errors.length > 0) {
            setShowError({
                open: true,
                errors
            })
            return
      }
        createTask(value)
    }
    
  return (
      <div className='add-task-modal-content'>
      <h1>Add New Task</h1>
      {task && <span className='success'>{task.message}</span>}
          <form className='form' onSubmit={onSubmit} >
              <div className='form-control'>
                  <label htmlFor="task-category">Tag</label>
                  <ReactSelect
                    defaultValue={selectedOption}
                    onChange={handleSelectionChange}
                    options={options}
                  />
              </div>
              <div className='form-control'>
                  <label htmlFor="task-schedule-date">Schedule Date</label>
                  <input type="date" name="dueDate" id="task-schedule-date" value={value.dueDate}   onChange={onChange}  />
                  {showError.open && showError.errors.some(e=>e.path === 'dueDate') && <span className='error'> {showError.errors.find(e=>e.path === 'dueDate').message} </span> }
              </div>
              <div className='form-control'>
                  <label htmlFor="task-schedule-time">Schedule Time</label>
                  <input type="time" name="dueTime" id="task-schedule-time" value={value.dueTime}   onChange={onChange}  />
                  {showError.open && showError.errors.some(e=>e.path === 'dueTime') && <span className='error'> {showError.errors.find(e=>e.path === 'dueTime').message} </span> }
              </div>
              <div className='form-control'>
                  <label htmlFor="task">Task</label>
                  <textarea name="task" id="task" rows="3" placeholder='Type here...' value={value.task} onChange={onChange}></textarea>
                  {showError.open && showError.errors.some(e=>e.path === 'task') && <span className='error'> {showError.errors.find(e=>e.path === 'task').message} </span> }
              </div>
              <div className='form-control'>
          <button disabled={loading} type='submit'>{loading ? 'Please wait...' : 'Add' }</button>
              </div>
          </form>
    </div>
  )
}

export function EditTaskModal() {
  return (
      <div>
          hello edit task modal
    </div>
  )
}

export function ProcessingModal() {
  return (
      <div>
          hello processing modal
    </div>
  )
}