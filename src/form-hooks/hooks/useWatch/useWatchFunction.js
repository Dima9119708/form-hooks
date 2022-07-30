import { useCallback, useRef, useState } from 'react'
import { emitter } from '../../emitter'
import useWatchLogic from './useWatchLogic'
import { get } from '../../units/get'

const useWatchFunction = (props) => {
  const { control } = props

  const { onSubscribeAllField, onSubscribeMultipleField, onSubscribeOneField } =
    useWatchLogic({ control })

  return (name) => {
    const events = emitter.eventNames()

    const isString = typeof name === 'string'
    const isUndefined = name === undefined
    const isArray = Array.isArray(name)

    if (isString && !events.includes(name)) {
      onSubscribeOneField(name)
    }

    if (isArray && !events.some((event) => name.includes(event))) {
      onSubscribeMultipleField(name)
    }

    if (
      isUndefined &&
      events.length !== Object.keys(control.defaultValues).length
    ) {
      onSubscribeAllField()
    }

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
