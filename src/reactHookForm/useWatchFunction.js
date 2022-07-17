import {useCallback, useState} from "react";
import {emitter} from "./emitter";

const useWatchFunction = (props) => {
    const {
        control
    } = props

    const initialState = () => control.defaultValues

    const [fields, setFields] = useState(initialState)

    const onSubscribeOneField = (name, eventNames) => {
        if (!eventNames.includes(name)) {
            const subscribe = (value) => setFields(prevState => {
                if (prevState[name] === value) return prevState
                return {...prevState, [name]: value}
            } )
            emitter.on(name, subscribe)
        }

        return fields[name]
    }

    const onSubscribeAllField = (eventNames) => {
        const keys = Object.keys(control.data)

        if (keys.join('') !== eventNames.join('')) {
            keys.forEach(key => {
                const subscribe = (name) => (value) => {
                    setFields(prevState => {
                        if (prevState[name] === value) return prevState
                        return {...prevState, [name]: value}
                    })
                }
                emitter.on(key, subscribe(key))
            })
        }

        return fields
    }

    const onSubscribeMultipleField = (names, eventNames) => {
        names.forEach((name) => {
            if(!eventNames.includes(name)) {
                const subscribe = (value) => {
                    setFields((prevState) => {
                        if (prevState[name] === value) return prevState
                        return {...prevState, [name]: value}
                    })
                }
                emitter.on(name, subscribe)
            }
        })

        return names.reduce((acc, name, idx) => {
            acc[idx] = fields[name]
            return acc
        }, [])
    }

    return useCallback((name) => {
        const eventNames = emitter.eventNames()

        if (typeof name === 'string') return onSubscribeOneField(name, eventNames)
        if (name === undefined) return onSubscribeAllField(eventNames)
        if (Array.isArray(name)) return onSubscribeMultipleField(name, eventNames)

    }, [fields])
}

export default useWatchFunction
