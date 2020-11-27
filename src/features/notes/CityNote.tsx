import {RemoveIcon} from 'components/icons/RemoveIcon'
import styles from './CityNote.module.css'
import React from 'react'

type Note = {
  createdAt: string
  title: string
}
interface Props {
  note: Note
  onDelete: () => void
}

const CityNote = ({note, onDelete}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="px-4 py-4 flex sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className={styles.text}>{note.title}</div>
          </div>
        </div>
        <div>
          <button type="button" onClick={onDelete} className={styles.button}>
            <RemoveIcon width={22} height={22} />
          </button>
        </div>
      </div>
      <div className="mt-2 flex">
        <div>
          <small className={styles.timestamp}>
            Created on
            <time dateTime={note.createdAt}>{note.createdAt}</time>
          </small>
        </div>
      </div>
    </div>
  )
}

export default CityNote
