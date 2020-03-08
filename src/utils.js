import { is, curry } from 'ramda'

import { setIn, getIn } from './set-utils'
import { set as setState } from './index'

export const isString = is(String)
export const isFunction = is(Function)
const isPromise = is(Promise)

export const runIfFunc = (maybeFunc, ...args) =>
  isFunction(maybeFunc) ? maybeFunc(...args) : maybeFunc

export const log = curry((message, val) => {
  console.log(`${message}: `, val)
  return val
})

const setByPath = curry((path, value, obj, store = null) => {
  const currentVal = getIn(path, obj)
  const newVal = runIfFunc(value, currentVal)
  return isPromise(newVal)
    ? setByPromise(path, newVal, obj, store)
    : setIn(path, newVal, obj)
})

const setByObj = curry((valuesObj, obj, store = null) =>
  Object.entries(valuesObj).reduce((resultObj, [key, value]) => {
    const currentVal = getIn(key, resultObj)
    const newVal = runIfFunc(value, currentVal)

    return isPromise(newVal)
      ? setByPromise(key, newVal, resultObj, store)
      : setIn(key, newVal, resultObj)
  }, obj)
)

export const set = (...args) => {
  const [maybePath] = args
  if (isString(maybePath)) {
    return setByPath(...args)
  }
  return setByObj(...args)
}

function setByPromise(path, promise, obj, store) {
  promise
    .then(data => {
      const action = setState(path, {
        error: null,
        isLoading: false,
        data: data
      })
      store.dispatch(action)
    })
    .catch(error => {
      const action = setState(path, {
        error: error,
        isLoading: false,
        data: undefined
      })
      store.dispatch(action)
    })
  return set(
    path,
    {
      error: null,
      isLoading: true,
      data: getIn(`${path}.data`, store.getState(), undefined)
    },
    obj,
    store
  )
}

export { getIn as get }
