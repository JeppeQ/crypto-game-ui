import React from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

function News() {
  const classes = useStyles()

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#1E2530', borderRadius: '5px', opacity: '0.8' }} />}
      autoHide
    >
      <Box className={classes.mainContainer}>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.5 }}
        >
          <Box className={clsx(classes.newsContainer, classes.customBox)}>
            <Typography variant='h3'>updates</Typography>
            <Box className={classes.section}>
              <Typography variant='h6'>26-06-2021</Typography>
              <Typography className={classes.breadText}>Players are now hidden on the leaderboard until they make their first trade.</Typography>
              <Box mt={0.75} />
            </Box>
            <Box className={classes.section}>
              <Typography variant='h6'>12-06-2021</Typography>
              <Typography className={classes.breadText}>I hope you are ready because Season 2 is about to begin! Prizes will be paid out in USDC.</Typography>
              <Box mt={0.75} />
              <Typography className={classes.breadText}>
                Please be aware that if you signed up with google, you must add a wallet in order to recieve a prize. You can do this under settings in the top right corner.
              </Typography>
              <Typography className={classes.breadText}>
                If you like, you can also add a twitter account that will show up on the leaderboard.
              </Typography>
              <Box mt={0.75} />
              <Typography className={classes.breadText}>
                Good luck and have fun.
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Scrollbars >
  )
}

export default News

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '150px',
    marginBottom: '50px',
    padding: '0 10px',
    '@media (max-width: 1050px)': {
      marginTop: '100px'
    }
  },
  newsContainer: {
    padding: '20px',
    margin: 'auto',
    width: '850px',
    minHeight: '75vh',
    '@media (max-width: 1050px)': {
      width: '100%',
      marginTop: '5px',
      overflowX: 'auto'
    }
  },
  customBox: {
    backgroundColor: '#1E2530',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRight: '3px solid rgba(255, 255, 255, 0.1)',
    borderTop: '2px solid rgba(255, 255, 255, 0.3)',
    borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0px 2px 10px rgba(0, 255, 243, 0.2)'
  },
  section: {
    marginTop: '30px'
  },
  breadText: {
    color: '#fff',
    fontFamily: 'system-ui',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px'
  },
});