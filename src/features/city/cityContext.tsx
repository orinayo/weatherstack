import React, {
  useReducer,
  createContext,
  useCallback,
  FC,
  useEffect,
} from 'react'
import {useLocalStorage} from 'hooks/useLocalStorage'
import {citiesDataReducer, CitiesDataState} from './cityReducer'
import {
  ADD_CITY_DATA,
  REMOVE_CITY_DATA,
  UNDO_REMOVE_CITY_DATA,
} from './cityConstants'
import {City} from './City.types'

export const CitiesDataContext = createContext<{
  citiesData: Record<string, City>
  addCityData(cityData: {cityName: string; newCity: City}): void
  removeCityData(city: string): void
  undoRemoveCityData(): void
}>({
  citiesData: {},
  addCityData: _newCity => {},
  removeCityData: _city => {},
  undoRemoveCityData: () => {},
})

const initialCitiesData: Record<string, City> = {}

export const CitiesDataProvider: FC = ({children}) => {
  const {cacheValues, updateCacheValues} = useLocalStorage(
    initialCitiesData,
    'citiesData',
  )
  const defaultState: CitiesDataState = {
    past: [],
    present: cacheValues,
    future: [],
  }
  const [state, dispatch] = useReducer(citiesDataReducer, defaultState)
  const citiesData = state.present

  const addCityData = useCallback(
    (cityData: {cityName: string; newCity: City}) => {
      dispatch({
        type: ADD_CITY_DATA,
        payload: cityData,
      })
    },
    [],
  )

  const undoRemoveCityData = useCallback(() => {
    dispatch({type: UNDO_REMOVE_CITY_DATA})
  }, [dispatch])

  const removeCityData = useCallback(city => {
    dispatch({
      type: REMOVE_CITY_DATA,
      payload: city,
    })
  }, [])

  useEffect(() => {
    updateCacheValues(citiesData)
  }, [citiesData, updateCacheValues])

  return (
    <CitiesDataContext.Provider
      value={{
        citiesData,
        addCityData,
        removeCityData,
        undoRemoveCityData,
      }}
    >
      {children}
    </CitiesDataContext.Provider>
  )
}
