import React, { useContext } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { LeaderboardTable } from '../components/tables/leaderboardTable'
import { PlayerContext } from '../contexts/player'
import { TournamentContext } from '../contexts/tournament'

function Leaderboard() {
  const classes = useStyles()
  const player = useContext(PlayerContext)
  const tournament = useContext(TournamentContext)

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
          {/* <Box className={clsx(classes.customBox, classes.warningBox)}>
            <Typography style={{ lineHeight: 1.3, fontSize: '15px', textTransform: 'none', color: 'rgba(255, 255, 255, 0.7)' }}>
            </Typography>
          </Box> */}
          <Box className={classes.infoBoxContainer}>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Net worth</Typography>
              <Typography color='textPrimary' variant='h4'>
                <NumberFormat value={player.info.cash + player.assetValue} decimalScale={2} displayType={'text'} thousandSeparator prefix={'$'} />
              </Typography>
            </Box>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Position</Typography>
              <Typography color='textPrimary' variant='h4'>
                <NumberFormat value={player.info.rank} displayType={'text'} prefix={'#'} thousandSeparator />
              </Typography>
            </Box>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Players</Typography>
              <Typography color='textPrimary' variant='h4'>
                {tournament.players
                  ? <NumberFormat value={tournament.players} displayType={'text'} thousandSeparator />
                  : <Skeleton variant="text" animation="wave" width={125} />
                }
              </Typography>
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
  tableContainer: {
    width: '1050px',
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
  warningBox: {
    width: '100%',
    marginBottom: '20px',
    maxWidth: '1050px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center'
  }
});