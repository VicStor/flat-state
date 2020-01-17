import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import futureManager from './future-manager'
import { runIfFunc, FLAT_REDUX_ACTION_TYPE, setState } from './utils'
export { set, get, setState } from './utils'

export const createStore = (initState = {}, middlewares = []) => {
  const reducer = (state = {}, { type, setFn }) =>
    type === FLAT_REDUX_ACTION_TYPE ? runIfFunc(setFn, state) : state

  const store = reduxCreateStore(
    reducer,
    initState,
    applyMiddleware(futureManager, ...middlewares)
  )

  store.set = (...args) => {
    store.dispatch(setState(...args))
  }
  return store
}
