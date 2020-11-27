import React, {
  useReducer,
  createContext,
  useCallback,
  FC,
  useEffect,
  useContext,
} from 'react'
import {toast} from 'react-toastify'
import {useLocalStorage} from 'hooks/useLocalStorage'
import {userLocationReducer, UserLocationState} from './userLocationReducer'
import {
  SET_PERM_STATUS,
  SET_SUBSCRIBED,
  SET_COORDINATES,
} from './userLocationConstants'
import {useFetch} from 'hooks/useFetch'
import {City} from 'features/city/City.types'
import {CitiesDataContext} from 'features/city/cityContext'

export const UserLocationContext = createContext<{
  isSubscribed: boolean
  permStatus: string
  userLocationData: City | null
  getLocation(): void
}>({
  isSubscribed: false,
  permStatus: '',
  userLocationData: null,
  getLocation: () => {},
})

const initialCoords = {lat: 0, lon: 0}

export const UserLocationProvider: FC = ({children}) => {
  const {cacheValues, updateCacheValues} = useLocalStorage(
    initialCoords,
    'userLocation',
  )
  const {addCityData, citiesData} = useContext(CitiesDataContext)
  const defaultState: UserLocationState = {
    isSubscribed: false,
    permStatus: '',
    coords: cacheValues,
  }
  const [state, dispatch] = useReducer(userLocationReducer, defaultState)
  const {isSubscribed, permStatus, coords: coordinates} = state

  const setPermStatus = useCallback(
    status => {
      dispatch({
        type: SET_PERM_STATUS,
        payload: status,
      })
    },
    [dispatch],
  )

  const setIsSubscribed = useCallback(
    subscribed => {
      dispatch({
        type: SET_SUBSCRIBED,
        payload: subscribed,
      })
    },
    [dispatch],
  )

  const setCoords = useCallback(
    (coords: {lat: number; lon: number}) => {
      dispatch({
        type: SET_COORDINATES,
        payload: coords,
      })
    },
    [dispatch],
  )

  const getLocation = useCallback(() => {
    const showError: PositionErrorCallback = error => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setIsSubscribed(false)
          setPermStatus('denied')
          toast.warn('User denied the request for Geolocation.')
          break
        case error.POSITION_UNAVAILABLE:
          toast.warn('Location information is unavailable.')
          break
        case error.TIMEOUT:
          toast.warn('The request to get user location timed out.')
          break
        default:
          toast.warn('An unknown error occurred.')
      }
    }

    const showPosition: PositionCallback = position => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    }

    if (navigator.geolocation) {
      setIsSubscribed(true)
      navigator.geolocation.getCurrentPosition(showPosition, showError, {
        timeout: 7000,
      })
    }
  }, [setCoords, setIsSubscribed, setPermStatus])

  const url =
    coordinates.lat !== 0
      ? `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${coordinates.lat},${coordinates.lon}`
      : ''
  const {response: apiResponse} = useFetch<City>(url)

  useEffect(() => {
    const getPermissionStatus = () => {
      navigator.permissions
        .query({name: 'geolocation'})
        .then(function (permissionStatus) {
          setPermStatus(permissionStatus.state)
          if (permissionStatus.state === 'granted') getLocation()
        })
    }
    getPermissionStatus()
  }, [getLocation, setPermStatus])

  useEffect(() => {
    updateCacheValues(coordinates)
  }, [coordinates, updateCacheValues])

  useEffect(() => {
    if (apiResponse) {
      const coordsKey = `${coordinates.lat},${coordinates.lon}`
      addCityData({cityName: coordsKey, newCity: apiResponse})
    }
  }, [addCityData, apiResponse, coordinates.lat, coordinates.lon])

  return (
    <UserLocationContext.Provider
      value={{
        userLocationData:
          citiesData[`${coordinates.lat},${coordinates.lon}`] || null,
        isSubscribed,
        permStatus,
        getLocation,
      }}
    >
      {children}
    </UserLocationContext.Provider>
  )
}
