import { set } from '../utils'
import { setIn, toPath, getIn } from '../set-utils'

const mockDispatch = jest.fn(x => {
  console.log(x)
  return x
})

describe('toPath function', () => {
  test('convert string to path array', () => {
    const objPath = toPath('a.0.c')
    expect(objPath).toEqual(['a', '0', 'c'])

    const arrPath = toPath('a[0].b.c')
    expect(arrPath).toEqual(['a', 0, 'b', 'c'])
  })
})

describe('getIn function', () => {
  test('returns value if path exist', () => {
    const val = getIn('a.0.c', { a: [{ c: 'c' }] })
    expect(val).toEqual('c')
  })
  test('returns default value if not path exist', () => {
    const val = getIn('a.0.c', {}, 'c')
    expect(val).toEqual('c')
  })
})

describe('setIn function', () => {
  test('creates prop of type object', () => {
    const objRes = setIn('a.0', '0', {})

    expect(objRes).toEqual({
      a: {
        '0': '0'
      }
    })
  })

  test('creates prop of type array', () => {
    const arrRes = setIn('a[0]', 0, {})

    expect(Array.isArray(arrRes.a)).toBe(true)
    expect(arrRes).toEqual({ a: [0] })
  })
})

describe('set function', () => {
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
