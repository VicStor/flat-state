// const redux = require('../build/lib')
// const { createStore, set, setState } = redux
import { createStore, setState } from './index.js'

const store = createStore({})
// const action1 = setState('a.b', () => 'b')
// const action2 = setState('a.c', 'c')
// store.dispatch(action1)
// store.dispatch(action2)

const action = setState('a.b', Promise.resolve('b'))
store.dispatch(action)

setTimeout(() => {
  const action1 = setState('a.b', b => Promise.resolve(b.data + 'b'))
  store.dispatch(action1)
}, 1000)

// const state1 = store.getState()
// console.log(JSON.stringify(state1, null, 2))
