import React, {
  useReducer,
  createContext,
  useCallback,
  FC,
  useEffect,
} from 'react'
import {toast} from 'react-toastify'
import log from 'loglevel'
import {favoritesReducer, FavoritesState} from './favoritesReducer'
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UNDO_REMOVE_FAVORITE,
} from './favoritesConstants'
import {useLocalStorage} from 'hooks/useLocalStorage'
import {useLocation} from 'react-router'

export const FavoritesContext = createContext<{
  favorites: string[]
  isPast: boolean
  isFuture: boolean
  addFavorite(newCity: string): void
  removeFavorite(city: string): void
  undoRemoveFavorite(): void
}>({
  favorites: [],
  isPast: false,
  isFuture: false,
  addFavorite: newCity => {
    log.warn(newCity)
  },
  removeFavorite: city => {
    log.warn(city)
  },
  undoRemoveFavorite: () => {
    log.warn('hello')
  },
})

const initialFavorites: string[] = []

const Msg: FC<{undoDelete: () => void; city: string}> = ({
  undoDelete,
  city,
}) => (
  <div className="text-sm flex items-center justify-around">
    <p>{city} has been unliked</p>
    <button className="align-center btn" onClick={undoDelete}>
      Undo
    </button>
  </div>
)

export const FavoritesProvider: FC = ({children}) => {
  const {cacheValues, updateCacheValues} = useLocalStorage(
    initialFavorites,
    'favorites',
  )
  const defaultState: FavoritesState = {
    past: [],
    present: cacheValues,
    future: [],
  }
  const [state, dispatch] = useReducer(favoritesReducer, defaultState)
  const {pathname} = useLocation()
  const favorites = state.present
  const isPast = !!state.past.length
  const isFuture = !!state.future.length

  const addFavorite = useCallback(
    city => {
      dispatch({
        type: ADD_FAVORITE,
        payload: city,
      })
    },
    [dispatch],
  )

  const undoRemoveFavorite = useCallback(() => {
    dispatch({type: UNDO_REMOVE_FAVORITE})
  }, [dispatch])

  const removeFavorite = useCallback(
    city => {
      dispatch({
        type: REMOVE_FAVORITE,
        payload: city,
      })
      if (favorites.length && pathname === '/favorites') {
        toast.info(<Msg undoDelete={undoRemoveFavorite} city={city} />)
      }
    },
    [favorites.length, pathname, undoRemoveFavorite],
  )

  useEffect(() => {
    updateCacheValues(favorites)
  }, [favorites, updateCacheValues])

  return (
    <FavoritesContext.Provider
      value={{
        favorites: favorites.sort(),
        addFavorite,
        removeFavorite,
        undoRemoveFavorite,
        isPast,
        isFuture,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
