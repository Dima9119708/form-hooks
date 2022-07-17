import {useCallback, useEffect, useRef} from "react";
import {emitter} from "./emitter";
import useWatchFunction from "./useWatchFunction";

const useForm = (props= {}) => {
    const {
        mode = 'onChange',
        defaultValues = {}
    } = props

    const setValue = useCallback((name, value) => emitter.emit(name, value), [])

    const reset = useCallback((fields) => {
        const keys = Object.keys(fields)
        keys.forEach((key) => emitter.emit(key, fields[key]))
    }, [])

    const control = useRef({
        mode,
        data: {},
        onChange: (name) => (e) => {
            const { value } = e.target
            emitter.emit(name, value)
        },
        methods: { setValue, reset },
        defaultValues,
    })

    const watch = useWatchFunction()

    useEffect(() => {
        const keys = Object.keys(defaultValues)
        keys.forEach((key) => emitter.emit(key, defaultValues[key]))

        return function clear() {
            emitter.removeAllListeners()
        }
    }, [])

    const handleSubmit = (callback) => () => {

        callback(control.current.data)
    }

    return {
        control: control.current,
        setValue,
        reset,
        watch,
        handleSubmit,
    }
}

export default useForm
