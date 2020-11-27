import React, {FC, useContext} from 'react'
import {UserLocationContext} from './userLocationContext'
import styles from './UserLocationData.module.css'

export const UserLocationData: FC = () => {
  const {permStatus, userLocationData} = useContext(UserLocationContext)

  if (permStatus && permStatus !== 'granted')
    return (
      <div className={styles.container}>
        <div className="flex items-center">
          <img
            className={styles.image}
            src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
            alt=""
          />
          <div className="pb-1 pt-1 w-full">
            <h1 className="leading-none pl-2">
              <span className={styles.date}>
                You can see your location&apos;s weather if you share it.
              </span>
            </h1>
          </div>
        </div>
      </div>
    )

  const cityData = (() => {
    if (userLocationData)
      return {
        image: userLocationData.current.weather_icons[0],
        currDate: userLocationData.location.localtime.split(' ')[0],
        temperature: userLocationData.current.temperature,
        location: `${userLocationData.location.name}, ${userLocationData.location.country}`,
        feelsLike: userLocationData.current.feelslike,
        humidity: userLocationData.current.humidity,
      }

    return {
      image: undefined,
      currDate: '',
      temperature: '',
      location: '',
      feelsLike: '',
      humidity: '',
    }
  })()
  return (
    <div className={styles.container}>
      <div className="flex items-center">
        <img
          className={styles.image}
          src={cityData.image}
          alt={cityData.location}
        />
        <div className="pb-1 pt-1 w-full">
          <h1 className="leading-none pl-2">
            <span className={styles.today}>Today</span>
            <span className={styles.date}>{cityData.currDate}</span>
          </h1>
        </div>
      </div>
      <h1 data-testid="city-temp" className="text-6xl text-center">
        {cityData.temperature ? (
          <>
            {cityData.temperature}
            <sup className={styles.superscript}>&#8451;</sup>
          </>
        ) : null}
      </h1>
      <p className="text-gray-600">{cityData.location}</p>
      <p className="text-gray-600 pt-1 text-xs">
        {cityData.temperature ? (
          <>
            <span>Feels like {cityData.feelsLike}</span> ·{' '}
            <span>{cityData.humidity}% Humidity</span>
          </>
        ) : null}
      </p>
    </div>
  )
}
