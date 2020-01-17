import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import futureManager from './future-manager'
import { runIfFunc, FLAT_REDUX_ACTION_TYPE } from './utils'
export { set, get, setState } from './utils'

export const createStore = initState => {
  const reducer = (state = {}, { type, setFn }) => {
    const newState =
      type === FLAT_REDUX_ACTION_TYPE ? runIfFunc(setFn, state) : state
    console.log(JSON.stringify(newState, null, 2))

    return newState
  }

  return reduxCreateStore(reducer, initState, applyMiddleware(futureManager))
}
