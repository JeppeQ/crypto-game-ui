import React, { useReducer } from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { Web3Context } from '../contexts/web3'

function Overview() {
  const classes = useStyles()
  const web3 = useContext(Web3Context)

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
          <Box mb={3} width='1050px' display='flex' flexDirection='column'>
            <Typography className={classes.headlineText} variant='h5'>CRYPTO</Typography>
            <Typography style={{ fontSize: '45px', letterSpacing: '2px' }} className={classes.headlineText} variant='h2'>INVESTMENT GAME</Typography>
          </Box>
          <Box mb={'45px'} width='1050px' display='flex'>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>prize pool</Typography>
              <Typography color='textPrimary' variant='h4'>$2000</Typography>
            </Box>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>game begins in</Typography>
              <Typography color='textPrimary' variant='h4'>23D 14H</Typography>
            </Box>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>free entry</Typography>
              <Button variant='contained' color='primary'>sign up now</Button>
            </Box>
          </Box>
          <Box mt={10}>
            <Typography className={classes.headlineText} variant='h5'>How does it work?</Typography>
          </Box>
        </motion.div>
      </Grid >
    </Scrollbars>

  )
}

export default Overview

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '150px',
    marginBottom: '50px'
  },
  headlineText: {
    textShadow: '1px 1px 3px rgba(0, 255, 243, 0.9)',
    color: '#fafafa',
    fontFamily: 'astrospace'
  },
  infoBox: {
    width: '350px',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginRight: '20px'
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
});