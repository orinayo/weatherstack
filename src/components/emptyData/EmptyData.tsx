import React from 'react'
import EmptyRes from 'assets/404.png'
import styles from './EmptyData.module.css'

export const EmptyData = () => {
  return (
    <div className={styles.container}>
      <img src={EmptyRes} alt="Empty response" className={styles.image} />
      <h4 className="text-center mx-auto">No information to display</h4>
    </div>
  )
}
