import { useCallback, useState } from 'react'
import { emitter } from '../../emitter'

const useWatchLogic = (props) => {
  const { control } = props

  const [, setFields] = useState()

  const onSubscribeOneField = useCallback((name) => {
    const subscribe = (value) => setFields(value)
    emitter.on(name, subscribe)
  }, [])

  const onSubscribeAllField = useCallback((callback) => {
    const keys = control.paths

    keys.forEach((name) => {
      const subscribe = (value) => {
        if (callback) {
          callback(control.values)
        } else {
          setFields(value)
        }
      }
      emitter.on(name, subscribe)
    })
  }, [])

  const onSubscribeMultipleField = useCallback((name) => {
    name.forEach((name) => {
      const subscribe = (value) => setFields(value)
      emitter.on(name, subscribe)
    })
  }, [])

  return {
    onSubscribeOneField,
    onSubscribeAllField,
    onSubscribeMultipleField,
  }
}

export default useWatchLogic
