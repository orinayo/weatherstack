import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UNDO_REMOVE_FAVORITE,
} from '../favoritesConstants'
import {favoritesReducer} from '../favoritesReducer'

describe('favoritesReducer', () => {
  test('adds a city', () => {
    expect(
      favoritesReducer(
        {
          past: [],
          present: [],
          future: [],
        },
        {
          type: ADD_FAVORITE,
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
      favoritesReducer(
        {
          past: [['London'], []],
          present: ['New York', 'London'],
          future: [],
        },
        {
          type: ADD_FAVORITE,
          payload: 'New York',
        },
      ).present,
    ).toHaveLength(2)
  })
  test('removes a city', () => {
    expect(
      favoritesReducer(
        {
          past: [['Paris'], []],
          present: ['New York', 'Paris'],
          future: [],
        },
        {
          type: REMOVE_FAVORITE,
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
      favoritesReducer(
        {
          past: [['New York', 'Paris'], ['Paris'], []],
          present: ['Paris'],
          future: [],
        },
        {
          type: UNDO_REMOVE_FAVORITE,
        },
      ),
    ).toEqual({
      past: [['Paris'], []],
      present: ['New York', 'Paris'],
      future: [['Paris']],
    })
  })
})
