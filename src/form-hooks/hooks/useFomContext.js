import {useContext} from "react";
import {FormContext} from "../form-context";
import useWatchFunction from "./useWatch/useWatchFunction";

const useFomContext = () => {
    const context = useContext(FormContext)
    const watch = useWatchFunction({ control: context.control })

    return { control: context.control, ...context.control.methods, watch }
}

export default useFomContext
