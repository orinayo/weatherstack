import React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Cities} from '../Cities'
import {CitiesContext} from '../citiesContext'
import {FavoritesContext} from 'features/favorites/favoritesContext'

function renderCitiesAndFavoritesProvider(
  value: {
    cities: string[]
    isPast: boolean
    isFuture: boolean
    addCity(newCity: string): void
    removeCity(city: string): void
    undoRemoveCity(): void
  },
  favValue: {
    favorites: string[]
    isPast: boolean
    isFuture: boolean
    addFavorite(newFavorite: string): void
    removeFavorite(Favorite: string): void
    undoRemoveFavorite(): void
  },
) {
  return render(
    <CitiesContext.Provider value={value}>
      <FavoritesContext.Provider value={favValue}>
        <Cities />
      </FavoritesContext.Provider>
    </CitiesContext.Provider>,
  )
}

function renderCities(value: {
  cities: string[]
  isPast: boolean
  isFuture: boolean
  addCity(newCity: string): void
  removeCity(city: string): void
  undoRemoveCity(): void
}) {
  return render(
    <CitiesContext.Provider value={value}>
      <Cities />
    </CitiesContext.Provider>,
  )
}

describe('CitiesContext', () => {
  test('renders list of cities', () => {
    renderCities({
      cities: ['New York'],
      isPast: false,
      isFuture: false,
      addCity: jest.fn(),
      removeCity: jest.fn(),
      undoRemoveCity: jest.fn(),
    })
    expect(screen.getByText(/new york/i)).toBeInTheDocument()
  })

  test('renders empty response element if no cities exist', () => {
    renderCities({
      cities: [],
      isPast: false,
      isFuture: false,
      addCity: jest.fn(),
      removeCity: jest.fn(),
      undoRemoveCity: jest.fn(),
    })
    const emptyDataNode = screen.getByText(/no information to display/i)
    const imageNode = screen.getByAltText(/empty response/i)
    expect(emptyDataNode).toBeDefined()
    expect(imageNode).toBeDefined()
  })

  test('calls removeCity function when remove button is clicked', async () => {
    const removeCity = jest.fn()
    renderCities({
      cities: ['New York'],
      isPast: false,
      isFuture: false,
      addCity: jest.fn(),
      removeCity,
      undoRemoveCity: jest.fn(),
    })
    user.click(screen.getByText(/remove/i))
    expect(removeCity).toHaveBeenCalledTimes(1)
  })

  test('calls addFavorite function when like button is clicked', async () => {
    const addFavorite = jest.fn()
    renderCitiesAndFavoritesProvider(
      {
        cities: ['New York'],
        isPast: false,
        isFuture: false,
        addCity: jest.fn(),
        removeCity: jest.fn(),
        undoRemoveCity: jest.fn(),
      },
      {
        favorites: [],
        isPast: false,
        isFuture: false,
        removeFavorite: jest.fn(),
        addFavorite,
        undoRemoveFavorite: jest.fn(),
      },
    )
    user.click(screen.getByText(/like/i))
    expect(addFavorite).toHaveBeenCalledTimes(1)
  })

  test('calls addFavorite function when unlike button is clicked', async () => {
    const removeFavorite = jest.fn()
    renderCitiesAndFavoritesProvider(
      {
        cities: ['New York'],
        isPast: false,
        isFuture: false,
        addCity: jest.fn(),
        removeCity: jest.fn(),
        undoRemoveCity: jest.fn(),
      },
      {
        favorites: ['New York'],
        isPast: false,
        isFuture: false,
        addFavorite: jest.fn(),
        removeFavorite,
        undoRemoveFavorite: jest.fn(),
      },
    )
    user.click(screen.getByText(/unlike/i))
    expect(removeFavorite).toHaveBeenCalledTimes(1)
  })
})
