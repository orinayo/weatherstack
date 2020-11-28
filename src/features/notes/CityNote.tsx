import React, {FC} from 'react'
import {RemoveIcon} from 'components/icons/RemoveIcon'
import styles from './CityNote.module.css'
import {EditIcon} from 'components/icons/EditIcon'

export type Note = {
  createdAt: number
  text: string
  id: string
  isEdited: boolean
}

type Props = {
  note: Note
  onDelete: () => void
  onEdit: () => void
}

export const CityNote: FC<Props> = ({note, onDelete, onEdit}) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.text}>{note.text}</div>
      </div>
      <div className={styles.row}>
        <div>
          <div>
            <small className={styles.timestamp}>
              Created on
              <time dateTime={new Date(note.createdAt).toLocaleDateString()}>
                {new Date(note.createdAt).toLocaleDateString()}
              </time>
            </small>
          </div>
        </div>
        <div>
          <button
            data-testid="edit-note"
            type="button"
            onClick={onEdit}
            className={styles.button}
          >
            <EditIcon width={22} height={22} />
          </button>
          <span className="ml-2" />
          <button
            data-testid="remove-note"
            type="button"
            onClick={onDelete}
            className={styles.button}
          >
            <RemoveIcon width={22} height={22} />
          </button>
        </div>
      </div>
    </div>
  )
}
