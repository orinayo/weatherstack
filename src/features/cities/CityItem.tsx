import {RemoveIcon} from 'components/icons/RemoveIcon'
import {HeartIcon} from 'components/icons/HeartIcon'
import React, {FC, useContext, useEffect} from 'react'
import styles from './CityItem.module.css'
import {useFetch} from 'hooks/useFetch'
import {City} from 'features/city/City.types'
import {CitiesDataContext} from 'features/city/cityContext'

type Props = {
  cityName: string
  onDelete: () => void
  addFavorite?: () => void
  removeFavorite: () => void
  isFavorite: boolean
}

const weatherDescColors = {
  sunny: 'bg-yellow-100 text-black',
  sleet: 'bg-blue-500 text-white',
  rain: 'bg-blue-400 text-white',
  drizzle: 'bg-blue-300 text-white',
  mist: 'bg-blue-200 text-black',
  clear: 'bg-white text-black',
  thunder: 'bg-gray-600 text-white',
  fog: 'bg-gray-500 text-white',
  haze: 'bg-gray-500 text-white',
  smoke: 'bg-gray-500 text-white',
  overcast: 'bg-gray-400 text-white',
  cloudy: 'bg-gray-300 text-white',
  snow: 'bg-gray-200 text-black',
  blizzard: 'bg-gray-100 text-black',
  none: '',
}

export const CityItem: FC<Props> = ({
  cityName,
  onDelete,
  isFavorite,
  addFavorite,
  removeFavorite,
}) => {
  const getWeatherDesc = (weatherDesc: string) => {
    if (!weatherDesc) return 'none'
    const weatherDescriptions = Object.keys(weatherDescColors)
    for (let i = 0; i < weatherDescriptions.length; i++) {
      if (weatherDesc.toLowerCase().includes(weatherDescriptions[i]))
        return weatherDescriptions[i]
    }
    return 'none'
  }

  const {addCityData, citiesData} = useContext(CitiesDataContext)

  const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${cityName}`
  const {loading, response} = useFetch<City>(url)

  useEffect(() => {
    if (response?.request?.query) {
      addCityData({cityName, newCity: response})
    }
  }, [addCityData, cityName, response])

  const cityData = citiesData[cityName]

  const getCityData = (() => {
    if (cityData?.location)
      return {
        country: cityData.location.country,
        weatherDesc: cityData.current.weather_descriptions[0].includes(',')
          ? cityData.current.weather_descriptions[0]
              .split(' ')[0]
              .replace(',', '')
          : cityData.current.weather_descriptions[0],
        temperature: `${cityData.current.temperature}`,
        weatherImage: cityData.current.weather_icons[0],
      }

    if (loading)
      return {
        country: '...',
        weatherDesc: '',
        temperature: '..',
        weatherImage: undefined,
      }

    return {
      country: 'N/A',
      weatherDesc: '',
      temperature: 'N/A',
      weatherImage: undefined,
    }
  })()

  return (
    <li className={styles.container}>
      <div className={styles.contentRow}>
        <div className="flex-1 truncate mr-3">
          <div className={styles.textColumn}>
            <h3 className="text-gray-600 text-sm leading-snug font-medium flex-shrink-0">
              {cityName}
            </h3>
            <span
              data-testid="weather-desc"
              className={`${styles.weatherDesc} truncate ${
                weatherDescColors[getWeatherDesc(getCityData.weatherDesc)]
              }`}
            >
              {getCityData.weatherDesc}
            </span>
          </div>
          <p className="mt-1 text-gray-500 text-sm leading-snug truncate">
            {getCityData.country}
          </p>
        </div>
        <div className="flex">
          <h3 className="text-gray-600 text-3xl mr-2 leading-snug font-medium truncate">
            {getCityData.temperature}
            {/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/.test(
              getCityData.temperature,
            ) ? (
              <>&#8451;</>
            ) : (
              ''
            )}
          </h3>
          <img className={styles.image} src={getCityData.weatherImage} alt="" />
        </div>
      </div>
      <div className={styles.actionBtns}>
        <div className="-mt-px flex">
          <div className={styles.favorite}>
            <button
              type="button"
              onClick={isFavorite ? removeFavorite : addFavorite}
              className={styles.button}
            >
              <HeartIcon
                strokeColor={isFavorite ? 'text-white' : 'text-red'}
                fillColor={isFavorite ? '#f02849' : 'white'}
              />
              <span className="ml-3">{isFavorite ? 'Unlike' : 'Like'}</span>
            </button>
          </div>
          <div className={styles.remove}>
            <button type="button" onClick={onDelete} className={styles.button}>
              <RemoveIcon />
              <span className="ml-3">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
