import React, {FC, useCallback, useEffect, useState} from 'react'
import classnames from 'classnames'
import {toast} from 'react-toastify'
import styles from './LocationElem.module.css'

export const LocationElem: FC = () => {
  const [permStatus, setPermStatus] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [coords, setCoords] = useState({lat: 0, lon: 0})
  console.log(coords)

  const showError: PositionErrorCallback = error => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setIsSubscribed(false)
        setPermStatus('denied')
        toast.warn('User denied the request for Geolocation.')
        break
      case error.POSITION_UNAVAILABLE:
        toast.warn('Location information is unavailable.')
        break
      case error.TIMEOUT:
        toast.warn('The request to get user location timed out.')
        break
      default:
        toast.warn('An unknown error occurred.')
    }
  }

  const showPosition: PositionCallback = position => {
    setCoords({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    })
  }

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      setIsSubscribed(true)
      navigator.geolocation.getCurrentPosition(showPosition, showError, {
        timeout: 7000,
      })
    }
  }, [])

  useEffect(() => {
    const getPermissionStatus = () => {
      navigator.permissions
        .query({name: 'geolocation'})
        .then(function (permissionStatus) {
          setPermStatus(permissionStatus.state)
          if (permissionStatus.state === 'granted') getLocation()
        })
    }
    getPermissionStatus()
  }, [getLocation, setPermStatus])

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
        Your location:
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
