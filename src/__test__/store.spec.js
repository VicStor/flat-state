import { is, compose, identity } from 'ramda'
import { createStore } from '../index'
import { set, setState, log, FLAT_REDUX_ACTION_TYPE } from '../utils'

describe('setState action creator', () => {
  test('Creates simple action', () => {
    const action = setState(identity)

    expect(action.type).toBe(FLAT_REDUX_ACTION_TYPE)
    expect(is(Function, action.setFn)).toBe(true)
  })

  test('Creates set action', () => {
    const action = setState(
      set({
        a: 'a',
        b: () => 'b'
      })
    )

    expect(action.type).toBe(FLAT_REDUX_ACTION_TYPE)
    expect(is(Function, action.setFn)).toBe(true)
    expect(action.setFn.length).toBe(2)
  })
})

describe('Store dispatch', () => {
  let store
  beforeEach(() => {
    store = createStore({})
  })

  test('update object in store', () => {
    store.dispatch(setState(set('a.b', { a: 1 })))
    const state1 = store.getState()
    expect(state1).toEqual({ a: { b: { a: 1 } } })
  })

  test('multi update store', () => {
    const setFn = set({
      a: 'a',
      b: () => 'b'
    })
    const action = setState(setFn)
    store.dispatch(action)

    const state2 = store.getState()

    expect(state2).toEqual({
      a: 'a',
      b: 'b'
    })
  })

  test.only('update store with promise', () => {
    const setFn = set('a.b', () => Promise.resolve('b'))
    const action = setState(setFn)
    store.dispatch(action)

    const state1 = store.getState()
    expect(state1).toEqual({ a: { b: { a: 1 } } })
  })
})
