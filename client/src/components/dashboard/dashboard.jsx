import {  useState } from 'react'
import ProfileBar from 'components/profile-bar'
import ProfileContent from 'components/profile-content'
import style from './dashboard.module.css'
import "react-datepicker/dist/react-datepicker.css";
import Menu from 'components/menu';
import { ADD_TASK_MODAL, EDIT_TASK_MODAL, PROCESSING_MODAL } from './types';
import { AddTaskModal, EditTaskModal, ProcessingModal } from 'components/modal';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const getModalContent = (type, user) => {
    switch (type) {
        case ADD_TASK_MODAL:
            return <AddTaskModal user={user} />
        case EDIT_TASK_MODAL:
            return <EditTaskModal user={user} />;
        case PROCESSING_MODAL:
            return <ProcessingModal user={user} />;
    }
}

const modalState = {
    open: false,
    type: '',
}

export default function Dashboard({user}) {
    const [options, setOptions] = useState(modalState)

    const modalHandler = () => {
        setOptions(modalState)
    }

    const handleSetContent = (type) => {
        setOptions({open:true, type})
    }

  return (
    <div className={style["profile"]}>
      <aside className={style["menu"]}>
        <Menu setModal={handleSetContent} user={user} />
      </aside>
      <main className={style["profile-main"]}>
        <ProfileBar user={user} />
        <ProfileContent setModal={handleSetContent} user={user} />
      </main>
      {options.open && (
        <div className="modal">
          <div className="modal-container">
            <div className="modal-content">
              <button className="close-modal" onClick={() => modalHandler()}>
                <Icon path={mdiClose} className="close-modal-icon" />
              </button>
              {getModalContent(options.type, user)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
