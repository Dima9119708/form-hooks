import {useEffect, useMemo, useState} from "react";
import {emitter} from "../emitter";

const useController = (props) => {
    const {
        name,
        control,
    } = props

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
        console.log('name', name.split('.'))

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
