import React, {createRef} from 'react'
import {render, screen} from '@testing-library/react'
import TextArea from './TextArea'

describe('TextArea', () => {
  test(`renders a text area with a placeholder "Write a message"`, () => {
    const inputRef = createRef<HTMLTextAreaElement>()
    render(
      <TextArea inputId="note" inputName="note" error="" inputRef={inputRef} />,
    )
    const textAreaNode = screen.getByPlaceholderText(/type here/i)
    expect(textAreaNode).toBeDefined()
  })

  test(`passing the error prop shows an error message`, () => {
    const inputRef = createRef<HTMLTextAreaElement>()
    render(
      <TextArea
        inputId="note"
        inputName="note"
        error="Please provide some value"
        inputRef={inputRef}
      />,
    )
    const errorNode = screen.getByRole('alert')
    expect(errorNode).toHaveTextContent(/please provide some value/i)
  })
})
