import React, { useContext } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton'

import { LeaderboardTable } from '../components/tables/leaderboardTable'
import { SeasonContext } from '../contexts/season'

function Leaderboard() {
  const classes = useStyles()
  const season = useContext(SeasonContext)

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <Grid container direction='column' alignItems='center' justifyContent='center' className={classes.mainContainer}>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.5 }}
        >
          <Box className={classes.infoBoxContainer}>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Net worth</Typography>
              <Typography color='textPrimary' variant='h4'>
                <NumberFormat value={season.playerInfo.cash + season.playerAssetValue} decimalScale={2} displayType={'text'} thousandSeparator prefix={'$'} />
              </Typography>
            </Box>

            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Position</Typography>
              <Typography color='textPrimary' variant='h4'>
                <NumberFormat value={season.playerInfo.rank} displayType={'text'} prefix={'#'} thousandSeparator />
              </Typography>
            </Box>

            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Players</Typography>
              <Typography color='textPrimary' variant='h4'>
                {season.players
                  ? <NumberFormat value={season.players} displayType={'text'} thousandSeparator />
                  : <Skeleton variant="text" animation="wave" width={125} />
                }
              </Typography>
            </Box>
          </Box>

          <Box className={classes.mobile}>
            <LeaderboardTable />
          </Box>

        </motion.div>
      </Grid >
    </Scrollbars>
  );
}

export default Leaderboard

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '100px',
    marginBottom: '50px',
    padding: '0 10px',
  },
  infoBox: {
    width: '330px',
    height: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '15px'
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
  infoBoxContainer: {
    width: '1050px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    '@media (max-width: 1050px)': {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  mobile: {
    '@media (max-width: 1050px)': {
      width: '95%',
      overflowX: 'auto'
    }
  }
});