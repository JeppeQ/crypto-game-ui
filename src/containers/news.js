import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'
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
              <Typography variant='h6'>04-05-2021</Typography>
              <Typography className={classes.breadText}>An issue with coingeckos price feed were identified by myself and multiple participants.</Typography>
              <Box mt={0.75} />
              <Typography className={classes.breadText}>On some coins such as SYS and SPARTA, coingecko switches between including data from upbit (which prices some coins significantly higher than other exchanges because of regulations in South Korea) and not including those data, making the price regularly swing 10% or more.</Typography>
              <Box mt={0.75} />
              <Typography className={classes.breadText}>
                Some players profited off this issue by repeatedly buying when upbit was not included, and selling when it was.
                This way they were able to double their networth in a day without any significant risk. Other small coins such as ORBS, POWR and META had the same issue.
              </Typography>
              <Box mt={0.75} />
              <Typography className={classes.breadText}>
                In order for the competition to make sense, I felt it was necessary to cancel all trades that had benefited from this problem. With this being the very first
                season, unforseen problems are bound to happen. The end goal is to make a fun and fair game for all.
              </Typography>
              <Box mt={0.75} />
              <Typography className={classes.breadText}>
                The price feed is still from coingecko, but a temporary solution for coins like SYS and SPARTA has been implemented.
                There might still be smaller coins which have the same issue. Buying and selling off these price swings are not allowed, and your trades will be canceled. A more robust price feed will be used in future seasons.
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