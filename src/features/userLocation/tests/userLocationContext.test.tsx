import React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {City} from 'features/city/City.types'
import {UserLocation} from '../UserLocation'
import {UserLocationContext} from '../userLocationContext'
import {sampleCity} from 'features/city/tests/cityFixture'
import {UserLocationData} from '../UserLocationData'

Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  },
  configurable: true,
})

function renderUserLocation(value: {
  isSubscribed: boolean
  permStatus: string
  userLocationData: City | null
  getLocation(): void
}) {
  return render(
    <UserLocationContext.Provider value={value}>
      <UserLocation />
    </UserLocationContext.Provider>,
  )
}

function renderUserLocationData(value: {
  isSubscribed: boolean
  permStatus: string
  userLocationData: City | null
  getLocation(): void
}) {
  return render(
    <UserLocationContext.Provider value={value}>
      <UserLocationData />
    </UserLocationContext.Provider>,
  )
}

describe('UserLocationContext', () => {
  test('renders "Geolocation permission is denied" if permission is denied', () => {
    renderUserLocation({
      isSubscribed: false,
      permStatus: 'denied',
      userLocationData: null,
      getLocation: jest.fn,
    })
    expect(
      screen.getByText(/geolocation permission is denied/i),
    ).toBeInTheDocument()
  })

  test('renders null if permission status is not set', () => {
    renderUserLocation({
      isSubscribed: false,
      permStatus: '',
      userLocationData: null,
      getLocation: jest.fn,
    })
    expect(screen.queryByText(/Share location/i)).not.toBeInTheDocument()
  })

  test('renders "Your location: Oakland Gardens" when permission is granted', () => {
    renderUserLocation({
      isSubscribed: false,
      permStatus: 'granted',
      userLocationData: sampleCity,
      getLocation: jest.fn,
    })
    expect(
      screen.getByText(/your location: oakland gardens/i),
    ).toBeInTheDocument()
  })

  test('renders "Share location" when permission status is prompt', () => {
    renderUserLocation({
      isSubscribed: false,
      permStatus: 'prompt',
      userLocationData: null,
      getLocation: jest.fn,
    })
    expect(screen.getByText(/share location/i)).toBeInTheDocument()
  })

  test('calls getLocation when share location button is clicked', () => {
    const getLocation = jest.fn()
    renderUserLocation({
      isSubscribed: false,
      permStatus: 'prompt',
      userLocationData: null,
      getLocation,
    })
    const buttonNode = screen.getByRole('button')
    user.click(buttonNode)
    expect(getLocation).toHaveBeenCalledTimes(1)
  })

  test("renders 'You can see your locations weather if you share it.' text if permission is not granted", () => {
    renderUserLocationData({
      isSubscribed: false,
      permStatus: 'prompt',
      userLocationData: null,
      getLocation: jest.fn,
    })

    expect(
      screen.getByText(/You can see your location's weather if you share it/),
    ).toBeInTheDocument()
  })

  test("renders user's location weather details when it is available", () => {
    renderUserLocationData({
      isSubscribed: false,
      permStatus: 'granted',
      userLocationData: sampleCity,
      getLocation: jest.fn,
    })
    const imageNode = screen.getByAltText(
      /Oakland Gardens, United States of America/i,
    )
    const dateNode = screen.getByText(/2020-11-27/i)
    const tempNode = screen.getByTestId('city-temp')
    const locationNode = screen.getByText(
      /Oakland Gardens, United States of America/i,
    )
    const feelsLikeNode = screen.getByText(/feels like 11/i)
    const humidityNode = screen.getByText(/72% humidity/i)
    expect(imageNode).toBeDefined()
    expect(dateNode).toBeDefined()
    expect(tempNode).toBeDefined()
    expect(locationNode).toBeDefined()
    expect(feelsLikeNode).toBeDefined()
    expect(humidityNode).toBeDefined()
  })
})
