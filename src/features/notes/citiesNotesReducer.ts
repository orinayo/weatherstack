import {
  ADD_CITY_NOTE,
  REMOVE_CITY_NOTE,
  EDIT_CITY_NOTE,
} from './citiesNotesConstants'
import {Note} from './CityNote'

type AddCityNoteAction = {
  type: typeof ADD_CITY_NOTE
  payload: {city: string; note: Note}
}

type RemoveCityNoteAction = {
  type: typeof REMOVE_CITY_NOTE
  payload: {city: string; id: string}
}

type EditCityNoteAction = {
  type: typeof EDIT_CITY_NOTE
  payload: {city: string; note: Note}
}

export type CitiesNotesState = Record<string, Record<string, Note>>

export type CitiesNotesActions =
  | AddCityNoteAction
  | RemoveCityNoteAction
  | EditCityNoteAction

export const citiesNotesReducer = (
  state: CitiesNotesState,
  action: CitiesNotesActions,
): CitiesNotesState => {
  if (action.type === ADD_CITY_NOTE) {
    const newState = {
      ...state,
      [action.payload.city]: {
        ...state[action.payload.city],
        [action.payload.note.id]: action.payload.note,
      },
    }

    return newState
  }

  if (action.type === EDIT_CITY_NOTE) {
    const newState = {
      ...state,
      [action.payload.city]: {
        ...state[action.payload.city],
        [action.payload.note.id]: action.payload.note,
      },
    }

    return newState
  }

  if (action.type === REMOVE_CITY_NOTE) {
    const stateCopy = {...state}
    const {[action.payload.city]: cityNotes, ...rest} = stateCopy
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {[action.payload.id]: _, ...remainingNotes} = cityNotes
    return {...rest, [action.payload.city]: remainingNotes}
  }

  return state
}
