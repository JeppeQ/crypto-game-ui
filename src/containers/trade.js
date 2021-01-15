import React, { useReducer } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import { Typography } from '@material-ui/core'

function Trade() {
  const classes = useStyles()

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <Grid container justify='center' className={classes.mainContainer}>
        <Box className={classes.tableContainer}>
          
        </Box>
      </Grid>
    </Scrollbars>
  )
}

export default Trade

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '125px',
    marginBottom: '50px'
  },
  tableContainer: {
    width: '1050px'
  }
});