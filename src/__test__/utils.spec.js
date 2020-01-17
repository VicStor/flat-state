import { set } from '../utils'

const mockDispatch = jest.fn(x => {
  console.log(x)
  return x
})

describe('set function', () => {
  test('creates prop of right type', () => {
    const objRes = set('a.b', { a: 1 }, {}, mockDispatch)
    expect(objRes).toEqual({ a: { b: { a: 1 } } })

    const arrRes = set('a.b[0]', { a: 1 }, {}, mockDispatch)
    expect(arrRes).toEqual({ a: { b: [{ a: 1 }] } })
  })
  test('sets prop value by path', () => {
    const res = set('a.b', 10, {}, mockDispatch)
    expect(res.a.b).toBe(10)
  })
  test('sets array value by path', () => {
    const res = set('a.b[2]', 10, {}, mockDispatch)
    expect(res.a.b[2]).toBe(10)
  })
  test('sets prop function by path', () => {
    const res = set('a.b', val => val + 10, { a: { b: 1 } }, mockDispatch)
    expect(res.a.b).toBe(11)
  })
  test('sets array function by path', () => {
    const res = set(
      'a.b[2]',
      val => val + 10,
      { a: { b: [null, null, 1] } },
      mockDispatch
    )
    expect(res.a.b[2]).toBe(11)
  })
})
