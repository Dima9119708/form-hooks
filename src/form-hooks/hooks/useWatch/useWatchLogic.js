import { useCallback, useState } from 'react'
import { emitter } from '../../emitter'

const useWatchLogic = (props) => {
  const { control } = props

  const [, setFields] = useState({})

  const onSubscribeOneField = useCallback((name) => {
    const subscribe = () => setFields({})
    emitter.on(name, subscribe)
  }, [])

  const onSubscribeAllField = useCallback(() => {
    const keys = Object.keys(control.values)

    keys.forEach((key) => {
      const subscribe = () => setFields({})
      emitter.on(key, subscribe)
    })
  }, [])

  const onSubscribeMultipleField = useCallback((name) => {
    name.forEach((name) => {
      const subscribe = () => setFields({})
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
