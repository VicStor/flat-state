import { is, identity } from 'ramda'
import { createStore } from '../index'
import { setState, FLAT_REDUX_ACTION_TYPE } from '../utils'

describe('setState action creator', () => {
  test('Creates simple action', () => {
    const action = setState(identity)

    expect(action.type).toBe(FLAT_REDUX_ACTION_TYPE)
    expect(is(Function, action.setFn)).toBe(true)
  })
})

describe('Store dispatch', () => {
  let store
  beforeEach(() => {
    store = createStore({})
  })

  test('Update property in store', () => {
    store.dispatch(setState('a.b', { a: 1 }))
    const state = store.getState()
    expect(state).toEqual({ a: { b: { a: 1 } } })
  })

  test('Update property in store', () => {
    store.dispatch(setState('a.b[0]', { a: 1 }))
    const state = store.getState()
    expect(state).toEqual({ a: { b: [{ a: 1 }] } })
  })

  test('Update multiple properties in store', () => {
    store.dispatch(
      setState({
        a: 'a',
        b: () => 'b'
      })
    )
    const state = store.getState()
    expect(state).toEqual({
      a: 'a',
      b: 'b'
    })
  })

  test('update store with promise', done => {
    const action = setState('a', Promise.resolve('b'))
    store.dispatch(action)

    const state = store.getState()
    expect(state.a).toEqual({
      error: null,
      data: null,
      isLoading: true
    })

    setTimeout(() => {
      const state = store.getState()
      expect(state.a).toEqual({
        error: null,
        data: 'b',
        isLoading: false
      })
      done()
    }, 1000)
  })
})

describe('Store update', () => {
  let store
  beforeEach(() => {
    store = createStore({})
  })

  test('Update property in store by .set', () => {
    console.log('store', Object.keys(store))
    store.set('a.b', { a: 1 })
    const state = store.getState()
    expect(state).toEqual({ a: { b: { a: 1 } } })
  })
})
