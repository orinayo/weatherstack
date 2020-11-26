import React, {FC, useRef} from 'react'
import {TextArea} from 'components/textArea/TextArea'

export const City: FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  return (
      
    <div>
      <TextArea
        inputRef={inputRef}
        inputId="createNote"
        inputName="createNote"
        error=""
      />
    </div>
  )
}
