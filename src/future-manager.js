import { isFunction } from './utils'
import { FLAT_REDUX_ACTION_TYPE } from './constants'

const futureManager = store => next => action => {
  if (action.type === FLAT_REDUX_ACTION_TYPE && isFunction(action.Updater)) {
    const state = store.getState()
    return next({ ...action, Updater: action.Updater(state, store) })
  }
  return next(action)
}

export default futureManager
