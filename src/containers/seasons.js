import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { ScoreBoard } from '../components/tables/scoreboardTable'
import * as seasonApi from '../api/season'

function Seasons() {
  const classes = useStyles()

  const [season] = useState(1)
  const [player, setPlayer] = useState({})
  const [playerCount, setPlayerCount] = useState()

  useEffect(() => {
    async function getPlayer() {
      const me = await seasonApi.me(season)
      if (me) {
        setPlayer(me)
      }
    }

    getPlayer()
  }, [season])

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#1E2530', borderRadius: '5px', opacity: '0.8' }} />}
      autoHide
    >
      <Grid container direction='column' alignItems='center' justify='center' className={classes.mainContainer}>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.5 }}
        >
          <Box className={classes.navigationContainer}>
            <Box className={clsx(classes.customBox, classes.season)}>
              <Typography variant='h3' style={{ fontSize: '15px' }}>season 1</Typography>
            </Box>
            <Box className={clsx(classes.customBox, classes.season, classes.inActive)}>
              <Typography variant='h3' style={{ fontSize: '15px' }}>season 2</Typography>
            </Box>
          </Box>
          <Box className={classes.infoBoxContainer}>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Period</Typography>
              <Typography color='textPrimary' variant='h4'>
                <Typography variant='h4' style={{ fontSize: '22px' }}>May 1st - May 31st</Typography>
              </Typography>
            </Box>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Your Placement</Typography>
              <Typography color='textPrimary' variant='h4'>
                {player.rank
                  ? <NumberFormat value={player.rank} displayType={'text'} prefix={'#'} thousandSeparator />
                  : <Skeleton variant="text" animation="wave" width={125} />
                }
              </Typography>
            </Box>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Players</Typography>
              <Typography color='textPrimary' variant='h4'>
                {playerCount
                  ? <NumberFormat value={playerCount} displayType={'text'} thousandSeparator />
                  : <Skeleton variant="text" animation="wave" width={125} />
                }
              </Typography>
            </Box>
          </Box>
          <ScoreBoard season={season} setPlayerCount={setPlayerCount} />
        </motion.div>
      </Grid>
    </Scrollbars >
  )
}

export default Seasons

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '100px',
    marginBottom: '50px',
    padding: '0 10px'
  },
  infoBox: {
    width: '330px',
    height: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '15px'
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
  navigationContainer: {
    height: '50px',
    width: '100%',
    marginBottom: '20px',
    maxWidth: '1050px',
    display: 'flex',
  },
  season: {
    height: '100%',
    width: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
    position: 'relative',
    cursor: 'pointer'
  },
  inActive: {
    opacity: 0.4,
    boxShadow: 'none'
  },
});