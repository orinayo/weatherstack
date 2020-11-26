import {ADD_CITY, REMOVE_CITY, UNDO_REMOVE_CITY} from './citiesConstants'

type AddCityAction = {
  type: typeof ADD_CITY
  payload: string
}

type RemoveCityAction = {
  type: typeof REMOVE_CITY
  payload: string
}

type UndoRemoveCityAction = {
  type: typeof UNDO_REMOVE_CITY
}

export type CitiesState = {
  past: Array<string>[]
  present: string[]
  future: Array<string>[]
}

type CitiesActions = AddCityAction | RemoveCityAction | UndoRemoveCityAction

export const citiesReducer = (
  state: CitiesState,
  action: CitiesActions,
): CitiesState => {
  if (action.type === ADD_CITY) {
    if (state.present.includes(action.payload)) return state
    const newPresent = [action.payload, ...state.present]

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    }
  }

  if (action.type === REMOVE_CITY) {
    const newPresent = state.present.filter(
      city => city.toLowerCase() !== action.payload.toLowerCase(),
    )
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    }
  }

  if (action.type === UNDO_REMOVE_CITY) {
    const [newPresent, ...newPast] = state.past
    return {
      past: newPast,
      present: newPresent,
      future: [state.present, ...state.future],
    }
  }

  return state
}
