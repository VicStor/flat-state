import { set as rSet, view as rView, lensPath, curry } from 'ramda'
import { compose } from 'redux'

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
const stringToPath = string => {
  const result = []
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('')
  }
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match
    if (quote) {
      const key = subString.replace(reEscapeChar, '$1')
      return result.push(key)
    }
    if (expression) {
      const key = expression.trim()
      const keyInt = parseInt(key, 10)
      if (key == keyInt) {
        return result.push(keyInt)
      }
      throw Error(`Key in ${match} should be integer`)
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
 * // => ['a', 0, 'b', 'c']
 */
export const toPath = value => {
  if (Array.isArray(value)) {
    return value
  }
  return stringToPath(value)
}

export const setIn = curry((path, val, obj) =>
  compose(lens => rSet(lens, val, obj), lensPath, toPath)(path)
)

export const getIn = curry((path, obj, def = undefined) => {
  const val = compose(lens => rView(lens, obj), lensPath, toPath)(path)
  return val === undefined ? def : val
})
