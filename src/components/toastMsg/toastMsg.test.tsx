import React from 'react'
import {render, screen} from '@testing-library/react'
import {ToastMsg} from './ToastMsg'

describe('ToastMsg', () => {
  test(`renders toast with message and button that says "Undo"`, () => {
    render(<ToastMsg message="New York has been removed" undoDelete={jest.fn} />)
    const messageNode = screen.getByText(/new york has been removed/i)
    const buttonNode = screen.getByText(/undo/i)
    expect(messageNode).toBeDefined()
    expect(buttonNode).toBeDefined()
  })
})
