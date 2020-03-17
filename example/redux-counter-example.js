const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const SET_VALUE = 'SET_VALUE'

const increment = () => ({ type: INCREMENT })
const decrement = () => ({ type: DECREMENT })
const setCounter = counterValue => ({ type: SET_VALUE, counterValue })

const counterReducer = (state, action) => {
  if (action.type === INCREMENT) return { ...state, counter: state.counter + 1 }
  if (action.type === DECREMENT) return { ...state, counter: state.counter - 1 }
  if (action.type === SET_VALUE)
    return { ...state, counter: action.counterValue }
  return state
}

const store = createStore()

const Counter = (counter, increment, decrement, setCounter) => (
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

const dispatchToProps = bindActionCreators({
  increment,
  decrement,
  setCounter
})

export default connect(stateToProps, dispatchToProps)(Counter)
