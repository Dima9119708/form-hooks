import { useEffect, useMemo } from "react";
import useWatchLogic from "./useWatchLogic";

const useWatch = (props= {}) => {
    const {
        name,
        control = {},
    } = props

    const { values, onSubscribeAllField, onSubscribeMultipleField, onSubscribeOneField  } = useWatchLogic({ control })

    useEffect(() => {
        if (typeof name === 'string') return onSubscribeOneField(name)
        if (name === undefined) return onSubscribeAllField()
        if (Array.isArray(name)) return onSubscribeMultipleField(name)
    }, [name])

    return useMemo(() => {
        if (typeof name === 'string') return values[name]
        if (name === undefined) return values

        if (Array.isArray(name)) {
            return name.reduce((acc, key, idx) => {
                acc[idx] = values[key]
                return acc
            }, [])
        }
    }, [name, values])
}

export default useWatch
