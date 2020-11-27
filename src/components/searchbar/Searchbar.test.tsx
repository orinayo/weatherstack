import React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Searchbar, SearchItem} from './Searchbar'
import {sampleCity} from 'features/city/tests/cityFixture'

describe('Searchbar', () => {
  test(`renders a text area with a placeholder "Search new place..."`, () => {
    render(<Searchbar />)
    const searchBarNode = screen.getByPlaceholderText(/search new place.../i)
    expect(searchBarNode).toBeDefined()
  })

  test('renders a spinner when querying for city data', async () => {
    const {findByTestId} = render(<Searchbar />)
    const searchBarNode = screen.getByPlaceholderText(/search new place.../i)
    user.type(searchBarNode, 'Abuja')
    const loadingSpinnerNode = await findByTestId('search-loader')
    expect(loadingSpinnerNode).toBeDefined()
  })
})

describe('SearchItem', () => {
  test(`renders response location name and country`, () => {
    render(<SearchItem response={sampleCity} handleAddCity={jest.fn} />)
    expect(
      screen.getByText(/oakland gardens, united states of america/i),
    ).toBeInTheDocument()
  })

  test(`calls handleAddCity when add button is clicked`, () => {
    const handleAddCity = jest.fn()
    render(<SearchItem response={sampleCity} handleAddCity={handleAddCity} />)
    user.click(screen.getByText(/add/i))
    expect(handleAddCity).toHaveBeenCalledTimes(1)
  })
})
