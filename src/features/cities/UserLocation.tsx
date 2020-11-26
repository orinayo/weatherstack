import React from 'react'
import styles from './UserLocation.module.css'

export const UserLocation = () => {
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
            <span className={styles.today}>Today</span>
            <span className={styles.date}>2020-11-26</span>
          </h1>
        </div>
      </div>
      <h1 className="text-6xl text-center">
        14 <sup className={styles.superscript}>&#8451;</sup>
      </h1>
      <p className="text-gray-600">Berlin, Germany</p>
      <p className="text-gray-600 pt-1">
        <span>Feels like 11</span> · <span>13% Humidity</span>
      </p>
    </div>
  )
}
