import { is, identity } from 'ramda'
import { createStore, set } from '../index'
import { FLAT_REDUX_ACTION_TYPE } from '../constants'

describe('set action creator', () => {
  test('Creates action', () => {
    const action = set(identity)

    expect(action.type).toBe(FLAT_REDUX_ACTION_TYPE)
    expect(is(Function, action.Updater)).toBe(true)
  })
})

describe('Store .dispatch', () => {
  let store
  beforeEach(() => {
    store = createStore()
  })

  test('Update property in store', () => {
    store.dispatch(set('a.b', { a: 1 }))
    const state = store.getState()
    expect(state).toEqual({ a: { b: { a: 1 } } })
  })

  test('Update property in store', () => {
    store.dispatch(set('a.b[0]', { a: 1 }))
    const state = store.getState()
    expect(state).toEqual({ a: { b: [{ a: 1 }] } })
  })

  test('Update multiple properties in store', () => {
    store.dispatch(
      set({
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

  test('Update store with promise', done => {
    const action = set('a', Promise.resolve('b'))
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
    }, 10)
  })
})

describe('Store .set', () => {
  let store
  beforeEach(() => {
    store = createStore()
  })

  test('Update property in store by .set', () => {
    store.set('a.b', { a: 1 })
    const state = store.getState()
    expect(state).toEqual({ a: { b: { a: 1 } } })
  })

  test('Update store with function resolves promise', done => {
    store.set('a', 'a')
    expect(store.getState()).toEqual({ a: 'a' })

    store.set('a', val => Promise.resolve(val + 'b'))

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
        data: 'ab',
        isLoading: false
      })
      done()
    }, 10)
  })
})
