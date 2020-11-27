import React, {FC} from 'react'
import {RemoveIcon} from 'components/icons/RemoveIcon'
import {DropdownIcon} from 'components/icons/DropdownIcon'
import styles from './CityNote.module.css'

export type Note = {
  createdAt: string
  text: string
}

type Props = {
  note: Note
  onDelete: () => void
}

export const CityNote: FC<Props> = ({note, onDelete}) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.text}>{note.text}</div>
        <div>
          <span className={styles.dropdwon}>
            <DropdownIcon />
          </span>
        </div>
      </div>
      <div className={styles.row}>
        <div>
          <div>
            <small className={styles.timestamp}>
              Created on
              <time dateTime={note.createdAt}>{note.createdAt}</time>
            </small>
          </div>
        </div>
        <div>
          <button type="button" onClick={onDelete} className={styles.button}>
            <RemoveIcon width={22} height={22} />
          </button>
        </div>
      </div>
    </div>
  )
}
