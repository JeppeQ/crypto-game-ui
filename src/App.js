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
import { mainTheme } from './themes'
import { routes } from './routes'
import { Web3Provider } from './contexts/web3'
import { PlayerProvider } from './contexts/player'
import { TournamentProvider } from './contexts/tournament'

function App() {
  return (
    <Router>
      <Box className='background'>
        {backgroundEffect()}
        <ThemeProvider theme={mainTheme}>
          <CssBaseline />
          <TournamentProvider>
            <PlayerProvider>
              <Web3Provider>
                <Box className='main'>
                  <Header />
                  <Switch>
                    {routes.map((route, index) => {
                      return <Route key={index} path={route.path} component={route.content} />
                    })}
                  </Switch>
                </Box>
              </Web3Provider>
            </PlayerProvider>
          </TournamentProvider>
        </ThemeProvider>
      </Box>
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
