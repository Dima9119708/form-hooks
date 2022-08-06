import React from 'react'
import ExampleWatch from './examples/example-watch/Example-watch'
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '62.5%',
        },
        p: {
          margin: 0,
        },
      },
    },
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />

        <Container>
          <Box sx={{ mb: 15 }}>
            <ExampleWatch />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
