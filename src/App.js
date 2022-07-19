import './App.css';
import {useEffect} from "react";
import {useForm, useController, useWatch, useFomContext, useFormMethods, FormProvider} from "./form-hooks";


const Input = ({ name, control }) => {
  const { value, onChange } = useController({
    name,
    control,
  })

  return <input value={value} onChange={onChange} />
}

let childRender = 0;
function Watched1() {
  const { control } = useFomContext()
  const lastName = useWatch({ control, name: ['lastName', 'lastName2'] })

  childRender++;

  return (
      <>
        <p>child render Watched1 count: {childRender}</p>
      </>
  );
}

let childRender3 = 0;
function Watched3() {
  const { watch, setValue } = useFomContext()
  // const { watch } = useFormMethods({ control })
  watch('lastName3')
  watch(['lastName4', 'lastName5'])
  watch()

  useEffect(() => {

  }, [])

  childRender3++;

  return (
      <>
        <p>child render Watched3 count: {childRender3}</p>
      </>
  );
}


let childRender2 = 0;
function Watched2() {
  const { control } = useFomContext()
  const { watch } = useFormMethods({ control })

  console.log('watch => Watched2', watch())

  childRender2++;

  return (
      <>
        <p>child render Watched2 count: {childRender2}</p>
        <Watched3 />
      </>
  );
}

let parentRender = 0;
function App() {

  const { control, reset, setValue, handleSubmit } = useForm({
      defaultValues: {
          root: {
              field: 'field',
              name: 'TEST defaultValues defaultValues'
          }
      }
  })

  parentRender++;

  useEffect(() => {
      reset({

      })
  }, [])

  const onSubmit = (data) => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <FormProvider control={control}>


            {/*<Input name="firstName" control={control} />*/}

            <p>parent render count: {parentRender}</p>

            <div style={{ margin: '0 0 20px 0' }} />

          {/*  <label style={{ fontSize: 10 }}>lastName</label>*/}
          {/*  <Input name="lastName" control={control} />*/}

          {/*<label style={{ fontSize: 10 }}>lastName2</label>*/}
          {/*  <Input name="lastName2" control={control} />*/}

          {/*<label style={{ fontSize: 10 }}>lastName3</label>*/}
          {/*  <Input name="lastName3" control={control} />*/}

          {/*<label style={{ fontSize: 10 }}>lastName4</label>*/}
          {/*  <Input name="lastName4" control={control} />*/}

          <label style={{ fontSize: 10 }}>lastName5</label>
            <Input name="root.1" control={control} />

          {/*<label style={{ fontSize: 10 }}>lastName6</label>*/}
          {/*  <Input name="lastName6" control={control} />*/}

          {/*<label style={{ fontSize: 10 }}>lastName7</label>*/}
          {/*  <Input name="lastName7" control={control} />*/}

          {/*<label style={{ fontSize: 10 }}>lastName8</label>*/}
          {/*  <Input name="lastName8" control={control} />*/}

          {/*   <div style={{ margin: '0 0 20px 0' }} />*/}


            <div style={{ margin: '0 0 20px 0' }} />

            {/*<Watched1 />*/}
            {/*<Watched2 />*/}

            <button onClick={handleSubmit(onSubmit)}>button</button>

        </FormProvider>

      </header>

    </div>
  );
}

export default App;
