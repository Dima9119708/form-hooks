import { useEffect, useMemo } from 'react'
import useWatchLogic from './useWatchLogic'
import { get } from '../../units/get'

const useWatch = (props = {}) => {
  const { name, control = {} } = props

  const { onSubscribeAllField, onSubscribeMultipleField, onSubscribeOneField } =
    useWatchLogic({ control })

  useEffect(() => {
    if (typeof name === 'string') return onSubscribeOneField(name)
    if (name === undefined) return onSubscribeAllField()
    if (Array.isArray(name)) return onSubscribeMultipleField(name)
  }, [name])

  return useMemo(() => {
    if (typeof name === 'string') return get(name, control.values)
    if (name === undefined) return control.values

    if (Array.isArray(name)) {
      return name.reduce((acc, path, idx) => {
        acc[idx] = get(path, control.values)
        return acc
      }, [])
    }
  }, [name])
}

export default useWatch
