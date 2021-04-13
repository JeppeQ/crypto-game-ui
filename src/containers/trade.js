import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'
import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { MarketTable } from '../components/tables/marketTable'
import { PortfolioTable } from '../components/tables/portfolioTable'
import { PlayerContext } from '../contexts/player'

function Trade() {
  const classes = useStyles()
  const player = useContext(PlayerContext)

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
          <Box mb={1} width='1050px' display='flex'>
            <Typography variant='h3'>Portfolio</Typography>
          </Box>
          <Box display='flex' direction='row' justifyContent='space-between' className={classes.portfolioContainer}>
            <Box display='flex' flexDirection='column' justifyContent='space-between'>
              <Box className={clsx(classes.infoBox, classes.customBox)}>
                <Typography variant='h6'>Total Assets</Typography>
                <Typography color='textPrimary' variant='h4'>
                  {<NumberFormat value={player.assetValue} thousandSeparator decimalScale={2} displayType={'text'} prefix={'$'} />}
                </Typography>
              </Box>
              <Box className={clsx(classes.infoBox, classes.customBox)}>
                <Typography variant='h6'>Available Cash</Typography>
                <Typography color='textPrimary' variant='h4'>
                  {<NumberFormat value={player.info.cash} thousandSeparator displayType={'text'} prefix={'$'} />}
                </Typography>
              </Box>
            </Box>
            <Box className={clsx(classes.assetsContainer, classes.customBox)}>
              <PortfolioTable />
            </Box>
          </Box>
          <MarketTable />
        </motion.div>
      </Grid >
    </Scrollbars >
  )
}

export default Trade

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '100px',
    marginBottom: '50px'
  },
  portfolioContainer: {
    width: '1050px',
    height: '270px',
    marginBottom: '40px'
  },
  infoBox: {
    width: '280px',
    height: '130px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px'
  },
  assetsContainer: {
    width: '760px',
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