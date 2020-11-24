import {useState, useEffect} from 'React'

export function useLocalStorage(initialState: any, key: string) {
  const getStateFromLocalStorage = (): any => {
    const storage = localStorage.getItem(key)
    if (storage) return JSON.parse(storage)
    return initialState
  }

  const [value, setValue] = useState(getStateFromLocalStorage())

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return [value, setValue]
}
