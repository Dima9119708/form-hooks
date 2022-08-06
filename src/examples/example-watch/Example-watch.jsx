import {
  useForm,
  useController,
  FormProvider,
  useWatch,
  useFomContext,
} from '../../form-hooks'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { purple, red } from '@mui/material/colors'

let parentRender = 0
let component1Render = 0
let component2Render = 0
let component3Render = 0
let component4Render = 0

const Input = ({ name }) => {
  const { value, onChange } = useController({ name })

  return <TextField value={value} onChange={onChange} />
}

const Component1 = () => {
  component1Render++

  // useWatch({
  //   name: 'component2.name.[1].name',
  // })

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>reRender = {component1Render}</Box>
      <Input name="component1.name.0.name" />
    </>
  )
}

const Component2 = () => {
  component2Render++

  const { watch } = useFomContext()

  console.log(watch(['component3']))
  console.log(watch(['component1.name.0.name']))
  console.log(watch('component4.name'))
  console.log(watch())

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>reRender = {component2Render}</Box>
      <Input name="component2.name.[1].name" />
    </>
  )
}

const Component3 = () => {
  component3Render++
  const { watch } = useFomContext()

  // useWatch({
  //   name: [
  //     'component2.name.[1].name',
  //     'component1.name.0.name',
  //     'component4.name',
  //   ],
  // })

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>reRender = {component3Render}</Box>
      <Input name="component3" />
    </>
  )
}

const Component4 = () => {
  component4Render++

  const { watch } = useFomContext()

  // watch(['component1.name.0.name'])

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>reRender = {component4Render}</Box>
      <Input name="component4.name" />
    </>
  )
}

const ExampleWatch = () => {
  const { control } = useForm({
    defaultValues: {
      component1: {
        name: [{ name: '' }, { name: '' }],
      },
      component2: {
        name: [null, { name: '' }],
      },
      component3: '',
      component4: { name: '' },
    },
  })

  parentRender++

  return (
    <>
      <Typography component="h1" sx={{ mb: 2, fontSize: '3rem' }}>
        Example Watch
      </Typography>

      <Typography
        component="h1"
        sx={{ mb: 2, fontSize: '2rem', color: purple[700] }}
      >
        FORM HOOKS
      </Typography>

      <Box sx={{ mb: 2, fontSize: '1.5rem' }}>
        reRender Parent = {parentRender}
      </Box>

      <FormProvider {...control}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Component1 />
          </Grid>
          <Grid item xs={3}>
            <Component2 />
          </Grid>
          <Grid item xs={3}>
            <Component3 />
          </Grid>
          <Grid item xs={3}>
            <Component4 />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  )
}

export default ExampleWatch
