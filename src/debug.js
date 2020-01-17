import logger from 'redux-logger'
import { createStore, setState } from './index.js'

const store = createStore({}, [logger])

const action = setState('a.b', Promise.resolve('b'))
store.dispatch(action)

setTimeout(() => {
  const action = setState('a.b', b => Promise.resolve(b.data + 'b'))
  store.dispatch(action)
}, 10)
