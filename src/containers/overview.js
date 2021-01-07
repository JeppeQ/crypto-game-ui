import React, { useReducer } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import { Typography } from '@material-ui/core'
import { overviewReducer, initialOverviewState } from '../reducers/overviewReducer'

function Overview() {
  const classes = useStyles()
  const [overviewState, dispatchOverview] = useReducer(overviewReducer, initialOverviewState);

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <Grid container justify='center' className={classes.mainContainer}>
      </Grid>
    </Scrollbars>
  )
}

export default Overview

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '125px',
  },
  loansContainer: {
    width: '1200px',
    padding: '0 10px'
  },
  warningContainer: {
    width: '1180px',
    marginTop: '-20px',
    marginBottom: '20px',
    padding: '10px 20px',
    borderRadius: '2px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: '#1E2530',
    color: 'white'
  }
});