import {useState, useEffect} from 'react'

export function useLocalStorage<T>(initialState: T, key: string) {
  const getStateFromLocalStorage = (): T => {
    const storage = localStorage.getItem(key)
    if (storage) return JSON.parse(storage)
    return initialState
  }

  const [value, setValue] = useState(getStateFromLocalStorage())

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return {cacheValues: value, updateCacheValues: setValue}
}
