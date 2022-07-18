import {useCallback, useRef, useState} from "react";
import {emitter} from "../../emitter";
import useWatchLogic from "./useWatchLogic";

const useWatchFunction = (props) => {
    const { control } = props

    const { values, onSubscribeAllField, onSubscribeMultipleField, onSubscribeOneField  } = useWatchLogic({ control })

    const watchSubscribe = useRef({
        subscribe: (name) => {
            if (typeof name === 'string') onSubscribeOneField(name)
            if (name === undefined) onSubscribeAllField()
            if (Array.isArray(name)) onSubscribeMultipleField(name)
        },
        isSubscribe: true
    })

    return useCallback((name) => {
        if (watchSubscribe.current.isSubscribe) {
            watchSubscribe.current.subscribe(name)
            watchSubscribe.current.isSubscribe = false
        }

        if (typeof name === 'string') return values[name]

        if (name === undefined) return values

        if (Array.isArray(name)) return name.reduce((acc, name, idx) => {
            acc[idx] = values[name]
            return acc
        }, [])
    }, [values])
}

export default useWatchFunction
