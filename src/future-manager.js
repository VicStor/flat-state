import { isFunction } from './utils'
import { FLAT_REDUX_ACTION_TYPE } from './constants'

const futureManager = store => next => ({ type, Updater }) => {
  if (type === FLAT_REDUX_ACTION_TYPE && isFunction(Updater)) {
    const state = store.getState()
    return next({ type, Updater: Updater(state, store) })
  }
  return next({ type, Updater })
}

export default futureManager
