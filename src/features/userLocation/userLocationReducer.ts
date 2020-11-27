import {
  SET_PERM_STATUS,
  SET_COORDINATES,
  SET_SUBSCRIBED,
} from './userLocationConstants'

type SetPermStatusAction = {
  type: typeof SET_PERM_STATUS
  payload: string
}

type SetSubscribedAction = {
  type: typeof SET_SUBSCRIBED
  payload: boolean
}

type SetCoordinatesAction = {
  type: typeof SET_COORDINATES
  payload: {lat: number; lon: number}
}

export type UserLocationState = {
  coords: {lat: number; lon: number}
  isSubscribed: boolean
  permStatus: string
}

type UserLocationActions =
  | SetPermStatusAction
  | SetSubscribedAction
  | SetCoordinatesAction

export const userLocationReducer = (
  state: UserLocationState,
  action: UserLocationActions,
): UserLocationState => {
  if (action.type === SET_PERM_STATUS) {
    return {
      ...state,
      permStatus: action.payload,
    }
  }

  if (action.type === SET_COORDINATES) {
    return {
      ...state,
      coords: action.payload,
    }
  }

  if (action.type === SET_SUBSCRIBED) {
    return {
      ...state,
      isSubscribed: action.payload,
    }
  }

  return state
}
