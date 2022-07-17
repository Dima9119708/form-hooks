import './App.css';
import {useEffect} from "react";
import { useForm, useController } from "./reactHookForm";
import useFormMethods from "./reactHookForm/useFormMethods";

const Input = ({ name, control }) => {
  const { value, onChange } = useController({
    name,
    control,
  })

  return <input value={value} onChange={onChange} />
}

let childRender = 0;
function FirstNameWatched({ control }) {
  const { watch }  = useFormMethods({ control })

  childRender++;

  return (
      <>
        <p>child render count: {childRender}</p>
      </>
  );
}

let parentRender = 0;

function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      lastName: 'sacsacascasc',
      lastName4: '',
      lastName5: '',
      lastName6: 'sacsacsacsac',
      lastName7: '',
    }
  })

  parentRender++;

  useEffect(() => {

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

          <Input name="firstName" control={control} />

          <p>parent render count: {parentRender}</p>

          <div style={{ margin: '0 0 20px 0' }} />

          <Input name="lastName" control={control} />
          <Input name="lastName2" control={control} />
          <Input name="lastName3" control={control} />
          <Input name="lastName4" control={control} />
          <Input name="lastName5" control={control} />
          <Input name="lastName6" control={control} />
          <Input name="lastName7" control={control} />
          <Input name="lastName8" control={control} />

           <div style={{ margin: '0 0 20px 0' }} />


          <div style={{ margin: '0 0 20px 0' }} />

          <FirstNameWatched control={control} />

          <button onClick={handleSubmit(onSubmit)}>button</button>
      </header>
    </div>
  );
}

export default App;
