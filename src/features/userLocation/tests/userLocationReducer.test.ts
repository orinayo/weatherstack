import {
  SET_PERM_STATUS,
  SET_SUBSCRIBED,
  SET_COORDINATES,
} from '../userLocationConstants'
import {userLocationReducer, UserLocationActions} from '../userLocationReducer'

describe('userLocationReducer', () => {
  test('set permission status', () => {
    expect(
      userLocationReducer(
        {
          coords: {lat: 0, lon: 0},
          isSubscribed: false,
          permStatus: '',
        },
        {
          type: SET_PERM_STATUS,
          payload: 'granted',
        },
      ),
    ).toEqual({
      coords: {lat: 0, lon: 0},
      isSubscribed: false,
      permStatus: 'granted',
    })
  })

  test('sets subscribed', () => {
    expect(
      userLocationReducer(
        {
          coords: {lat: 0, lon: 0},
          isSubscribed: false,
          permStatus: '',
        },
        {
          type: SET_SUBSCRIBED,
          payload: true,
        },
      ),
    ).toEqual({
      coords: {lat: 0, lon: 0},
      isSubscribed: true,
      permStatus: '',
    })
  })

  test('sets coordinates', () => {
    expect(
      userLocationReducer(
        {
          coords: {lat: 0, lon: 0},
          isSubscribed: false,
          permStatus: '',
        },
        {
          type: SET_COORDINATES,
          payload: {lat: 12.2323, lon: 5.024},
        },
      ),
    ).toEqual({
      coords: {lat: 12.2323, lon: 5.024},
      isSubscribed: false,
      permStatus: '',
    })
  })

  test('returns initial state if action type does not match', () => {
    const fooAction = ({
      type: 'FOO',
    } as unknown) as UserLocationActions
    expect(
      userLocationReducer(
        {
          coords: {lat: 0, lon: 0},
          isSubscribed: false,
          permStatus: '',
        },
        fooAction,
      ),
    ).toEqual({
      coords: {lat: 0, lon: 0},
      isSubscribed: false,
      permStatus: '',
    })
  })
})
