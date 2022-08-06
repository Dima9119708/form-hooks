import { useContext, useEffect, useMemo, useState } from 'react'
import { emitter } from '../emitter'
import { mutableObjectByPath } from '../units/mutableObjectByPath'
import { FormContext } from '../form-context'

const useController = (props) => {
  const { name, control: controlProps } = props

  const controlContext = useContext(FormContext)
  const control = controlProps || controlContext

  const { reference, property, defaultValue } = useMemo(() => {
    control.paths.push(name)
    return mutableObjectByPath(control.values, name)
  }, [name])

  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const subscribe = (value) => {
      reference[property] = value
      setValue(value)
    }

    emitter.on(name, subscribe)
  }, [name])

  return {
    value,
    onChange: control.onChange(name),
  }
}

export default useController
