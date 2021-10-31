import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'
import clsx from 'clsx'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles';

import { MarketTable } from '../components/tables/marketTable'
import { PortfolioTable } from '../components/tables/portfolioTable'
import { SeasonContext } from '../contexts/season'

function Trade() {
  const classes = useStyles()
  const season = useContext(SeasonContext)

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <Box className={classes.mainContainer}>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.5 }}
        >

          <Box mb={1}>
            <Typography variant='h3'>Portfolio</Typography>
          </Box>

          <Box className={classes.portfolioContainer}>
            <Box display='flex' flexDirection='column' justifyContent='space-between'>

              <Box className={clsx(classes.infoBox, classes.customBox)}>
                <Typography variant='h6'>Total Assets</Typography>
                <Typography color='textPrimary' variant='h4'>
                  {<NumberFormat value={season.playerAssetValue} thousandSeparator decimalScale={2} displayType={'text'} prefix={'$'} />}
                </Typography>
              </Box>

              <Box className={clsx(classes.infoBox, classes.customBox)}>
                <Typography variant='h6'>Available Cash</Typography>
                <Typography color='textPrimary' variant='h4'>
                  {<NumberFormat value={season.playerInfo.cash} thousandSeparator displayType={'text'} prefix={'$'} />}
                </Typography>
              </Box>

            </Box>

            <Box className={clsx(classes.assetsContainer, classes.customBox)}>
              <PortfolioTable />
            </Box>

          </Box>

          <MarketTable />

        </motion.div>
      </Box>
    </Scrollbars >
  )
}

export default Trade

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px',
    marginBottom: '50px',
    padding: '0 10px',
    '@media (max-width: 1050px)': {
      alignItems: 'initial',
    }
  },
  portfolioContainer: {
    width: '1050px',
    height: '270px',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 1050px)': {
      width: '100%',
      flexDirection: 'column',
      height: 'auto'
    }
  },
  infoBox: {
    width: '280px',
    height: '130px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
    '@media (max-width: 1050px)': {
      marginBottom: '10px',
      height: '100px'
    }
  },
  assetsContainer: {
    width: '760px',
    height: '270px',
    '@media (max-width: 1050px)': {
      height: '200px',
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
  }
});