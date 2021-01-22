import React, { useReducer } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import { Typography } from '@material-ui/core'
import { overviewReducer, initialOverviewState } from '../reducers/overviewReducer'
import { motion } from 'framer-motion'

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
  }
});