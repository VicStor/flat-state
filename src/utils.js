import { setIn } from 'formik'
import { is, curry } from 'ramda'

const isString = is(String)
export const isFunction = is(Function)
const isPromise = is(Promise)

export const FLAT_REDUX_ACTION_TYPE = '@@FLAT_REDUX_ACTION'

export const runIfFunc = (maybeFunc, ...args) =>
  isFunction(maybeFunc) ? maybeFunc(...args) : maybeFunc

export const log = curry((message, val) => {
  console.log(`${message}: `, val)
  return val
})

const charCodeOfDot = '.'.charCodeAt(0)
const reEscapeChar = /\\(\\)?/g
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  '[^.[\\]]+' +
    '|' +
    // Or match property names within brackets.
    '\\[(?:' +
    // Match a non-string expression.
    '([^"\'][^[]*)' +
    '|' +
    // Or match strings (supports escaping characters).
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
    ')\\]' +
    '|' +
    // Or match "" as the space between consecutive dots or empty brackets.
    '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
  'g'
)

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
export const stringToPath = string => {
  const result = []
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('')
  }
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match
    if (quote) {
      key = subString.replace(reEscapeChar, '$1')
    } else if (expression) {
      key = expression.trim()
    }
    result.push(key)
  })
  return result
}

/**
 * Converts `value` to a property path array.
 *
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * toPath('a.b.c')
 * // => ['a', 'b', 'c']
 *
 * toPath('a[0].b.c')
 * // => ['a', '0', 'b', 'c']
 */
export const toPath = value => {
  if (Array.isArray(value)) {
    return value
  }
  return stringToPath(value)
}

/**
 * Deeply get a value from an object via its path.
 */
export const get = curry((path, obj, def = undefined, p = 0) => {
  const pathArr = toPath(path)
  while (obj && p < pathArr.length) {
    obj = obj[pathArr[p++]]
  }
  return obj === undefined ? def : obj
})

const setByPath = curry((path, value, obj, store) => {
  const currentVal = get(path, obj)
  const newVal = runIfFunc(value, currentVal)
  return isPromise(newVal)
    ? setByPromise(path, newVal, obj, store)
    : setIn(obj, path, newVal)
})

const setByObj = curry((valuesObj, obj, store) =>
  Object.entries(valuesObj).reduce((resultObj, [key, value]) => {
    const currentVal = get(key, resultObj)
    const newVal = runIfFunc(value, currentVal)

    return isPromise(newVal)
      ? setByPromise(key, newVal, resultObj, store)
      : setIn(resultObj, key, newVal)
  }, obj)
)

export const set = (...args) => {
  const [maybePath] = args
  if (isString(maybePath)) {
    return setByPath(...args)
  }
  return setByObj(...args)
}

export const setState = (...args) => ({
  type: FLAT_REDUX_ACTION_TYPE,
  setFn: set(...args)
})

function setByPromise(path, promise, obj, store) {
  promise
    .then(data => {
      const action = setState({
        [`${path}.error`]: null,
        [`${path}.isLoading`]: false,
        [`${path}.data`]: data
      })
      store.dispatch(action)
    })
    .catch(error => {
      const action = setState({
        [`${path}.error`]: error,
        [`${path}.isLoading`]: false,
        [`${path}.data`]: null
      })
      store.dispatch(action)
    })
  return setByObj(
    {
      [`${path}.error`]: null,
      [`${path}.isLoading`]: true,
      [`${path}.data`]: get(`${path}.data`, store.getState(), null)
    },
    obj,
    store
  )
}
