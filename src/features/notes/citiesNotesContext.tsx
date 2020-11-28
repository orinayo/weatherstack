import React, {
  useReducer,
  createContext,
  useCallback,
  FC,
  useEffect,
} from 'react'
import {useLocalStorage} from 'hooks/useLocalStorage'
import {citiesNotesReducer, CitiesNotesState} from './citiesNotesReducer'
import {Note} from './CityNote'
import {
  ADD_CITY_NOTE,
  EDIT_CITY_NOTE,
  REMOVE_CITY_NOTE,
} from './citiesNotesConstants'

export const CitiesNoteContext = createContext<{
  citiesNote: Record<string, Record<string, Note>>
  addCityNote(cityData: {city: string; note: Note}): void
  removeCityNote(city: {city: string; id: string}): void
  editCityNote(cityData: {city: string; note: Note}): void
}>({
  citiesNote: {},
  addCityNote: _data => {},
  removeCityNote: _data => {},
  editCityNote: _data => {},
})

const initialCitiesNote: Record<string, Record<string, Note>> = {}

export const CitiesNoteProvider: FC = ({children}) => {
  const {cacheValues, updateCacheValues} = useLocalStorage(
    initialCitiesNote,
    'citiesNote',
  )
  const defaultState: CitiesNotesState = cacheValues
  const [state, dispatch] = useReducer(citiesNotesReducer, defaultState)

  const addCityNote = useCallback((noteData: {city: string; note: Note}) => {
    dispatch({
      type: ADD_CITY_NOTE,
      payload: noteData,
    })
  }, [])

  const editCityNote = useCallback((noteData: {city: string; note: Note}) => {
    dispatch({
      type: EDIT_CITY_NOTE,
      payload: noteData,
    })
  }, [])

  const removeCityNote = useCallback((noteData: {city: string; id: string}) => {
    dispatch({
      type: REMOVE_CITY_NOTE,
      payload: noteData,
    })
  }, [])

  useEffect(() => {
    updateCacheValues(state)
  }, [state, updateCacheValues])

  return (
    <CitiesNoteContext.Provider
      value={{
        citiesNote: state,
        addCityNote,
        removeCityNote,
        editCityNote,
      }}
    >
      {children}
    </CitiesNoteContext.Provider>
  )
}
