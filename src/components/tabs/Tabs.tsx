import React, {useState} from 'react'
import classnames from 'classnames'
import styles from './Tabs.module.css'
import {Link, useLocation} from 'react-router-dom'
import {HeartIcon} from 'components/icons/HeartIcon'
import {ListIcon} from 'components/icons/ListIcon'

export const Tabs = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const toggleIsSubscribed = () => {
    setIsSubscribed(!isSubscribed)
  }
  const {pathname} = useLocation()
  return (
    <div className={styles.stickyParent}>
      <div className={styles.stickyContainer}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div
                onClick={toggleIsSubscribed}
                role="button"
                className={styles.locationItem}
              >
                <span
                  className={classnames(`${styles.locationCheckbox}`, {
                    'bg-gray-200': !isSubscribed,
                    'bg-blue-500': isSubscribed,
                  })}
                  role="checkbox"
                  aria-checked="false"
                  tabIndex={0}
                >
                  <span
                    aria-hidden="true"
                    className={classnames(`${styles.toggleIconContainer}`, {
                      'translate-x-5': isSubscribed,
                      'translate-x-0': !isSubscribed,
                    })}
                  >
                    <span
                      className={classnames(`${styles.toggleIcon}`, {
                        'opacity-0 ease-out duration-100': isSubscribed,
                        'opacity-100 ease-in duration-200': !isSubscribed,
                      })}
                    >
                      <svg
                        className="h-3 w-3 text-gray-500"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={classnames(`${styles.toggleIcon}`, {
                        'opacity-0 ease-out duration-100': !isSubscribed,
                        'opacity-100 ease-in duration-200': isSubscribed,
                      })}
                    >
                      <svg
                        className="h-3 w-3 text-gray-500"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                        />
                      </svg>
                    </span>
                  </span>
                </span>
                <span className="pl-3 text-gray-500">Share location</span>
              </div>
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
