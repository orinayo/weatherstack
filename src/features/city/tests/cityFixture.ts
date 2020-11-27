import {City} from 'features/city/City.types'

export const sampleCity: City = {
  request: {
    type: 'LatLon',
    query: 'Lat 40.78 and Lon -73.97',
    language: 'en',
    unit: 'm',
  },
  location: {
    name: 'Oakland Gardens',
    country: 'United States of America',
    region: 'New York',
    lat: '40.754',
    lon: '-73.766',
    timezone_id: 'America/New_York',
    localtime: '2020-11-27 03:56',
    localtime_epoch: 1606449360,
    utc_offset: '-5.0',
  },
  current: {
    observation_time: '08:56 AM',
    temperature: 12,
    weather_code: 113,
    weather_icons: [
      'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png',
    ],
    weather_descriptions: ['Clear'],
    wind_speed: 6,
    wind_degree: 280,
    wind_dir: 'W',
    pressure: 1018,
    precip: 0,
    humidity: 72,
    cloudcover: 0,
    feelslike: 11,
    uv_index: 1,
    visibility: 16,
    is_day: 'no',
  },
}
