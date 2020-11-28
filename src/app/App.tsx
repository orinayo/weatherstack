import React, {FC, Suspense, useEffect} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {OfflineNotification} from 'components/offlineNotification/OfflineNotification'
import {ToastContainer} from 'react-toastify'
import {Searchbar} from 'components/searchbar/Searchbar'
import {Tabs} from 'components/tabs/Tabs'
import {FavoritesProvider} from 'features/favorites/favoritesContext'
import {UserLocationProvider} from 'features/userLocation/userLocationContext'
import {CitiesDataProvider} from 'features/city/cityContext'
import {CitiesNoteProvider} from 'features/notes/citiesNotesContext'
import {Cities} from 'features/cities/Cities'
import {CityData} from 'features/city/City'
import {Favorites} from 'features/favorites/Favorites'
import styles from './App.module.css'

const App: FC = () => {
  useEffect(() => {
    const handlePwaInstallEvt = (event: Event) => {
      event.preventDefault()
      return false
    }
    window.addEventListener('beforeinstallprompt', handlePwaInstallEvt)
    return () => {
      window.removeEventListener('beforeinstallprompt', handlePwaInstallEvt)
    }
  }, [])

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
                <CitiesNoteProvider>
                  <Tabs />
                  <Suspense fallback={<div />}>
                    <Switch>
                      <Route exact path="/" component={Cities} />
                      <Route exact path="/favorites" component={Favorites} />
                      <Route exact path="/city/:city" component={CityData} />
                    </Switch>
                  </Suspense>
                </CitiesNoteProvider>
              </UserLocationProvider>
            </CitiesDataProvider>
          </main>
        </FavoritesProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
