import {CitiesContext} from './citiesContext'
import {FavoritesContext} from '../favorites/favoritesContext'
import React, {FC, useContext} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import styles from './Cities.module.css'
import {CityItem} from './CityItem'
import {UserLocation} from './UserLocation'

export const Cities: FC = () => {
  const {cities, removeCity} = useContext(CitiesContext)
  const {favorites, addFavorite, removeFavorite} = useContext(FavoritesContext)
  const citiesList = () =>
    cities.map(city => (
      <CSSTransition key={city} timeout={500} classNames="move">
        <CityItem
          cityName={city}
          weatherDesc="sunny"
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
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div>
            <UserLocation />
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
