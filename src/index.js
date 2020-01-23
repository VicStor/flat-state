import { createStore as reduxCreateStore, applyMiddleware } from 'redux'

import futureManager from './future-manager'
import { runIfFunc, set, get } from './utils'
import { FLAT_REDUX_ACTION_TYPE } from './constants'
import { link } from './link'

export const setState = (...args) => ({
  type: FLAT_REDUX_ACTION_TYPE,
  Updater: set(...args)
})

export const createStore = (initState = {}, middlewares = []) => {
  const reducer = (state = {}, { type, Updater }) =>
    type === FLAT_REDUX_ACTION_TYPE ? runIfFunc(Updater, state) : state

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

export { setState as set, get, link }
