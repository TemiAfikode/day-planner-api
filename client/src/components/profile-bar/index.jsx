import { mdiAccountCircle, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import style from './profile-bar.module.css'

export default function ProfileBar({user}) {
    
  return (
    <nav className={style["profile-nav"]}>
      <div className={style["profile-nav-container"]}>
        <div className={style["profile-nav-rhs"]}>
          <div className={style["profile-nav-logo"]}>
            <img src="/imgs/logo.svg" alt="logo" />
          </div>
          <form
            className={style["search-form"]}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className={style["search-input"]}
              placeholder="Search for task"
            />
            <span className={style["search-form-icon"]}>
              <Icon path={mdiMagnify} className={style["search-icon"]} />
            </span>
          </form>
        </div>
        <div className={style["profile-nav-lhs"]}>
          <div className={style["avatar-wrapper"]}>
            <Icon path={mdiAccountCircle} className={style["avatar-icon"]} />
          </div>
          {user && (
            <p
              className={style["profile-nav-fullname"]}
            >{`${user.firstname} ${user.lastname}`}</p>
          )}
        </div>
      </div>
    </nav>
  );
}
