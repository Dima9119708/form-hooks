import { useContext, useEffect, useMemo } from 'react'
import useWatchLogic from './useWatchLogic'
import { get } from '../../units/get'
import { FormContext } from '../../form-context'

const useWatch = (props = {}) => {
  const { name, control: controlProps } = props

  const controlContext = useContext(FormContext)
  const control = controlProps || controlContext

  const { onWatchAllField, onWatchMultipleField, onWatchOneField } =
    useWatchLogic({ control })

  useEffect(() => {
    if (typeof name === 'string') return onWatchOneField(name)
    if (name === undefined) return onWatchAllField()
    if (Array.isArray(name)) return onWatchMultipleField(name)
  }, [])

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
