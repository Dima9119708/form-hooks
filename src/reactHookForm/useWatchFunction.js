import {useCallback, useState} from "react";
import {emitter} from "./emitter";

const useWatchFunction = () => {
    const [value, setValue] = useState({ })

    return useCallback((name) => {
        const eventNames = emitter.eventNames()

        if (!eventNames.includes(name)) {
            const subscribe = (val) => setValue(prevState => ({ ...prevState, [name]: val }))
            emitter.on(name, subscribe)
        }

        return value[name]
    }, [value])
}

export default useWatchFunction
