import {useEffect, useState} from "react";
import {emitter} from "./emitter";

const useWatch = (props= {}) => {
    const {
        name,
        control = {},
    } = props

    const [value, setValue] = useState(() => {
        if (typeof name === 'string') return control.defaultValues[name]
        if (name === undefined) return control.data

        if (Array.isArray(name)) {
            return name.reduce((acc, key, idx) => {
                acc[idx] = control.defaultValues[key]
                return acc
            }, [])
        }
    })

    const onSubscribeOneField = () => {
        const subscribe = (value) => setValue(value)

        emitter.on(name, subscribe)
        return () => emitter.off(name, subscribe)
    }

    const onSubscribeAllField = () => {
        const keys = Object.keys(control.data)

        const subscribe = (name) => (value) => setValue(prevState => ({...prevState, [name]: value}))

        keys.forEach(key => emitter.on(key, subscribe(key)))

        return () => keys.forEach(key => emitter.on(key, subscribe(key)))
    }

    const onSubscribeSeveralField = () => {
        const subscribe = (idx) => (value) => {
            setValue((prevState) => {
              prevState[idx] = value
              return [...prevState]
            })
        }

        name.forEach((key, idx) => emitter.on(key, subscribe(idx)))

        return () => name.forEach((key, idx) => emitter.on(key, subscribe(idx)))
    }

    useEffect(() => {
        if (typeof name === 'string') return onSubscribeOneField()
        if (name === undefined) return onSubscribeAllField()
        if (Array.isArray(name)) return onSubscribeSeveralField()
    }, [name])

    return value
}

export default useWatch
