const store = createStore()

const add = a => b => a + b

const Counter = (counter, set) => (
  <div>
    <button onClick={_ => set('counter', add(1))}>+</button>
    <div>{counter}</div>
    <button onClick={_ => set('counter', add(-1))}>-</button>
    <button onClick={_ => set('counter', 0)}>Reset</button>
  </div>
)

export default link(connect)({
  counter: 'counter'
})(Counter)
