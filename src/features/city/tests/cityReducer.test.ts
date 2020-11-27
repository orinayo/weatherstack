import {
  ADD_CITY_DATA,
  REMOVE_CITY_DATA,
  UNDO_REMOVE_CITY_DATA,
} from '../cityConstants'
import {citiesDataReducer} from '../cityReducer'
import { sampleCity } from './cityFixture'

describe('citiesDataReducer', () => {
  test('adds a city', () => {
    expect(
      citiesDataReducer(
        {
          past: [],
          present: {},
          future: [],
        },
        {
          type: ADD_CITY_DATA,
          payload: {cityName: 'Oakland Gardens', newCity: sampleCity},
        },
      ),
    ).toEqual({
      past: [{}],
      present: {'Oakland Gardens': sampleCity},
      future: [],
    })
  })

  test('removes a city', () => {
    expect(
      citiesDataReducer(
        {
          past: [{}],
          present: {'Oakland Gardens': sampleCity},
          future: [],
        },
        {
          type: REMOVE_CITY_DATA,
          payload: 'Oakland Gardens',
        },
      ),
    ).toEqual({
      past: [{'Oakland Gardens': sampleCity}, {}],
      present: {},
      future: [],
    })
  })

  test('undo previous change', () => {
    expect(
      citiesDataReducer(
        {
          past: [{'Oakland Gardens': sampleCity}, {}],
          present: {},
          future: [],
        },
        {
          type: UNDO_REMOVE_CITY_DATA,
        },
      ),
    ).toEqual({
      past: [{}],
      present: {'Oakland Gardens': sampleCity},
      future: [{}],
    })
  })
})
