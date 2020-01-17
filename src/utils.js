import { getIn, setIn } from 'formik'
import { is, curry } from 'ramda'

const isString = is(String)
const isFunction = is(Function)

const runIfFunc = (maybeFunc, ...args) =>
  isFunction(maybeFunc) ? maybeFunc(...args) : maybeFunc

const setByPath = curry((path, value, obj) => {
  const currentVal = getIn(obj, path)
  return setIn(obj, path, runIfFunc(value, currentVal))
})

const setByObj = curry((valuesObj, obj) =>
  Object.entries(valuesObj).reduce((resultObj, [key, value]) => {
    const currentVal = getIn(resultObj, key)
    return setIn(resultObj, key, runIfFunc(value, currentVal))
  }, obj)
)

export const get = curry((path, obj, def = void 0) => getIn(obj, path, def))

export const set = (...args) => {
  const [maybePath] = args
  if (isString(maybePath)) {
    return setByPath(...args)
  }
  return setByObj(...args)
}
