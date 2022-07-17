import {useEffect, useLayoutEffect, useState} from "react";
import {emitter} from "./emitter";

const useController = (props) => {
    const {
        name,
        control,
    } = props

    const [value, setValue] = useState('')

    useEffect(() => {
        const subscribe = (value) => setValue(value)
        emitter.on(name, subscribe)

        return () => emitter.off(name, subscribe)
    }, [name])

    useLayoutEffect(() => {
        control.data[name] = value
    })

    return {
        value,
        onChange: control.onChange(name)
    }
}

export default useController
