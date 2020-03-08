import { set, get, isString } from './utils'

const createStore = (initState = {}, middlewares = []) => {
  let state = { ...initState }
  const listeners = {}

  return {
    getState: () => ({ ...state }),
    get: (...args) => get(...args, state),
    set: (lens, updater) => {
      const setByLens = (lens, updater) => {
        const oldValue = get(lens, state)
        state = set(lens, updater, state)
        const newValue = get(lens, state)
        if (newValue === oldValue) return
        const lensListeners = listeners[lens] || []
        lensListeners.forEach(lensListener => lensListener(newValue))
      }
      isString(lens)
        ? setByLens(lens, updater)
        : Object.entries(lens).forEach(([lens, updater]) =>
            setByLens(lens, updater)
          )
    },
    link: (lens, listener) => {
      if (typeof listener !== 'function') {
        throw Error(`link expect "function", got "${typeof listener}" instead`)
      }
      const lensListeners = listeners[lens] || []
      listeners[lens] = [...lensListeners, listener]
      return () => {
        listeners[lens] = listeners[lens].filter(
          lensListener => lensListener !== listener
        )
      }
    }
  }
}

export default createStore
