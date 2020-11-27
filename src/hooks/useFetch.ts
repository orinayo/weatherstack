import {useEffect, useReducer, useRef} from 'react'

export function useFetch<T>(url: string, options?: RequestInit) {
  const cache = useRef({})
  type FetchState = {loading: boolean; error: string; response: T | null}

  const FETCH_DATA = 'FETCH_DATA'
  const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
  const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

  const initialState: FetchState = {
    loading: false,
    error: '',
    response: null,
  }
  
  type FetchDataAction = {
    type: typeof FETCH_DATA
  }

  type FetchDataSuccessAction = {
    type: typeof FETCH_DATA_SUCCESS
    payload: T
  }

  type FetchDataFailureAction = {
    type: typeof FETCH_DATA_FAILURE
    payload: string
  }

  type FetchDataActions =
    | FetchDataAction
    | FetchDataSuccessAction
    | FetchDataFailureAction

  const fetchReducer = (
    state: FetchState,
    action: FetchDataActions,
  ): FetchState => {
    switch (action.type) {
      case FETCH_DATA:
        return {...initialState, loading: true}
      case FETCH_DATA_SUCCESS:
        return {...initialState, loading: false, response: action.payload}
      case FETCH_DATA_FAILURE:
        return {...initialState, loading: false, error: action.payload}
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    let cancelRequest = false
    if (!url) return
    const doFetch = async () => {
      dispatch({type: FETCH_DATA})
      if (cache.current[url]) {
        const data = cache.current[url]
        dispatch({type: FETCH_DATA_SUCCESS, payload: data})
      } else {
        try {
          const res = await fetch(url, options)
          const json: T = await res.json()
          cache.current[url] = json
          if (cancelRequest) return
          if (!signal.aborted) {
            dispatch({type: FETCH_DATA_SUCCESS, payload: json})
          }
        } catch (error) {
          if (cancelRequest) return
          if (!signal.aborted) {
            dispatch({type: FETCH_DATA_FAILURE, payload: error.message})
          }
        }
      }
    }
    doFetch()
    return () => {
      abortController.abort()
    }
  }, [options, url])
  return state
}
