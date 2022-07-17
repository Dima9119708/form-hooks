import {useCallback, useEffect} from "react";
import {emitter} from "./emitter";
import useWatchFunction from "./useWatchFunction";

const useForm = (props= {}) => {
    const {
        mode = 'onChange',
        defaultValues = {}
    } = props

    const control = {
        mode,
        data: {},
        onChange: (name) => (e) => {
            const { value } = e.target
            emitter.emit(name, value)
        },
        methods: {},
        defaultValues,
    }

    const watch = useWatchFunction({ control })

    useEffect(() => {
        return function clear() {
            emitter.removeAllListeners()
        }
    }, [])

    const setValue = useCallback((name, value) => emitter.emit(name, value), [])

    const reset = useCallback((fields = {}) => {
        const keys = Object.keys(fields)

        if (!keys.length) {
            return Object.keys(control.data).forEach((key) => emitter.emit(key, undefined))
        }

        keys.forEach((key) => emitter.emit(key, fields[key]))
    }, [])

    const handleSubmit = (callback) => () => {

        callback(control.current.data)
    }

    Object.assign(control, { methods: { reset, setValue } })

    return {
        control,
        setValue,
        reset,
        watch,
        handleSubmit,
    }
}

export default useForm
