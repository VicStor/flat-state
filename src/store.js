import { runIfFunc, set, get } from './utils'
import { is } from 'ramda'

const createStore = (initState = {}, middlewares = []) => {
  let state = { ...initState }
  const listeners = {}

  return {
    getListeners: () => listeners,
    getState: () => ({ ...state }),
    get: (...args) => get(...args, state),
    set: (lens, updater) => {
      const oldValue = get(lens, state)
      state = set(lens, updater, state)
      const newValue = get(lens, state)
      if (newValue === oldValue) return
      const lensListeners = listeners[lens] || []
      lensListeners.forEach(lensListener => {
        runIfFunc(lensListener, newValue)
      })
    },
    link: (lens, listener) => {
      if (!is(Function, listener)) {
        throw Error(`link expect "function", got "${typeof listener}" instead`)
      }
      const lensListeners = listeners[lens] || []
      listeners[lens] = [...lensListeners, listener]
      return () => {
        listeners[lens] = listeners[lens].filter(lensListener => {
          return lensListener !== listener
        })
      }
    }
  }
}

export default createStore
