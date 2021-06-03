import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { isBrowser } from "react-device-detect"
import ReactGA from 'react-ga'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import Header from './components/header'
import { mainTheme } from './helpers/themes'
import { routes } from './helpers/routes'
import { ConnectorProvider } from './contexts/connector'
import { PlayerProvider } from './contexts/player'
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
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <SeasonProvider>
            <PlayerProvider>
              <ConnectorProvider>
                <Box className='main'>
                  <Header />
                  <Switch>
                    {routes.map((route, index) => {
                      return <Route key={index} path={route.path} component={route.content} />
                    })}
                  </Switch>
                </Box>
              </ConnectorProvider>
            </PlayerProvider>
          </SeasonProvider>
        </ThemeProvider>
      </Box>
    </Router>
  )
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
