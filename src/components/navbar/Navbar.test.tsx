import React from 'react'
import {render, screen} from '@testing-library/react'
import {Navbar} from './Navbar'

describe('Navbar', () => {
  test(`renders a text area with a placeholder "Search new place..."`, () => {
    render(<Navbar />)
    const searchBarNode = screen.getByPlaceholderText(/search new place.../i)
    expect(searchBarNode).toBeDefined()
  })
})
