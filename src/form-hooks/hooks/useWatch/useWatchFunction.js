import {useCallback, useRef, useState} from "react";
import {emitter} from "../../emitter";
import useWatchLogic from "./useWatchLogic";

const useWatchFunction = (props) => {
    const { control } = props

    const { values, onSubscribeAllField, onSubscribeMultipleField, onSubscribeOneField  } = useWatchLogic({ control })

    return useCallback((name) => {
        const events = emitter.eventNames()

        const isString = typeof name === 'string'
        const isUndefined = name === undefined
        const isArray = Array.isArray(name)


        if (isString && !events.includes(name)) {
            onSubscribeOneField(name)
        }

        if (isArray && !events.some((event) => name.includes(event))) {
            onSubscribeMultipleField(name)
        }

        if(isUndefined && events.length !== Object.keys(control.defaultValues).length) {
            onSubscribeAllField()
        }

        if (isString) return values[name]

        if (isUndefined) return values

        if (isArray) return name.reduce((acc, name, idx) => {
            acc[idx] = values[name]
            return acc
        }, [])
    }, [values])
}

export default useWatchFunction
