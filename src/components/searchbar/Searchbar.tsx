  import React, {useContext, useEffect, useState, FC} from 'react'
import SearchIcon from 'assets/search-icon.png'
import {useDebounce} from 'hooks/useDebounce'
import {City} from 'features/city/City.types'
import {useFetch} from 'hooks/useFetch'
import {CitiesContext} from 'features/cities/citiesContext'
import styles from './Searchbar.module.css'
import {CitiesDataContext} from 'features/city/cityContext'
import {useHistory} from 'react-router'

export const SearchItem: FC<{
  response: City
  handleAddCity: () => void
  handleViewCity: () => void
}> = ({response, handleAddCity, handleViewCity}) => (
  <div tabIndex={-1} className={styles.city}>
    <span className={styles.cityName}>
      {response.location.name}, {response.location.country}
    </span>
    <div role="button" onClick={handleAddCity} className={styles.button}>
      Add&nbsp;<span>+</span>
    </div>
    <div role="button" onClick={handleViewCity} className={styles.button}>
      View&nbsp;<span>↵</span>
    </div>
  </div>
)

export const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState('')
  const history = useHistory()
  const {loading, response, error} = useFetch<City>(
    query
      ? `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${query}`
      : '',
  )
  const {addCityData} = useContext(CitiesDataContext)
  const {addCity} = useContext(CitiesContext)
  const debouncedTerm = useDebounce(searchTerm, 500)
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    // @ts-ignore
    setSearchTerm(event.target.value)
  }

  const handleAddCity = () => {
    if (response) {
      addCity(response.request.query)
      addCityData({cityName: response.request.query, newCity: response})
    }
  }
  const handleViewCity = () => {
    if (response) {
      history.push(`/city/${response.request.query}`)
    }
  }

  useEffect(() => {
    if (debouncedTerm.trim() && debouncedTerm.trim().length > 1) {
      setQuery(debouncedTerm)
    }
  }, [debouncedTerm])

  return (
    <nav className="bg-blue-400 shadow">
      <div className={styles.container}>
        <div className="flex justify-center">
          <div className={styles.column}>
            <div
              className={styles.searchItem}
              role="combobox"
              aria-owns="jump-to-results"
              aria-controls="jump-to-results"
              aria-haspopup="listbox"
              aria-label="Search new place"
              aria-expanded="false"
            >
              <div className="relative">
                <div role="search" aria-label="City search">
                  <label className={styles.searchLabel}>
                    <input
                      className={styles.searchInput}
                      type="text"
                      placeholder="Search new place..."
                      aria-label="Search new place..."
                      autoCapitalize="false"
                      autoComplete="false"
                      spellCheck="false"
                      aria-autocomplete="list"
                      aria-controls="jump-to-results"
                      onChange={handleSearchChange}
                    />
                    <img alt="" src={SearchIcon} className="mr-2" />
                    <div className={styles.list}>
                      <ul
                        aria-labelledby="jump-to-results"
                        id="jump-to-results"
                        role="listbox"
                        className="p-0 m-0"
                      >
                        <li
                          role="option"
                          aria-selected="false"
                          className={styles.item}
                        >
                          {loading ? (
                            <div
                              data-testid="search-loader"
                              className={styles.loader}
                            />
                          ) : response ? (
                            <SearchItem
                              response={response}
                              handleViewCity={handleViewCity}
                              handleAddCity={handleAddCity}
                            />
                          ) : error ? (
                            <span className={styles.cityName}>{error}</span>
                          ) : null}
                        </li>
                      </ul>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
