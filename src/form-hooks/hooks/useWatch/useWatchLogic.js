import { useCallback, useContext, useState } from 'react'
import { emitter } from '../../emitter'
import { FormContext } from '../../form-context'

const useWatchLogic = (props) => {
  const { control } = props

  const [, setFields] = useState()

  const onWatchOneField = useCallback((name) => {
    const subscribe = () => setFields({})
    emitter.on(name, subscribe)
  }, [])

  const onWatchAllField = useCallback(() => {
    const keys = control.paths

    keys.forEach((name) => {
      const subscribe = () => setFields({})
      emitter.on(name, subscribe)
    })
  }, [])

  const onWatchMultipleField = useCallback((name) => {
    name.forEach((name) => {
      const subscribe = () => setFields({})
      emitter.on(name, subscribe)
    })
  }, [])

  return {
    onWatchOneField,
    onWatchAllField,
    onWatchMultipleField,
  }
}

export default useWatchLogic
