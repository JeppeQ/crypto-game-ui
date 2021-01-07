import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Header from './components/header'
import { routes } from './routes'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CssBaseline />
        <Box className='background'>
          {backgroundEffect()}
          <Box className='main'>
            <Header />
            <Switch>
              {routes.map((route, index) => {
                return <Route key={index} path={route.path} component={route.content} />
              })}
            </Switch>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  )
}

function backgroundEffect() {
  return (
    <Box className='backgroundEffects'>
      <Box className='stars' />
      <Box className='stars2' />
    </Box>
  )
}

export default App
