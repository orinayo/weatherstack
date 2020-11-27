import React from 'react'
import {render, screen} from '@testing-library/react'
import {Cities} from '../Cities'
import {CitiesContext} from '../citiesContext'

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
  test('Cities renders list of cities', () => {
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
})
