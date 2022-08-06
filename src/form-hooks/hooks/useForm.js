import { useCallback, useEffect, useRef } from 'react'
import { emitter } from '../emitter'
import useWatchFunction from './useWatch/useWatchFunction'
import { get } from '../units/get'
import deepMerge from '../units/deepMerge'

const useForm = (props = {}) => {
  const { mode = 'onChange', defaultValues = {} } = props

  const control = useRef({
    mode,
    values: defaultValues,
    paths: [],
    onChange: (name) => (e) => {
      const { value } = e.target
      emitter.emit(name, value)
    },
    methods: {},
    defaultValues: JSON.parse(JSON.stringify(defaultValues)),
  })

  const watch = useWatchFunction({ control: control.current })

  useEffect(() => {
    return function clear() {
      emitter.removeAllListeners()
    }
  }, [])

  const setValue = useCallback((name, value) => emitter.emit(name, value), [])

  const reset = useCallback((fields = {}) => {
    deepMerge(control.current.values, fields)

    emitter.eventNames().forEach((name) => {
      const value = get(name, fields)

      if (value !== undefined) emitter.emit(name, value)
    })
  }, [])

  const handleSubmit = (callback) => () => {
    callback(control.current.values)
  }

  Object.assign(control.current, { methods: { reset, setValue } })

  return {
    control: control.current,
    setValue,
    reset,
    watch,
    handleSubmit,
  }
}

export default useForm
