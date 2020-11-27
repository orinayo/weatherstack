import React, {FC, useContext} from 'react'
import classnames from 'classnames'
import {UserLocationContext} from './userLocationContext'
import styles from './UserLocation.module.css'

export const UserLocation: FC = () => {
  const {permStatus, isSubscribed, userLocationData, getLocation} = useContext(
    UserLocationContext,
  )

  if (!navigator.geolocation)
    return (
      <p role="alert" className={styles.container}>
        No Geolocation support.
      </p>
    )

  if (permStatus === 'denied')
    return (
      <p role="alert" className={styles.container}>
        Geolocation permission is denied.
      </p>
    )

  if (permStatus === 'granted')
    return (
      <p role="alert" className={styles.container}>
        Your location: {userLocationData?.location.name || ''}
      </p>
    )

  if (permStatus === 'prompt')
    return (
      <div role="button" onClick={getLocation} className={styles.container}>
        <span
          className={classnames(`${styles.checkbox}`, {
            'bg-gray-200': !isSubscribed,
            'bg-blue-500': isSubscribed,
          })}
          role="checkbox"
          aria-checked="false"
          tabIndex={0}
        >
          <span
            aria-hidden="true"
            className={classnames(`${styles.text}`, {
              'translate-x-5': isSubscribed,
              'translate-x-0': !isSubscribed,
            })}
          >
            <span
              className={classnames(`${styles.icon}`, {
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
              className={classnames(`${styles.icon}`, {
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
    )

  return null
}
