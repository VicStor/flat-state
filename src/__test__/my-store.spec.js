import { is } from 'ramda'
import createStore from '../store'

describe('createStore', () => {
  let store
  beforeEach(() => {
    store = createStore()
  })
  test('Creates store with methods', () => {
    expect(is(Function, store.getState)).toBe(true)
    expect(is(Function, store.set)).toBe(true)
    expect(is(Function, store.get)).toBe(true)
    expect(is(Function, store.link)).toBe(true)
  })
  test.skip('.getState and .get work right', () => {
    expect(store.getState()).toEqual({})
    expect(store.get('a.a.a')).toBe(undefined)
  })
  describe.skip('.set', () => {
    test('.set sets value on lens', () => {
      store.set('a.a.a', 'it is a')
      const state = store.getState()
      expect(state.a.a.a).toEqual('it is a')
    })
    test('.set sets value on lens', () => {
      store.set('b[0]', 'it is b')
      const state = store.getState()
      expect(state.b[0]).toEqual('it is b')
    })
  })
  describe('.link', () => {
    test('listener should be of type function', () => {
      expect(() => store.link('a.a.a', 'a')).toThrowError(
        /link expect \"function\", got \"string\" instead/
      )
      expect(() => store.link('a.a.a', 1)).toThrowError(
        /link expect \"function\", got \"number\" instead/
      )
      expect(() => store.link('a.a.a', {})).toThrowError(
        /link expect \"function\", got \"object\" instead/
      )
      expect(() => store.link('a.a.a', [])).toThrowError(
        /link expect \"function\", got \"object\" instead/
      )
      expect(
        is(
          Function,
          store.link('a.a.a', () => {})
        )
      ).toBe(true)
    })
    test('.link listener to lens', () => {
      const stubListener = jest.fn()
      store.link('a.a.a', val => stubListener(val))
      store.set('a.a.a', 'a')
      expect(stubListener).toBeCalled()
    })
    test('.link multiple listeners to lens', () => {
      const stubListener = jest.fn()
      store.link('a.a.a', val => stubListener(val))
      store.link('a.a.a', val => stubListener(val))
      store.link('a.a.a', val => stubListener(val))
      store.set('a.a.a', 'a')
      expect(stubListener).toHaveBeenCalledTimes(3)
    })
    test('.link unsubscribe listener on lens', () => {
      const stubListener = jest.fn()
      const unlink = store.link('a.a.a', val => stubListener(val))
      unlink()
      store.set('a.a.a', 'a')
      expect(stubListener).toHaveBeenCalledTimes(0)
    })
    test('.link unsubscribe listener on lens when multiple listeners assigned', () => {
      const stubListener1 = jest.fn()
      const stubListener2 = jest.fn()
      const unlink1 = store.link('a.a.a', val => stubListener1(val))
      store.link('a.a.a', val => stubListener2(val))
      unlink1()
      store.set('a.a.a', 'a')
      expect(stubListener1).toHaveBeenCalledTimes(0)
      expect(stubListener2).toHaveBeenCalledTimes(1)
    })
  })
  describe('Calls listeners only if value was changed', () => {
    test('listener should not be called when value shallowly equal on lens', () => {
      const value = {}
      const stubListener = jest.fn()
      store.link('a.a.a', val => stubListener(val))
      store.set('a.a.a', value)
      store.set('a.a.a', value)
      store.set('a.a.a', value => value)
      expect(stubListener).toHaveBeenCalledTimes(1)
    })
    test('listener should be called when value not shallowly equal on lens', () => {
      const stubListener = jest.fn()
      store.link('a.a.a', val => stubListener(val))
      store.set('a.a.a', {})
      store.set('a.a.a', {})
      store.set('a.a.a', value => {})
      expect(stubListener).toHaveBeenCalledTimes(3)
    })
  })
})
