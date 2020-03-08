import { set, get } from './utils'

const createStore = (initState = {}, middlewares = []) => {
  let state = { ...initState }
  const listeners = {}

  return {
    getState: () => ({ ...state }),
    get: (...args) => get(...args, state),
    set: (...args) => {
      const newState = set(...args, state)
      Object.entries(listeners).forEach(([lens, lensListeners]) => {
        const oldValue = get(lens, state)
        const newValue = get(lens, newState)
        if (newValue === oldValue) return
        lensListeners.forEach(lensListener => lensListener(newValue))
      })
      state = newState
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
