import { FLAT_REDUX_ACTION_TYPE, isFunction } from './utils'

const futureManager = store => next => ({ type, setFn }) => {
  if (type === FLAT_REDUX_ACTION_TYPE && isFunction(setFn)) {
    const state = store.getState()
    const setter = setFn(state, store)
    return next({ type, setFn: setter })
  }
  return next({ type, setFn })
}

export default futureManager
