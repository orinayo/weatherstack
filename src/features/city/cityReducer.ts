import {ADD_CITY_DATA, REMOVE_CITY_DATA, UNDO_REMOVE_CITY_DATA} from './cityConstants'
import { City } from './City.types'

type AddCityDataAction = {
  type: typeof ADD_CITY_DATA
  payload: {cityName: string; newCity: City}
}

type RemoveCityDataAction = {
  type: typeof REMOVE_CITY_DATA
  payload: string
}

type UndoRemoveCityDataAction = {
  type: typeof UNDO_REMOVE_CITY_DATA
}

export type CitiesDataState = {
  past: Record<string, City>[]
  present: Record<string, City>
  future: Record<string, City>[]
}

type CitiesDataActions = AddCityDataAction | RemoveCityDataAction | UndoRemoveCityDataAction

export const citiesDataReducer = (
  state: CitiesDataState,
  action: CitiesDataActions,
): CitiesDataState => {
  if (action.type === ADD_CITY_DATA) {
    const newPresent = {
      ...state.present,
      [action.payload.cityName]: action.payload.newCity
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    }
  }

  if (action.type === REMOVE_CITY_DATA) {
    const stateCopy = {...state.present}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {[action.payload]: _, ...newPresent} = stateCopy
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    }
  }

  if (action.type === UNDO_REMOVE_CITY_DATA) {
    const [newPresent, ...newPast] = state.past
    return {
      past: newPast,
      present: newPresent,
      future: [state.present, ...state.future],
    }
  }

  return state
}
