import React, {FC, useContext} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {EmptyData} from 'components/emptyData/EmptyData'
import {UserLocationData} from 'features/userLocation/UserLocationData'
import styles from './Cities.module.css'
import {CityItem} from './CityItem'
import {CitiesContext} from './citiesContext'
import {FavoritesContext} from '../favorites/favoritesContext'

export const Cities: FC = () => {
  const {cities, removeCity} = useContext(CitiesContext)
  const {favorites, addFavorite, removeFavorite} = useContext(FavoritesContext)
  const citiesList = () =>
    cities.length ? (
      cities.map(city => (
        <CSSTransition key={city} timeout={500} classNames="move">
          <CityItem
          cityUrl={`/city/${city}`}
            cityName={city}
            isFavorite={favorites.includes(city)}
            addFavorite={() => {
              addFavorite(city)
            }}
            removeFavorite={() => {
              removeFavorite(city)
            }}
            onDelete={() => {
              removeCity(city)
            }}
          />
        </CSSTransition>
      ))
    ) : (
      <EmptyData />
    )

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div>
            <UserLocationData />
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <ul className={styles.citiesList}>
              <TransitionGroup component={null}>{citiesList()}</TransitionGroup>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
