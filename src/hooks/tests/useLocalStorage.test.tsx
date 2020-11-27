import {useLocalStorage} from '../useLocalStorage'
import {renderHook, act} from '@testing-library/react-hooks'

describe(useLocalStorage, () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('retrieves an existing value from localStorage', () => {
    localStorage.setItem('key', '"value"')
    const {result} = renderHook(() => useLocalStorage('valu', 'key'))
    const {cacheValues} = result.current
    expect(cacheValues).toEqual('value')
  })

  it('should return initialValue if localStorage empty', () => {
    const {result} = renderHook(() => useLocalStorage('init', 'key'))
    const {cacheValues} = result.current
    expect(cacheValues).toEqual('init')
  })

  it('prefers existing value over initial state', () => {
    localStorage.setItem('key', '"value"')
    const {result} = renderHook(() => useLocalStorage('init', 'key'))
    const {cacheValues} = result.current
    expect(cacheValues).toEqual('value')
  })

  it('returns a new value', () => {
    const {result, rerender} = renderHook(() => useLocalStorage('init', 'key'))

    const {updateCacheValues} = result.current
    act(() => updateCacheValues('newVal'))
    rerender()

    const {cacheValues} = result.current
    expect(cacheValues).toEqual('newVal')
  })

  it('parses out objects from localStorage', () => {
    localStorage.setItem('key', JSON.stringify({ok: true}))
    const {result} = renderHook(() =>
      useLocalStorage<{ok: boolean}>({ok: false}, 'key'),
    )
    const {cacheValues} = result.current
    expect(cacheValues.ok).toEqual(true)
  })

  it('initializes objects to localStorage', () => {
    const {result} = renderHook(() =>
      useLocalStorage<{ok: boolean}>({ok: true}, 'key'),
    )
    const {cacheValues} = result.current
    expect(cacheValues.ok).toEqual(true)
  })

  it('sets objects to localStorage', () => {
    const {result, rerender} = renderHook(() =>
      useLocalStorage<{ok: any}>({ok: true}, 'key'),
    )

    const {updateCacheValues} = result.current
    act(() => updateCacheValues({ok: false}))
    rerender()

    const {cacheValues} = result.current
    expect(cacheValues!.ok).toEqual(false)
  })

  it('returns objects from updates', () => {
    const {result, rerender} = renderHook(() =>
      useLocalStorage<{ok: any}>({ok: true}, 'key'),
    )

    const {updateCacheValues} = result.current
    act(() => updateCacheValues({ok: false}))
    rerender()

    const {cacheValues} = result.current
    expect(cacheValues).toBeInstanceOf(Object)
    expect(cacheValues!.ok).toEqual(false)
  })

  it('sets localStorage from the function updater', () => {
    const {result, rerender} = renderHook(() =>
      useLocalStorage<{foo: string; fizz?: string}>({foo: 'bar'}, 'key'),
    )

    const {updateCacheValues} = result.current
    act(() => updateCacheValues(state => ({...state!, fizz: 'buzz'})))
    rerender()

    const {cacheValues} = result.current
    expect(cacheValues!.foo).toEqual('bar')
    expect(cacheValues!.fizz).toEqual('buzz')
  })
})
