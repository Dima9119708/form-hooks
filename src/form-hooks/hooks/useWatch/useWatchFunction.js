import { useEffect, useRef } from 'react'
import useWatchLogic from './useWatchLogic'
import { get } from '../../units/get'

const useWatchFunction = (props) => {
  const { control } = props

  const NAMES = useRef({})

  const { onWatchAllField, onWatchMultipleField, onWatchOneField } =
    useWatchLogic({ control })

  useEffect(() => {
    const values = Object.keys(NAMES.current).map((key) => {
      try {
        return JSON.parse(key)
      } catch {
        return key
      }
    })

    values.forEach((name) => {
      if (typeof name === 'string') return onWatchOneField(name)
      if (name === undefined) return onWatchAllField()
      if (Array.isArray(name)) return onWatchMultipleField(name)
    })
  }, [NAMES])

  return (name) => {
    NAMES.current[JSON.stringify(name)] = null

    const isString = typeof name === 'string'
    const isUndefined = name === undefined
    const isArray = Array.isArray(name)
    const isFunction = typeof name === 'function'

    if (isFunction) return name(control.values)
    if (isString) return get(name, control.values)
    if (isUndefined) return control.values
    if (isArray)
      return name.reduce((acc, name, idx) => {
        acc[idx] = get(name, control.values)
        return acc
      }, [])
  }
}

export default useWatchFunction
