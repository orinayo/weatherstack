import React from 'react'
import {render, screen} from '@testing-library/react'
import {EmptyData} from './EmptyData'

describe('EmptyData', () => {
  test(`renders an image and text that says "No information to display"`, () => {
    render(<EmptyData />)
    const emptyDataNode = screen.getByText(/no information to display/i)
    const imageNode = screen.getByAltText(/empty response/i)
    expect(emptyDataNode).toBeDefined()
    expect(imageNode).toBeDefined()
  })
})
