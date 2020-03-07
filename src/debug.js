import logger from 'redux-logger'
import { createStore } from './index.js'
import { set } from './utils.js'
import { bindActionCreators } from 'redux'

const store = createStore({}, [logger])
store.set('a.b', Promise.resolve('b'))

setTimeout(() => {
  store.set('a.b', b => Promise.resolve(b.data + 'b'))
}, 10)

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const SET_VALUE = 'SET_VALUE'

const increment = () => ({ type: INCREMENT })
const decrement = () => ({ type: DECREMENT })
const setCounter = counterValue => ({ type: SET_VALUE, counterValue })

const counterReducer = (counter, action) => {
  if (action.type === INCREMENT) return counter + 1
  if (action.type === DECREMENT) return counter - 1
  if (action.type === SET_VALUE) return action.counterValue
  return counter
}

dispatch(setCounter(0))
dispatch(increment())
dispatch(decrement())

const INCREMENT_RED = 'INCREMENT_RED'
const DECREMENT_RED = 'DECREMENT_RED'
const SET_VALUE_RED = 'SET_VALUE_RED'

const incrementRed = () => ({ type: INCREMENT_RED })
const decrementRed = () => ({ type: DECREMENT_RED })
const setCounterRed = counterValue => ({ type: SET_VALUE_RED, counterValue })

const counterRedReducer = (counter, action) => {
  if (action.type === INCREMENT_RED) return counter + 1
  if (action.type === DECREMENT_RED) return counter - 1
  if (action.type === SET_VALUE_RED) return action.counterValue
  return counter
}

combineReducers({
  couter: counterReducer,
  couterRed: counterRedReducer
})

const Counter = (counter, increment, decrement, setCounter, counterName) => (
  <div>
    <button onClick={increment}>+</button>
    <div>{counter}</div>
    <button onClick={decrement}>-</button>
    <button onClick={_ => setCounter(0)}>Reset</button>
  </div>
)

const stateToProps = state => ({
  counter: state.counter
})

const dispatchToProps = dispatch => bindActionCreators({
  increment
  decrement
  setCounter
}, dispatch)

export default connect(stateToProps, dispatchToProps)(Counter)


const state1 = set('a.b.c[0].d', 'd', {})
const state2 = set('a.b.c[0].d', dValue => dValue + 'd', state1)


{
  a: {
    b: {
      c: [
        {
          d: 'dd'
        }
      ]
    }
  }
}

set({
  'a': 'a',
  'b': () => 'b'
}, {})

{
  a: 'a',
  b: 'b'
}

const reducer = (state = {}, { type, Updater }) =>
    type === FLAT_REDUX_ACTION_TYPE ? runIfFunc(Updater, state) : state

const setState = (...args) => ({
  type: FLAT_REDUX_ACTION_TYPE,
  Updater: set(...args)
})


const currySet = curry(set)
const $set = set(lens, updater)
// $set :: state A -> state B

reducer = (state, $set) => $set(state)

const set$ = set('a.b.c[0].d', 'd')
dispatch(set$)


store.dispatch(set('counter', 0))
store.dispatch(set('counter', add(1)))
store.dispatch(set('counter', add(-1)))


store.set('counter', 0)
store.set('counter', add(1))
store.set('counter', add(-1))



link({
  counter: 'counter'
})(ReactComponent)


link(ownProps => ({
  counter: `counter.${ownProps.counterName}`
}))(ReactComponent)


link(ReactComponent)


const Counter = (counter, set, counterName) => (
  <div>
    <button onClick={_ => set(`counter.${counterName}`, add(1))}>+</button>
    <div>{counter}</div>
    <button onClick={_ => set(`counter.${counterName}`, add(-1))}>-</button>
    <button onClick={_ => set(`counter.${counterName}`, 0)}>Reset</button>
  </div>
)

const stateToProps = ownProps => ({
  counter: `counter.${ownProps.counterName}`
})

export default link(stateToProps)(Counter)
