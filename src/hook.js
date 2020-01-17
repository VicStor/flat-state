import { useState } from 'react'
import { set } from './utils'

export const useData = (init = {}) => {
  const [data, setData] = useState(init)

  const setter = (...args) => {
    const newData = set(...args, data)
    setData(newData)
  }

  return [data, setter]
}
