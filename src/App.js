import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import {useForm, useController, useWatch} from "./reactHookForm";


const Input = ({ name, control }) => {
  const { value, onChange } = useController({
    name,
    control,
  })

  return <input value={value} onChange={onChange} />
}

let childRender = 0;
function FirstNameWatched({ control }) {
  const values = useWatch({
    control,
    name: ['lastName4', 'lastName5']
  });

  childRender++;

  return (
      <>
        <p>child render count: {childRender}</p>
      </>
  );
}

let parentRender = 0;

function App() {
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      lastName4: '',
      lastName5: '',
      lastName6: 'sacsacsacsac',
      lastName7: '',
    }
  })

  parentRender++;

  useEffect(() => {
    reset({
      // lastName4: 'lastName4',
      // lastName5: 'lastName5',
      // lastName6: 'lastName6',
      // lastName7: 'lastName7',
    })
  }, [])

  const onSubmit = (data) => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
