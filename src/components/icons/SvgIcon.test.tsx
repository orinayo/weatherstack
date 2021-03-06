import React from 'react'
import {render} from '@testing-library/react'
import {HeartIcon} from './HeartIcon'
import {ListIcon} from './ListIcon'
import {OfflineIcon} from './OfflineIcon'
import {RemoveIcon} from './RemoveIcon'
import {EditIcon} from './EditIcon'
import {AddIcon} from './AddIcon'

describe('SVG Icons', () => {
  test('renders heart svg icon', () => {
    const {asFragment} = render(<HeartIcon />)
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders list svg icon', () => {
    const {asFragment} = render(<ListIcon />)
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders offline svg icon', () => {
    const {asFragment} = render(<OfflineIcon />)
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders remove svg icon', () => {
    const {asFragment} = render(<RemoveIcon />)
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders add svg icon', () => {
    const {asFragment} = render(<AddIcon />)
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders remove svg icon', () => {
    const {asFragment} = render(<EditIcon />)
    expect(asFragment()).toMatchSnapshot()
  })
})
