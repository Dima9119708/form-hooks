import {useEffect, useMemo, useState} from "react";
import {emitter} from "../emitter";

const pathToObject = (values, name) => {
    const arr = name.split('.')

    const obj = values

    let nesting = obj

    arr.forEach( (str, idx) => {
        const current = arr[idx]
        const next = arr[idx + 1]

        if (Number(next) || next === '0') {
            if (nesting[current] === undefined) {
                nesting[current] = []
                nesting = nesting[current]
            } else {
                nesting = nesting[current]
            }
        } else {
            if (nesting[current] === undefined) {
                nesting[current] = idx === arr.length - 1 ? undefined : {}
                nesting = nesting[current]
            } else {
                nesting = nesting[current]
            }
        }
    })

    return obj
}

const useController = (props) => {
    const {
        name,
        control,
    } = props
    pathToObject(control.defaultValues, name)
    const fields = control.data
    const defaultValues = control.defaultValues

    const [value, setValue] = useState(defaultValues[name])

    useEffect(() => {
        const subscribe = (value) => {
            setValue(prevState => {
                if (prevState === value) return prevState
                return value
            })
        }
        emitter.on(name, subscribe)
    }, [name])


    const formatName = useMemo(() => {

        return name
    }, [name])

    defaultValues[name] = control.defaultValues[name]
    fields[name] = value

    return {
        value,
        onChange: control.onChange(name)
    }
}

export default useController
