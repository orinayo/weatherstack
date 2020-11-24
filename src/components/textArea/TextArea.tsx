import React, {FC} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import classnames from 'classnames'
import styles from './TextArea.module.css'

type Props = {
  maxRows?: number
  inputId: string
  inputRef: React.RefObject<HTMLTextAreaElement>
  inputName: string
  error: string
}

export const TextArea: FC<Props> = ({
  maxRows = 10,
  inputId,
  inputRef,
  inputName,
  error,
}) => {
  return (
    <div>
      <TextareaAutosize
        minRows={5}
        maxRows={maxRows}
        id={inputId}
        ref={inputRef}
        name={inputName}
        className={styles.textarea}
        // className="pl-12 md:pl-16 pr-3 py-2 md:py-3 leading-5"
        // style={{borderRadius: 30}}
        placeholder="Type here"
      />
      <p role="alert" className={classnames({hidden: !error})}>
        {error}
      </p>
    </div>
  )
}
