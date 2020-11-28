import {useState, useEffect} from 'react'

export function useLocalStorage<T>(initialState: T, key: string) {
  const getStateFromLocalStorage = (): T => {
    // @ts-ignore
    const storage = localStorage.getItem(key)
    if (storage) return JSON.parse(storage)
    return initialState
  }

  const [value, setValue] = useState(getStateFromLocalStorage())

  useEffect(() => {
    // @ts-ignore
    localStorage.setItem(key, JSON.stringify(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return {cacheValues: value, updateCacheValues: setValue}
}
