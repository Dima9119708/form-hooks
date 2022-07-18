import {useCallback, useRef, useState} from "react";
import {emitter} from "../../emitter";

const useWatchLogic = (props) => {
    const { control } = props

    const [values, setFields] = useState(control.defaultValues)

    const onSubscribeOneField = useCallback((name) => {
        const subscribe = (value) => setFields(prevState => {
            if (prevState[name] === value) return prevState
            return {...prevState, [name]: value}
        } )
        emitter.on(name, subscribe)
    }, [])

    const onSubscribeAllField = useCallback(() => {
        const keys = Object.keys(control.data)

        keys.forEach(key => {
            const subscribe = (name) => (value) => {
                setFields(prevState => {
                    if (prevState[name] === value) return prevState
                    return {...prevState, [name]: value}
                })
            }
            emitter.on(key, subscribe(key))
        })
    }, [])

    const onSubscribeMultipleField = useCallback((name) => {
        name.forEach((name) => {
            const subscribe = (value) => {
                setFields((prevState) => {
                    if (prevState[name] === value) return prevState
                    return {...prevState, [name]: value}
                })
            }
            emitter.on(name, subscribe)
        })
    }, [])

    return { values, onSubscribeOneField, onSubscribeAllField, onSubscribeMultipleField }
}

export default useWatchLogic
