import React from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import clsx from 'clsx'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles';

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
            <Typography variant='h3'>news</Typography>

            <Box className={classes.section}>
              <Typography variant='h6'>01-10-2021</Typography>
              <Typography className={classes.breadText}>Season 1 begins.</Typography>
              <Box mt={0.75} />
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