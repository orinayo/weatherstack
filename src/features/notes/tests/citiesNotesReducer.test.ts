import {
  ADD_CITY_NOTE,
  REMOVE_CITY_NOTE,
  EDIT_CITY_NOTE,
} from '../citiesNotesConstants'
import {citiesNotesReducer, CitiesNotesActions} from '../citiesNotesReducer'

const createdAt = Date.now()

describe('citiesNotesReducer', () => {
  test('adds a note', () => {
    expect(
      citiesNotesReducer(
        {},
        {
          type: ADD_CITY_NOTE,
          payload: {
            city: 'Oakland Gardens',
            note: {
              createdAt,
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
      ),
    ).toEqual({
      'Oakland Gardens': {
        '01': {
          createdAt,
          text: 'Lorem ipsum dolor sit amet.',
          isEdited: false,
          id: '01',
        },
      },
    })
  })

  test('removes a note', () => {
    expect(
      citiesNotesReducer(
        {
          'Oakland Gardens': {
            '01': {
              createdAt,
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
        {
          type: REMOVE_CITY_NOTE,
          payload: {city: 'Oakland Gardens', id: '01'},
        },
      ),
    ).toEqual({
      'Oakland Gardens': {},
    })
  })

  test('edits a note', () => {
    expect(
      citiesNotesReducer(
        {
          'Oakland Gardens': {
            '01': {
              createdAt,
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
        {
          type: EDIT_CITY_NOTE,
          payload: {
            city: 'Oakland Gardens',
            note: {
              createdAt,
              text: 'Updated note.',
              isEdited: true,
              id: '01',
            },
          },
        },
      ),
    ).toEqual({
      'Oakland Gardens': {
        '01': {
          createdAt,
          text: 'Updated note.',
          isEdited: true,
          id: '01',
        },
      },
    })
  })

  test('returns initial state if action type does not match', () => {
    const fooAction = ({
      type: 'FOO',
    } as unknown) as CitiesNotesActions
    expect(
      citiesNotesReducer(
        {
          'Oakland Gardens': {
            '01': {
              createdAt,
              text: 'Lorem ipsum dolor sit amet.',
              isEdited: false,
              id: '01',
            },
          },
        },
        fooAction,
      ),
    ).toEqual({
      'Oakland Gardens': {
        '01': {
          createdAt,
          text: 'Lorem ipsum dolor sit amet.',
          isEdited: false,
          id: '01',
        },
      },
    })
  })
})
