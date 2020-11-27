import React, {FC, useContext} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {EmptyData} from 'components/emptyData/EmptyData'
import {UserLocationData} from 'features/userLocation/UserLocationData'
import styles from './Favorites.module.css'
import {FavoritesContext} from './favoritesContext'
import {CityItem} from '../cities/CityItem'
import {CitiesContext} from '../cities/citiesContext'

export const Favorites: FC = () => {
  const {removeCity} = useContext(CitiesContext)
  const {favorites, removeFavorite} = useContext(FavoritesContext)
  const citiesList = () =>
    favorites.length ? (
      favorites.map(city => (
        <CSSTransition key={city} timeout={500} classNames="move">
          <CityItem
            cityName={city}
            isFavorite={true}
            removeFavorite={() => {
              removeFavorite(city)
            }}
            onDelete={() => {
              removeFavorite(city)
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
