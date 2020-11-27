import React from 'react'
import {render, screen} from '@testing-library/react'
import {Tabs} from './Tabs'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router'
import styles from './Tabs.module.css'

const renderWithRouter = (
  ui: JSX.Element,
  {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  }
}

describe('Tabs', () => {
  test(`renders with the user location, and two tabs for "All Places" and "Favorites"`, () => {
    renderWithRouter(<Tabs />)
    const allPlacesTabNode = screen.getByText(/all places/i)
    const favoritesTabNode = screen.getByText(/favorites/i)
    expect(allPlacesTabNode).toBeDefined()
    expect(allPlacesTabNode).toHaveClass(styles.selected)
    expect(favoritesTabNode).toBeDefined()
    expect(favoritesTabNode).not.toHaveClass(styles.selected)
  })
  test(`add selected class to All Places tab on "/" route`, () => {
    renderWithRouter(<Tabs />)
    const allPlacesTabNode = screen.getByText(/all places/i)
    const favoritesTabNode = screen.getByText(/favorites/i)
    expect(allPlacesTabNode).toHaveClass(styles.selected)
    expect(favoritesTabNode).not.toHaveClass(styles.selected)
  })
  test(`renders with the user location, and two tabs for "All Places" and "Favorites"`, () => {
    renderWithRouter(<Tabs />, {route: '/favorites'})
    const allPlacesTabNode = screen.getByText(/all places/i)
    const favoritesTabNode = screen.getByText(/favorites/i)
    expect(allPlacesTabNode).not.toHaveClass(styles.selected)
    expect(favoritesTabNode).toHaveClass(styles.selected)
  })
})
