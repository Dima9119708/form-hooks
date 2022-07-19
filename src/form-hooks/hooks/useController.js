import {useEffect, useMemo, useState} from "react";
import {emitter} from "../emitter";
import {mutableObjectByPath} from "../units/mutableObjectByPath";

const useController = (props) => {
    const {
        name,
        control,
    } = props

    const { reference, property, defaultValue } = useMemo(() => {
       const defaultValues = JSON.parse(JSON.stringify(control.defaultValues))
       return mutableObjectByPath(Object.assign(control.data, defaultValues), name)
    }, [name])
console.log('control', control)
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        const subscribe = (value) => {
            setValue(prevState => {
                if (prevState === value) return prevState
                return value
            })
        }
        emitter.on(name, subscribe)
    }, [name])

    reference[property] = value

    return {
        value,
        onChange: control.onChange(name)
    }
}

export default useController
