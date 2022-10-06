import React, { useContext, useEffect, useState } from "react";
import {
  mdiCalendar,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiDotsVertical,
  mdiFilterVariant,
  mdiLoading,
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import { format, parseISO } from "date-fns";
import style from "./profile-content.module.css";
import ReactDatePicker from "react-datepicker";
import { CALENDAR_DROP, FILTER_DROPDOWN, OPTIONS_DROPDOWN } from "./types";
import taskContext from "context/task/taskContext";
import { ADD_TASK_MODAL } from "components/dashboard/types";

const optionsState = {
  open: false,
  type: "",
  id: "",
};

const filterOptions = [
  { value: "todayTask", label: "Today's Tasks" },
  { value: "due", label: "Due Task" },
  { value: "upcoming", label: "Upcoming Task" },
  { value: "urgent", label: "Urgent Tasks" },
  { value: "important", label: "Important Tasks" },
  { value: "needful", label: "Needful Tasks" },
  { value: "neccessary", label: "Neccessary Tasks" },
  { value: "usual", label: "Usual Tasks" },
  { value: "completed", label: "Completed Tasks" },
  { value: "cancelled", label: "Cancelled Tasks" },
];
const optionsValue = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
  { value: "cancel", label: "Cancel" },
];

export default function ProfileContent({ setModal, user }) {
  const [startDate, setStartDate] = useState(new Date());
  const [options, setOptions] = useState(optionsState);
  const [optionsFilter, setOptionsFilter] = useState(false);
  const { getTasks, updateTask, tasks, loading } = useContext(taskContext);

  useEffect(() => {
    getTasks(user._id);
  }, []);

  const onDropdownOpen = (type, id) => {
    if (options.open) return onDropdownClose();
    setOptions({ open: true, type, id });
  };
  const onDropdownClose = () => {
    setOptions(optionsState);
  };
  const handleOpenModal = (type) => {
    setOptionsFilter(false);
    onDropdownClose();
    setModal(type);
  };

  const handleUpdate = (task) => {
    updateTask(task._id, {
      status: task.status === "done" ? "pending" : "done",
    });
  };
  return (
    <div className={style["profile-content"]}>
      <div className={style["profile-content-lhs"]}>
        <h1 className={style["my-task-today"]}>My Tasks</h1>
        <div className={style["center-task-board"]}>
          <div className={style["filter-wrapper"]}>
            {options.open && options.type === CALENDAR_DROP && (
              <div className={style["calendar-wrapper"]}>
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  inline
                />
              </div>
            )}
            <div className={style["mobile-calendar"]}>
              <button>
                <Icon path={mdiCalendar} className={style["task-icon"]} />
              </button>
            </div>
            <div onClick={() => setOptionsFilter(!optionsFilter)}>
              <p>Filter tasks </p>
              <span>
                <Icon path={mdiFilterVariant} className={style["task-icon"]} />
              </span>
            </div>
            {optionsFilter && (
              <div className={style["dropdown filter-dropdown"]}>
                <ul>
                  {filterOptions.map((f, i) => (
                    <li
                      onClick={() => handleOpenModal(ADD_TASK_MODAL)}
                      key={`filter-task-${i}`}
                    >
                      <p>{f.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={style["task-list-wrapper"]}>
            <ul className={style["task-list"]}>
              {tasks.length > 0 &&
                tasks.map((tk) => (
                  <li
                    key={`task-list-${tk._id}`}
                    className={`${style["task-card"]} ${style[tk.status]}`}
                  >
                    <div className={style["task-card-header"]}>
                      <h3 className={`task-title ${style[tk.status]}`}>
                        {tk.task}
                      </h3>
                      <div>
                        <span
                          onClick={() =>
                            onDropdownOpen(ADD_TASK_MODAL, `task-${tk}`)
                          }
                        >
                          <Icon
                            path={mdiDotsVertical}
                            className={style["task-icon"]}
                          />
                        </span>
                      </div>
                    </div>
                    <div className={style["task-card-body"]}>
                      <p>{tk.status}</p>
                      <div>
                        <p className={style["task-card-date"]}>
                          {format(parseISO(tk.dueDate), "EEE. MMM. do, yyyy")}
                        </p>
                        <div className={style["task-checker-wrapper"]}>
                          {loading ? (
                            <span className={style["task-checker-loading"]}>
                              <Icon
                                path={mdiLoading}
                                className={style["task-icon"]}
                                spin={true}
                              />
                            </span>
                          ) : tk.status !== "cancelled" ? (
                            <input
                              type="checkbox"
                              name="taskchecker"
                              id={`task-checker-${tk._id}`}
                              className={style["task-checker"]}
                              value={tk.status}
                              checked={tk.status === "done"}
                              onChange={() => handleUpdate(tk)}
                            />
                          ) : null}

                          <label
                            htmlFor={`task-checker-${tk._id}`}
                            className={style["task-checker-label"]}
                          ></label>
                        </div>
                      </div>
                    </div>
                    {options.open && options.id === `task-${tk}` && (
                      <div
                        className={`${style["dropdown"]} ${style["options-dropdown"]}`}
                      >
                        <ul>
                          {optionsValue.map((f, i) => (
                            <li
                              onClick={() => handleOpenModal(ADD_TASK_MODAL)}
                              key={`select-options-task-${i}`}
                            >
                              <p>{f.label}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>
          <div className={style["pagination"]}>
            <button className={style["prev-btn"]}>
              <Icon
                path={mdiChevronDoubleLeft}
                className={style["task-icon"]}
              />
            </button>
            <button className={style["next-btn"]}>
              <Icon
                path={mdiChevronDoubleRight}
                className={style["task-icon"]}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={style["profile-content-rhs"]}>
        <div className={style["profile-content-rhs-content"]}>
          <div className={style["content-greeting"]}>
            <h2>
              <span>Hello, {user.firstname}!</span> You have {tasks.length}{" "}
              tasks today.
            </h2>
          </div>
          <div className={style["create-task-container"]}>
            <div className={style["show-today-date"]}>
              <p>{format(new Date(), "MMMM dd, yyyy")}</p>
              <h2>Today</h2>
            </div>
            <div className={style["add-task-btn"]}>
              <button onClick={() => setModal(ADD_TASK_MODAL)}>
                <Icon path={mdiPlus} className={style["add-icon"]} />{" "}
                <span>Add Task</span>
              </button>
            </div>
          </div>
          <div className={style["calendar-container"]}>
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              inline
            />
          </div>
        </div>
      </div>
    </div>
  );
}
