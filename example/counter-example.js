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

const dispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      decrement,
      setCounter
    },
    dispatch
  )

export default connect(stateToProps, dispatchToProps)(Counter)

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
