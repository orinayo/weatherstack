import React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {CitiesDataContext} from '../cityContext'
import {CityData} from '../City'
import {City} from '../City.types'
import {sampleCity} from './cityFixture'
import {Route, Router} from 'react-router'
import {createMemoryHistory} from 'history'
import {CitiesNoteContext} from 'features/notes/citiesNotesContext'
import {Note} from 'features/notes/CityNote'

function renderCitiesDataAndNotes(
  value: {
    citiesData: Record<string, City>
    addCityData(cityData: {cityName: string; newCity: City}): void
    removeCityData(city: string): void
    undoRemoveCityData(): void
  },
  noteValue: {
    citiesNote: Record<string, Record<string, Note>>
    addCityNote(cityData: {city: string; note: Note}): void
    removeCityNote(city: {city: string; id: string}): void
    editCityNote(cityData: {city: string; note: Note}): void
  },
) {
  const history = createMemoryHistory({
    initialEntries: ['/city/Oakland Gardens'],
  })
  return render(
    <CitiesDataContext.Provider value={value}>
      <CitiesNoteContext.Provider value={noteValue}>
        <Router history={history}>
          <Route path="/city/:city" component={CityData} />
        </Router>
      </CitiesNoteContext.Provider>
    </CitiesDataContext.Provider>,
  )
}

function renderCitiesData(value: {
  citiesData: Record<string, City>
  addCityData(cityData: {cityName: string; newCity: City}): void
  removeCityData(city: string): void
  undoRemoveCityData(): void
}) {
  const history = createMemoryHistory({
    initialEntries: ['/city/Oakland Gardens'],
  })
  return render(
    <CitiesDataContext.Provider value={value}>
      <Router history={history}>
        <Route path="/city/:city" component={CityData} />
      </Router>
    </CitiesDataContext.Provider>,
  )
}

describe('CitiesDataContext', () => {
  test('renders city data', () => {
    renderCitiesData({
      citiesData: {'Oakland Gardens': sampleCity},
      addCityData: jest.fn(),
      removeCityData: jest.fn(),
      undoRemoveCityData: jest.fn(),
    })
    expect(screen.getByText(/oakland gardens/i)).toBeInTheDocument()
  })

  test('renders city notes', () => {
    renderCitiesDataAndNotes(
      {
        citiesData: {'Oakland Gardens': sampleCity},
        addCityData: jest.fn(),
        removeCityData: jest.fn(),
        undoRemoveCityData: jest.fn(),
      },
      {
        citiesNote: {
          'Oakland Gardens': {
            '01': {
              createdAt: Date.now(),
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
        addCityNote: jest.fn(),
        removeCityNote: jest.fn(),
        editCityNote: jest.fn(),
      },
    )
    expect(screen.getByText(/lorem ipsum dolor sit amet/i)).toBeInTheDocument()
  })

  test('calls removeCityNote function when the remove button is clicked', () => {
    const removeCityNote = jest.fn()
    renderCitiesDataAndNotes(
      {
        citiesData: {'Oakland Gardens': sampleCity},
        addCityData: jest.fn(),
        removeCityData: jest.fn(),
        undoRemoveCityData: jest.fn(),
      },
      {
        citiesNote: {
          'Oakland Gardens': {
            '01': {
              createdAt: Date.now(),
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
        addCityNote: jest.fn(),
        removeCityNote,
        editCityNote: jest.fn(),
      },
    )
    const removeButtonNode = screen.getByTestId('remove-note')
    user.click(removeButtonNode)
    expect(removeCityNote).toHaveBeenCalledTimes(1)
  })

  test('calls editCityNote function when the edit button is clicked', () => {
    const editCityNote = jest.fn()
    renderCitiesDataAndNotes(
      {
        citiesData: {'Oakland Gardens': sampleCity},
        addCityData: jest.fn(),
        removeCityData: jest.fn(),
        undoRemoveCityData: jest.fn(),
      },
      {
        citiesNote: {
          'Oakland Gardens': {
            '01': {
              createdAt: Date.now(),
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
        addCityNote: jest.fn(),
        removeCityNote: jest.fn(),
        editCityNote,
      },
    )
    const textAreaNode = screen.getByPlaceholderText(/type here/i)
    const editButtonNode = screen.getByTestId('edit-note')
    expect(textAreaNode).toBeInTheDocument()
    user.click(editButtonNode)
    expect(textAreaNode).toHaveValue('Lorem ipsum dolor sit amet.')
  })

  test('can create a new note', () => {
    const addCityNote = jest.fn()
    renderCitiesDataAndNotes(
      {
        citiesData: {'Oakland Gardens': sampleCity},
        addCityData: jest.fn(),
        removeCityData: jest.fn(),
        undoRemoveCityData: jest.fn(),
      },
      {
        citiesNote: {
          'Oakland Gardens': {
            '01': {
              createdAt: Date.now(),
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
        editCityNote: jest.fn(),
        removeCityNote: jest.fn(),
        addCityNote,
      },
    )
    const textAreaNode = screen.getByPlaceholderText(/type here/i)
    const submitButtonNode = screen.getByText(/save note/i)
    user.type(textAreaNode, 'Another note to create')
    user.click(submitButtonNode)
    expect(addCityNote).toHaveBeenCalledTimes(1)
    expect(textAreaNode).toHaveValue('')
  })

  test('can edit an existing note', () => {
    const editCityNote = jest.fn()
    renderCitiesDataAndNotes(
      {
        citiesData: {'Oakland Gardens': sampleCity},
        addCityData: jest.fn(),
        removeCityData: jest.fn(),
        undoRemoveCityData: jest.fn(),
      },
      {
        citiesNote: {
          'Oakland Gardens': {
            '01': {
              createdAt: Date.now(),
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
        addCityNote: jest.fn(),
        removeCityNote: jest.fn(),
        editCityNote,
      },
    )

    const editButtonNode = screen.getByTestId('edit-note')
    user.click(editButtonNode)
    const textAreaNode = screen.getByDisplayValue(
      /lorem ipsum dolor sit amet./i,
    )
    const submitButtonNode = screen.getByText(/save note/i)
    user.type(textAreaNode, 'Editing existing note')
    expect(textAreaNode).toHaveValue('Editing existing note')
    user.click(submitButtonNode)
    expect(editCityNote).toHaveBeenCalledTimes(1)
    expect(textAreaNode).toHaveValue('')
  })

  test('clears the text area note being edited is deleted', () => {
    renderCitiesDataAndNotes(
      {
        citiesData: {'Oakland Gardens': sampleCity},
        addCityData: jest.fn(),
        removeCityData: jest.fn(),
        undoRemoveCityData: jest.fn(),
      },
      {
        citiesNote: {
          'Oakland Gardens': {
            '01': {
              createdAt: Date.now(),
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
        addCityNote: jest.fn(),
        removeCityNote: jest.fn(),
        editCityNote: jest.fn(),
      },
    )

    const textAreaNode = screen.getByPlaceholderText(/type here/i)
    const editButtonNode = screen.getByTestId('edit-note')
    user.click(editButtonNode)
    expect(textAreaNode).toHaveValue('Lorem ipsum dolor sit amet.')
    const removeButtonNode = screen.getByTestId('remove-note')
    user.click(removeButtonNode)
    expect(textAreaNode).toHaveValue('')
  })
})
