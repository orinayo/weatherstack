export async function getCities(cities: string[]) {
  const promises = cities.map(
    async city =>
      await fetch(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${city}`
      )
  )
  await Promise.all(promises)
}
