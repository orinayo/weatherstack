import React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Favorites} from '../Favorites'
import {FavoritesContext} from '../FavoritesContext'

function renderFavorites(value: {
  favorites: string[]
  isPast: boolean
  isFuture: boolean
  addFavorite(newFavorite: string): void
  removeFavorite(Favorite: string): void
  undoRemoveFavorite(): void
}) {
  return render(
    <FavoritesContext.Provider value={value}>
      <Favorites />
    </FavoritesContext.Provider>,
  )
}

describe('FavoritesContext', () => {
  test('renders list of Favorites', () => {
    renderFavorites({
      favorites: ['New York'],
      isPast: false,
      isFuture: false,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      undoRemoveFavorite: jest.fn(),
    })
    expect(screen.getByText(/new york/i)).toBeInTheDocument()
  })

  test('renders empty response element if no Favorites exist', () => {
    renderFavorites({
      favorites: [],
      isPast: false,
      isFuture: false,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      undoRemoveFavorite: jest.fn(),
    })
    const emptyDataNode = screen.getByText(/no information to display/i)
    const imageNode = screen.getByAltText(/empty response/i)
    expect(emptyDataNode).toBeDefined()
    expect(imageNode).toBeDefined()
  })

  test('calls removeFavorite function when remove button is clicked', () => {
    const removeFavorite = jest.fn()
    renderFavorites({
      favorites: ['New York'],
      isPast: false,
      isFuture: false,
      addFavorite: jest.fn(),
      removeFavorite,
      undoRemoveFavorite: jest.fn(),
    })
    user.click(screen.getByText(/remove/i))
    expect(removeFavorite).toHaveBeenCalledTimes(1)
  })

  test('calls removeFavorite function when unlike button is clicked', () => {
    const removeFavorite = jest.fn()
    renderFavorites({
      favorites: ['New York'],
      isPast: false,
      isFuture: false,
      addFavorite: jest.fn(),
      removeFavorite,
      undoRemoveFavorite: jest.fn(),
    })
    user.click(screen.getByText(/unlike/i))
    expect(removeFavorite).toHaveBeenCalledTimes(1)
  })
})
