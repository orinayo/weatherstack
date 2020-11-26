import {CitiesContext} from '../cities/citiesContext'
import {FavoritesContext} from './favoritesContext'
import React, {FC, useContext} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import styles from './Favorites.module.css'
import {CityItem} from '../cities/CityItem'

export const Favorites: FC = () => {
  const {removeCity} = useContext(CitiesContext)
  const {favorites, addFavorite, removeFavorite} = useContext(FavoritesContext)
  const citiesList = () =>
    favorites.map(city => (
      <CSSTransition key={city} timeout={500} classNames="move">
        <CityItem
          cityName={city}
          weatherDesc="sunny"
          isFavorite={true}
          addFavorite={() => {
            addFavorite(city)
          }}
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
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div></div>
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
