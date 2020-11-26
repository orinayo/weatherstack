import React from 'react'
import {render, screen} from '@testing-library/react'
import {Searchbar} from './Searchbar'

describe('Searchbar', () => {
  test(`renders a text area with a placeholder "Search new place..."`, () => {
    render(<Searchbar />)
    const searchBarNode = screen.getByPlaceholderText(/search new place.../i)
    expect(searchBarNode).toBeDefined()
  })
})
