import {useEffect, useMemo, useState} from "react";
import {emitter} from "../emitter";

const pathToObject = (values, name) => {
    const arr = name.split('.')

    const obj = values

    let reference = obj
    let referenceEnd = null

    arr.forEach( (str, idx) => {
        const current = arr[idx]
        const next = arr[idx + 1]

        if (Number(next) || next === '0') {
            if (reference[current] === undefined) {
                reference[current] = Array.from({ length: Number(next) })

                reference = reference[current]
            } else {
                reference = reference[current]
            }
        } else {
            if (reference[current] === undefined) {
                reference[current] = (idx === arr.length - 1) ? undefined : {}

                referenceEnd = reference
                reference = reference[current]
            } else {
                referenceEnd = reference

                reference = reference[current]
            }
        }
    })

    return {
        field: arr[arr.length - 1],
        reference: referenceEnd,
        value: referenceEnd[arr[arr.length - 1]]
    }
}

const useController = (props) => {
    const {
        name,
        control,
    } = props

    const { reference, field } = useMemo(() => pathToObject(Object.assign(control.data, JSON.parse(JSON.stringify(control.defaultValues))) , name), [name])
    const defaultValue = useMemo(() => pathToObject(control.defaultValues, name), [name])

    const [value, setValue] = useState(defaultValue.value)

    useEffect(() => {
        const subscribe = (value) => {
            setValue(prevState => {
                if (prevState === value) return prevState
                return value
            })
        }
        emitter.on(name, subscribe)
    }, [name])

    reference[field] = value
console.log('control', control)
    return {
        value,
        onChange: control.onChange(name)
    }
}

export default useController
