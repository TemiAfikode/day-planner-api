import React, { useState } from 'react'
import ReactSelect from 'react-select';
import './modal.css'

const options = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'important', label: 'Important' },
  { value: 'needful', label: 'Needful' },
  { value: 'neccessary', label: 'Neccessary' },
  { value: 'usual', label: 'Usual' },
];

export function AddTaskModal({action}) {
    const [selectedOption, setSelectedOption] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault()
        action()
    }
    
  return (
      <div className='add-task-modal-content'>
          <h1>Add New Task</h1>
          <form className='form' onSubmit={onSubmit} >
              <div className='form-control'>
                  <label htmlFor="task-category">Category</label>
                  <ReactSelect
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  />
              </div>
              <div className='form-control'>
                  <label htmlFor="task-schedule-date">Schedule Date</label>
                  <input type="date" name="scheduleDate" id="task-schedule-date" />
              </div>
              <div className='form-control'>
                  <label htmlFor="task-schedule-time">Schedule Time</label>
                  <input type="time" name="scheduleTime" id="task-schedule-time" />
              </div>
              <div className='form-control'>
                  <label htmlFor="title">Title</label>
                  <textarea name="title" id="title"  rows="3" placeholder='Type here...'></textarea>
              </div>
              <div className='form-control'>
                  <button type='submit'>Add</button>
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