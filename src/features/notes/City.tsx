import React, {FC, useRef} from 'react'
import {TextArea} from 'components/textArea/TextArea'
import styles from './City.module.css'
import {useRouteMatch} from 'react-router'
import CityNote from './CityNote'

export const City: FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const {
    params: {city},
  } = useRouteMatch<{city: string}>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO Save notes
  }

  const cityNotes = () =>
    new Array(10)
      .fill({
        title:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus quae laudantium neque dolorum, voluptatibus aperiam nulla nam! Similique hic omnis culpa rem animi molestiae repellendus sunt? Error et illo laboriosam?',
        createdAt: 'Jan 23,2020',
      })
      .map(note => (
        <li>
          <CityNote note={note} onDelete={() => console.log('delete')} />
        </li>
      ))

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <form onSubmit={handleSubmit}>
            <TextArea
              inputRef={inputRef}
              inputId="createNote"
              inputName="createNote"
              error=""
            />
            <button type="submit" className={styles.button}>
              Save Note
            </button>
          </form>
          <div className={styles.notes}>
            <h1 className={styles.header}>Notes</h1>
            <ul className={styles.lists}>{cityNotes()}</ul>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.city}>{city}</div>
        </div>
      </div>
    </div>
  )
}
