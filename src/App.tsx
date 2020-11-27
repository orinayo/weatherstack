import React, {FC} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {OfflineNotification} from 'components/offlineNotification/OfflineNotification'
import {ToastContainer} from 'react-toastify'
import {Searchbar} from 'components/searchbar/Searchbar'
import {Tabs} from 'components/tabs/Tabs'
import {Cities} from 'features/cities/Cities'
import {Favorites} from 'features/favorites/Favorites'
import {FavoritesProvider} from 'features/favorites/favoritesContext'
import styles from './App.module.css'
import {UserLocationProvider} from 'features/userLocation/userLocationContext'
import {CitiesDataProvider} from 'features/city/cityContext'

const App: FC = () => {
  return (
    <div>
      <OfflineNotification />
      <ToastContainer />
      <BrowserRouter>
        <FavoritesProvider>
          <Searchbar />
          <main className={styles.main}>
            <CitiesDataProvider>
              <UserLocationProvider>
                <Tabs />
                <Switch>
                  <Route exact path="/" component={Cities} />
                  <Route exact path="/favorites" component={Favorites} />
                  {/* <Route exact path="/cities" component={City} /> */}
                </Switch>
              </UserLocationProvider>
            </CitiesDataProvider>
          </main>
        </FavoritesProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
