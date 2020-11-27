import {ADD_CITY, REMOVE_CITY, UNDO_REMOVE_CITY} from '../citiesConstants'
import {citiesReducer} from '../citiesReducer'

describe('citiesReducer', () => {
  test('adds a city', () => {
    expect(
      citiesReducer(
        {
          past: [],
          present: [],
          future: [],
        },
        {
          type: ADD_CITY,
          payload: 'New York',
        },
      ),
    ).toEqual({
      past: [[]],
      present: ['New York'],
      future: [],
    })
  })
  test('does not add an existing city', () => {
    expect(
      citiesReducer(
        {
          past: [['London'], []],
          present: ['New York', 'London'],
          future: [],
        },
        {
          type: ADD_CITY,
          payload: 'New York',
        },
      ).present,
    ).toHaveLength(2)
  })
  test('removes a city', () => {
    expect(
      citiesReducer(
        {
          past: [['Paris'], []],
          present: ['New York', 'Paris'],
          future: [],
        },
        {
          type: REMOVE_CITY,
          payload: 'New York',
        },
      ),
    ).toEqual({
      past: [['New York', 'Paris'], ['Paris'], []],
      present: ['Paris'],
      future: [],
    })
  })

  test('undo previous change', () => {
    expect(
      citiesReducer(
        {
          past: [['New York', 'Paris'], ['Paris'], []],
          present: ['Paris'],
          future: [],
        },
        {
          type: UNDO_REMOVE_CITY,
        },
      ),
    ).toEqual({
      past: [['Paris'], []],
      present: ['New York', 'Paris'],
      future: [['Paris']],
    })
  })
})
