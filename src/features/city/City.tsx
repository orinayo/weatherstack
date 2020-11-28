import React, {FC, useContext, useEffect, useRef, useState} from 'react'
import {TextArea} from 'components/textArea/TextArea'
import {v4 as uuidv4} from 'uuid'
import styles from './City.module.css'
import {useRouteMatch} from 'react-router'
import {CityNote} from '../notes/CityNote'
import {useFetch} from 'hooks/useFetch'
import {City} from './City.types'
import {CitiesNoteContext} from 'features/notes/citiesNotesContext'
import {CitiesDataContext} from './cityContext'

export const CityData: FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const {
    params: {city},
  } = useRouteMatch<{city: string}>()
  const [editNoteId, setEditNoteId] = useState('')
  const {citiesNote, removeCityNote, addCityNote, editCityNote} = useContext(
    CitiesNoteContext,
  )
  const {addCityData, citiesData} = useContext(CitiesDataContext)
  const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${city}`
  const {loading, response} = useFetch<City>(url)

  const cityNotes = citiesNote[city]

  const cityData = citiesData[city]

  const renderCityNotes = () => {
    if (cityNotes) {
      const ids = Object.keys(cityNotes)
      return ids.map(noteId => (
        <li key={noteId}>
          <CityNote
            note={cityNotes[noteId]}
            onDelete={() => {
              removeCityNote({city, id: noteId})
              if (editNoteId === noteId) {
                setEditNoteId('')
                inputRef.current!.value = ''
              }
            }}
            onEdit={() => {
              setEditNoteId(noteId)
              inputRef.current!.value = cityNotes[noteId].text
            }}
          />
        </li>
      ))
    }
    return null
  }

  const getCityData = (() => {
    if (cityData?.location)
      return {
        location: `${cityData.location.name}, ${cityData.location.country}`,
        currDate: cityData.location.localtime.split(' ')[0],
        weatherDesc: cityData.current.weather_descriptions[0].includes(',')
          ? cityData.current.weather_descriptions[0]
              .split(' ')[0]
              .replace(',', '')
          : cityData.current.weather_descriptions[0],
        temperature: `${cityData.current.temperature}`,
        weatherImage: cityData.current.weather_icons[0],
        pressure: cityData.current.pressure,
        feelsLike: cityData.current.feelslike,
        humidity: cityData.current.humidity,
        windSpeed: cityData.current.wind_speed,
        precipitation: cityData.current.precip,
        uvIndex: cityData.current.uv_index,
      }

    if (loading)
      return {
        location: '...',
        currDate: '...',
        weatherDesc: '',
        temperature: '..',
        feelsLike: '..',
        humidity: '..',
        pressure: '..',
        windSpeed: '..',
        precipitation: '..',
        uvIndex: '..',
        weatherImage: undefined,
      }

    return {
      location: 'N/A',
      currDate: '',
      weatherDesc: '',
      temperature: 'N/A',
      feelsLike: 'N/A',
      humidity: 'N/A',
      pressure: 'N/A',
      windSpeed: 'N/A',
      precipitation: 'N/A',
      uvIndex: 'N/A',
      weatherImage: undefined,
    }
  })()

  useEffect(() => {
    if (response?.request?.query) {
      addCityData({cityName: city, newCity: response})
    }
  }, [addCityData, city, response])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current) {
      if (editNoteId) {
        editCityNote({
          city,
          note: {
            createdAt: Date.now(),
            text: inputRef.current?.value || '',
            isEdited: true,
            id: `${editNoteId}`,
          },
        })
      } else {
        addCityNote({
          city,
          note: {
            createdAt: Date.now(),
            text: inputRef.current?.value || '',
            isEdited: false,
            id: uuidv4(),
          },
        })
      }

      inputRef.current.value = ''
      setEditNoteId('')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <form onSubmit={handleSubmit}>
            <TextArea
              inputRef={inputRef}
              inputId="createNote"
              inputName="createNote"
              error=""
            />
            <button type="submit" className={styles.button}>
              Save Note
            </button>
          </form>
          <div className={styles.notes}>
            <h1 className={styles.header}>Notes</h1>
            <ul className={styles.lists}>{renderCityNotes()}</ul>
          </div>
        </div>
        <div className={styles.column}>
          <div className="flex flex-col items-center text-gray-600 flex-1">
            <p className="text-4xl font-light">{getCityData.location}</p>
            <p>{getCityData.currDate}</p>
            <div className="flex items-center py-4">
              <div className="mr-4">
                <h3 className="text-5xl leading-snug font-semibold truncate">
                  {getCityData.temperature}
                  {/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/.test(
                    getCityData.temperature,
                  ) ? (
                    <>&#8451;</>
                  ) : (
                    ''
                  )}
                </h3>
                <p>{getCityData.weatherDesc}</p>
              </div>
              <img
                className={styles.image}
                src={getCityData.weatherImage}
                alt=""
              />
            </div>
            <div className={styles.metaContainer}>
              <p className={styles.meta}>
                <strong>Barometer</strong> {getCityData.pressure}mb
              </p>{' '}
              ·
              <p className={styles.meta}>
                <strong>Feels like</strong> {getCityData.feelsLike}&#8451;
              </p>{' '}
              ·{' '}
              <p className={styles.meta}>
                <strong>Humidity</strong> {getCityData.humidity}%
              </p>
            </div>
            <div className={styles.metaContainer}>
              <p className={styles.meta}>
                <strong>Precipitation</strong> {getCityData.precipitation}mm
              </p>
              ·
              <p className={styles.meta}>
                <strong>UV Index</strong> {getCityData.uvIndex}
              </p>{' '}
              ·
              <p className={styles.meta}>
                <strong>Windspeed</strong> {getCityData.windSpeed}km/h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
