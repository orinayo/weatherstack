import React, {
  useReducer,
  createContext,
  useCallback,
  FC,
  useEffect,
} from 'react'
import {toast} from 'react-toastify'
import log from 'loglevel'
import {citiesReducer, CitiesState} from './citiesReducer'
import {ADD_CITY, REMOVE_CITY, UNDO_REMOVE_CITY} from './citiesConstants'
import {useLocalStorage} from 'hooks/useLocalStorage'

export const CitiesContext = createContext<{
  cities: string[]
  isPast: boolean
  isFuture: boolean
  addCity(newCity: string): void
  removeCity(city: string): void
  undoRemoveCity(): void
}>({
  cities: [],
  isPast: false,
  isFuture: false,
  addCity: newCity => {
    log.warn(newCity)
  },
  removeCity: city => {
    log.warn(city)
  },
  undoRemoveCity: () => {
    log.warn('hello')
  },
})

const initialCities = [
  'Beijing',
  'Buenos Aires',
  'Cairo',
  'Chongqing',
  'Delhi',
  'Dhaka',
  'Istanbul',
  'Karachi',
  'Mexico City',
  'Mumbai',
  'New York',
  'Osaka',
  'Sao Paulo',
  'Shanghai',
  'Tokyo',
]

const Msg: FC<{undoDelete: () => void; city: string}> = ({
  undoDelete,
  city,
}) => (
  <div className="text-sm flex items-center justify-around">
    <p>{city} has been removed</p>
    <button className="align-center btn" onClick={undoDelete}>
      Undo
    </button>
  </div>
)

export const CitiesProvider: FC = ({children}) => {
  const {cacheValues, updateCacheValues} = useLocalStorage(
    initialCities,
    'cities',
  )
  const defaultState: CitiesState = {
    past: [],
    present: cacheValues,
    future: [],
  }
  const [state, dispatch] = useReducer(citiesReducer, defaultState)
  const cities = state.present
  const isPast = !!state.past.length
  const isFuture = !!state.future.length

  const addCity = useCallback(
    city => {
      dispatch({
        type: ADD_CITY,
        payload: city,
      })
    },
    [dispatch],
  )

  const undoRemoveCity = useCallback(() => {
    dispatch({type: UNDO_REMOVE_CITY})
  }, [dispatch])

  const removeCity = useCallback(
    city => {
      dispatch({
        type: REMOVE_CITY,
        payload: city,
      })
      if (cities.length) {
        toast.info(<Msg undoDelete={undoRemoveCity} city={city} />)
      }
    },
    [cities.length, undoRemoveCity],
  )

  useEffect(() => {
    updateCacheValues(cities)
  }, [cities, updateCacheValues])

  return (
    <CitiesContext.Provider
      value={{
        cities: cities.sort(),
        addCity,
        removeCity,
        undoRemoveCity,
        isPast,
        isFuture,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}
