import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { isBrowser } from "react-device-detect"
import ReactGA from 'react-ga'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import {
  CssBaseline,
  Box
} from '@mui/material'

import Header from './components/header'
import { mainTheme } from './helpers/themes'
import { routes } from './helpers/routes'
import { UserProvider } from './contexts/user'
import { SeasonProvider } from './contexts/season'

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize("UA-194864148-1")
} else {
  ReactGA.initialize("ga-disabled-UA-194864148-1")
}

function App() {
  return (
    <Router>
      <Box className='background'>
        {isBrowser && BackgroundEffect()}
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <UserProvider>
              <SeasonProvider>
                <Box className='main'>
                  <Header />
                  <Switch>
                    {routes.map((route, index) => {
                      return <Route key={index} path={route.path} component={route.content} />
                    })}
                  </Switch>
                </Box>
              </SeasonProvider>
            </UserProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Box>
    </Router>
  );
}

function BackgroundEffect() {
  return (
    <Box className='backgroundEffects'>
      <Box className='stars' />
      <Box className='stars2' />
    </Box>
  )
}

export default App
