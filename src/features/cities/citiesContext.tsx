import React, {
  useReducer,
  createContext,
  useCallback,
  FC,
  useEffect,
} from 'react'
import {toast} from 'react-toastify'
import {citiesReducer, CitiesState} from './citiesReducer'
import {
  ADD_CITY,
  initialCities,
  REMOVE_CITY,
  UNDO_REMOVE_CITY,
} from './citiesConstants'
import {useLocalStorage} from 'hooks/useLocalStorage'
import {ToastMsg} from 'components/toastMsg/toastMsg'

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
  addCity: newCity => {},
  removeCity: city => {},
  undoRemoveCity: () => {},
})

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
        toast(
          <ToastMsg
            undoDelete={undoRemoveCity}
            message={`${city} has been removed`}
          />,
        )
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
