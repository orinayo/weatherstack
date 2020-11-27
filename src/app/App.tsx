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
import styles from './App.module.css'

const Cities = React.lazy(() =>
  import('features/cities/Cities').then(module => ({
    default: module.Cities,
  })),
)

const Favorites = React.lazy(() =>
  import('features/favorites/Favorites').then(module => ({
    default: module.Favorites,
  })),
)

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
                <Tabs />
                <Suspense fallback={<div />}>
                  <Switch>
                    <Route exact path="/" component={Cities} />
                    <Route exact path="/favorites" component={Favorites} />
                    {/* <Route exact path="/cities" component={City} /> */}
                  </Switch>
                </Suspense>
              </UserLocationProvider>
            </CitiesDataProvider>
          </main>
        </FavoritesProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
