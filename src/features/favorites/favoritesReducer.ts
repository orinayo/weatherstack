import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UNDO_REMOVE_FAVORITE,
} from './favoritesConstants'

type AddFavoriteAction = {
  type: typeof ADD_FAVORITE
  payload: string
}

type RemoveFavoriteAction = {
  type: typeof REMOVE_FAVORITE
  payload: string
}

type UndoRemoveFavoriteAction = {
  type: typeof UNDO_REMOVE_FAVORITE
}

export type FavoritesState = {
  past: Array<string>[]
  present: string[]
  future: Array<string>[]
}

export type FavoritesActions =
  | AddFavoriteAction
  | RemoveFavoriteAction
  | UndoRemoveFavoriteAction

export const favoritesReducer = (
  state: FavoritesState,
  action: FavoritesActions,
): FavoritesState => {
  if (action.type === ADD_FAVORITE) {
    if (state.present.includes(action.payload)) return state
    const newPresent = [action.payload, ...state.present]

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    }
  }

  if (action.type === REMOVE_FAVORITE) {
    const newPresent = state.present.filter(
      Favorite => Favorite.toLowerCase() !== action.payload.toLowerCase(),
    )
    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: [],
    }
  }

  if (action.type === UNDO_REMOVE_FAVORITE) {
    const [newPresent, ...newPast] = state.past
    return {
      past: newPast,
      present: newPresent,
      future: [state.present, ...state.future],
    }
  }

  return state
}
