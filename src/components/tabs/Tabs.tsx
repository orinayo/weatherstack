import React, {FC} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {HeartIcon} from 'components/icons/HeartIcon'
import {ListIcon} from 'components/icons/ListIcon'
import styles from './Tabs.module.css'
import {UserLocation} from '../../features/userLocation/UserLocation'

export const Tabs: FC = () => {
  const {pathname} = useLocation()
  return (
    <div className={styles.stickyParent}>
      <div className={styles.stickyContainer}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <UserLocation />
            </div>
            <div className={styles.column}>
              <div className={styles.tabsContainer}>
                <nav aria-label="user-lists" className="flex flex-1">
                  <Link
                    className={`${styles.tabLink} ${
                      pathname === '/' ? styles.selected : ''
                    }`}
                    to="/"
                  >
                    <ListIcon />
                    &nbsp;All Places
                  </Link>
                  <Link
                    className={`${styles.tabLink} ${
                      pathname === '/favorites' ? styles.selected : ''
                    }`}
                    to="/favorites"
                  >
                    <HeartIcon
                      height={16}
                      width={16}
                      classes="inline-block align-text-bottom mr-1"
                      fillColor="none"
                      strokeColor="currentColor"
                    />
                    &nbsp;Favorites
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
