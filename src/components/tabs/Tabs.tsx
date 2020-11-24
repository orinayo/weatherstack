import React, {useState} from 'react'
import classnames from 'classnames'
import styles from './Tabs.module.css'
import {Link} from 'react-router-dom'

export const Tabs = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const toggleIsSubscribed = () => {
    setIsSubscribed(!isSubscribed)
  }
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
                        className="h-3 w-3 text-blue-500"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
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
                    className={`${styles.tabLink} ${styles.selected}`}
                    to="/"
                  >
                    <svg
                      className="inline-block align-text-bottom mr-1"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <title>List</title>
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                        d="M160 144h288M160 256h288M160 368h288"
                      />
                      <circle
                        cx="80"
                        cy="144"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <circle
                        cx="80"
                        cy="256"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <circle
                        cx="80"
                        cy="368"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                    </svg>
                    &nbsp;All Places
                  </Link>
                  <Link className={styles.tabLink} to="/favorites">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block align-text-bottom mr-1"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      viewBox="0 0 512 512"
                    >
                      <title>Star</title>
                      <path
                        d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                    </svg>
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
