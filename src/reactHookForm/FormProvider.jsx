import {FormContext} from "./form-context";

const FormProvider = ({ children, ...rest }) => {
 return <FormContext.Provider value={rest}>{children}</FormContext.Provider>

}

export default FormProvider
