import React, {FC} from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render as rtlRender, fireEvent, screen} from '@testing-library/react'
import styles from 'feature/tabs/Tabs.module.css'
import App from './App'

Object.defineProperty(global.navigator, 'permissions', {
  value: {
    query: jest
      .fn()
      .mockReturnValue({state: 'granted'})
      .mockImplementationOnce(() => Promise.resolve({state: 'granted'})),
  },
  configurable: true,
})

function render(
  ui: JSX.Element,
  {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
    ...renderOptions
  } = {},
) {
  const Wrapper: FC = ({children}) => {
    return <Router history={history}>{children}</Router>
  }
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  }
}

test('App renders favorite and home and can navigate to those pages', () => {
  render(<App />)
  const allPlacesTabNode = screen.getByText(/all places/i)
  const favoritesTabNode = screen.getByText(/favorites/i)

  expect(allPlacesTabNode).toHaveClass(styles.selected)
  fireEvent.click(favoritesTabNode)
  expect(favoritesTabNode).toHaveClass(styles.selected)
  expect(allPlacesTabNode).not.toHaveClass(styles.selected)
})
