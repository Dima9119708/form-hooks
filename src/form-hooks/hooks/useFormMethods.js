import useWatchFunction from './useWatch/useWatchFunction'

const useFormMethods = (props) => {
  const { control } = props

  const watch = useWatchFunction({ control })

  return { ...control.methods, watch }
}

export default useFormMethods
