import { useContext } from 'react'
import { FormContext } from '../form-context'
import useWatchFunction from './useWatch/useWatchFunction'

const useFomContext = () => {
  const control = useContext(FormContext)

  const watch = useWatchFunction({ control })

  return { control: control, ...control.methods, watch }
}

export default useFomContext
