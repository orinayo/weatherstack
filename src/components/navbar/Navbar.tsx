import React from 'react'
import SearchIcon from 'assets/search-icon.png'
import styles from './Navbar.module.css'

export const Navbar = () => {
  return (
      <nav className="bg-blue-400 shadow">
        <div className={styles.container}>
          <div className="flex justify-center">
            <div className={styles.column}>
              <div
                className={styles.searchItem}
                role="combobox"
                aria-owns="jump-to-results"
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
                      />
                      <img alt="" src={SearchIcon} className="mr-2" />
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
