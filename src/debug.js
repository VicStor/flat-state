import logger from 'redux-logger'
import { createStore } from './index.js'

const store = createStore({}, [logger])
store.set('a.b', Promise.resolve('b'))

setTimeout(() => {
  store.set('a.b', b => Promise.resolve(b.data + 'b'))
}, 10)
