import {useContext} from "react";
import {FormContext} from "./form-context";

const useFomContext = () => {
    return useContext(FormContext)
}

export default useFomContext
