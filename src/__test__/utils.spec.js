import expect from 'expect'
import { set } from '../utils'

describe('set function', () => {
  test('creates prop of right type', () => {
    const objRes = set('a.b', { a: 1 }, {})
    expect(objRes).toEqual({ a: { b: { a: 1 } } })

    const arrRes = set('a.b[0]', { a: 1 }, {})
    expect(arrRes).toEqual({ a: { b: [{ a: 1 }] } })
  })
  test('sets prop value by path', () => {
    const res = set('a.b', 10, {})
    expect(res.a.b).toBe(10)
  })
  test('sets array value by path', () => {
    const res = set('a.b[2]', 10, {})
    expect(res.a.b[2]).toBe(10)
  })
  test('sets prop function by path', () => {
    const res = set('a.b', val => val + 10, { a: { b: 1 } })
    expect(res.a.b).toBe(11)
  })
  test('sets array function by path', () => {
    const res = set('a.b[2]', val => val + 10, { a: { b: [null, null, 1] } })
    expect(res.a.b[2]).toBe(11)
  })
  // test('sets prop with promise', async () => {
  //   const setPromise = val => Promise.resolve(val + 10)
  //   const res = set('a.b', setPromise, { a: { b: 1 } })

  //   console.log(res.a.b)
  //   await res.a.b
  //   console.log(res.a.b)
  //   // expect(res.a.b.data).toBe({ data: 11, error: null, isLoading: true })
  //   // expect(res.a.b.data).resolves.toBe(11)
  //   // expect(res.a.b.data).resolves.toBe({
  //   //   data: 11,
  //   //   error: null,
  //   //   isLoading: false
  //   // })
  // })
})
