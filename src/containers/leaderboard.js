import React, { useReducer } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'

import clsx from 'clsx'
import { LeaderboardTable } from '../components/tables/leaderboardTable'

import { motion } from 'framer-motion'


function Leaderboard() {
  const classes = useStyles()

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <Grid container direction='column' alignItems='center' justify='center' className={classes.mainContainer}>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.5 }}
        >
          <Box mb={'45px'} width='1050px' display='flex' justifyContent='space-between'>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Net worth</Typography>
              <Typography color='textPrimary' variant='h4'>$54.231</Typography>
            </Box>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Position</Typography>
              <Typography color='textPrimary' variant='h4'>532</Typography>
            </Box>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Players</Typography>
              <Typography color='textPrimary' variant='h4'>13.312</Typography>
            </Box>
          </Box>
          <LeaderboardTable />
        </motion.div>
      </Grid >
    </Scrollbars>
  )
}

export default Leaderboard

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '100px',
    marginBottom: '50px'
  },
  infoBox: {
    width: '330px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  assetsContainer: {
    width: '740px',
    height: '270px'
  },
  customBox: {
    backgroundColor: '#1E2530',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRight: '3px solid rgba(255, 255, 255, 0.1)',
    borderTop: '2px solid rgba(255, 255, 255, 0.3)',
    borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0px 2px 10px rgba(0, 255, 243, 0.2)'
  },
  tableContainer: {
    width: '1050px',
  },
});