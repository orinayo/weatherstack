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

const TextArea: FC<Props> = ({
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
        className={`block w-full text-sm ${styles.textarea}`}
        // className="block w-full  pl-12 md:pl-16 pr-3 py-2 md:py-3 font-light border border-gray-300 leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out resize-none overflow-hidden"
        // style={{borderRadius: 30}}
        placeholder="Type here"
      />
      <p role="alert" className={classnames({hidden: !error})}>
        {error}
      </p>
    </div>
  )
}

export default TextArea
