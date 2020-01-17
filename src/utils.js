import { getIn, setIn } from 'formik'
import { is, curry } from 'ramda'

const isString = is(String)
const isFunction = is(Function)

const runIfFunc = (maybeFunc, ...args) =>
  isFunction(maybeFunc) ? maybeFunc(...args) : maybeFunc

const setByPath = curry((path, value, obj) => {
  const currentVal = getIn(obj, path)
  const newVal = runIfFunc(value, currentVal)
  // return is(Promise, newVal)
  //   ? setByPromise(path, newVal, obj)
  //   : setIn(obj, path, newVal)
  return setIn(obj, path, newVal)
})
const setByObj = curry((valuesObj, obj) =>
  Object.entries(valuesObj).reduce((resultObj, [key, value]) => {
    const currentVal = getIn(resultObj, key)
    const newVal = runIfFunc(value, currentVal)

    // return is(Promise, newVal)
    //   ? setByPromise(key, newVal, resultObj)
    //   : setIn(resultObj, key, newVal)
    return setIn(resultObj, key, newVal)
  }, obj)
)

// function setByPromise(path, promise, obj) {
//   const newObj = setByObj(
//     {
//       [`${path}.error`]: null,
//       [`${path}.isLoading`]: true,
//       [`${path}.data`]: null
//       // [`${path}.data`]: promise
//     },
//     obj
//   )
//   const currentVal = getIn(newObj, path)

//   promise
//     .then(data => {
//       currentVal.error = null
//       currentVal.isLoading = true
//       currentVal.data = data
//     })
//     .catch(error => {
//       currentVal.error = error
//       currentVal.isLoading = true
//       currentVal.data = null
//     })

//   return newObj
// }

export const get = curry((path, obj, def = void 0) => getIn(obj, path, def))

export const set = (...args) => {
  const [maybePath] = args
  if (isString(maybePath)) {
    return setByPath(...args)
  }
  return setByObj(...args)
}
