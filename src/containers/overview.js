import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'
import { DateTime } from "luxon"
import clsx from 'clsx'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import TwitterIcon from '@mui/icons-material/Twitter'

import { SeasonContext } from '../contexts/season'
import { CountDown } from '../components/countDown'
import { UserContext } from '../contexts/user'
import * as seasonApi from '../api/season'

function Overview() {
  const classes = useStyles()
  const user = useContext(UserContext)
  const season = useContext(SeasonContext)
  const [joining, isJoining] = useState(false)

  const joinContest = async () => {
    if (user.info.id) {
      isJoining(true)
      await seasonApi.join()
      season.updatePlayer()
      isJoining(false)
    } else {
      user.showSignupDialog(true)
    }
  }

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#1E2530', borderRadius: '5px', opacity: '0.8' }} />}
      autoHide
    >
      <Grid container direction='column' alignItems='center' justifyContent='center' className={classes.mainContainer}>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 0.5 }}
        >
          <Box mb={3} className={classes.headlineContainer}>
            <Typography className={classes.headlineText} variant='h5'>CRYPTO</Typography>
            <Typography style={{ fontSize: '45px', letterSpacing: '2px' }} className={classes.headlineText} variant='h2'>INVESTMENT GAME</Typography>
          </Box>

          <Box className={classes.infoBoxContainer}>

            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>prize pool</Typography>
              <Typography color='textPrimary' variant='h3'>
                {season.info.price
                  ? <NumberFormat value={season.info.price} displayType={'text'} prefix={'$'} />
                  : <Skeleton variant="rectangular" animation="wave" width={150} height={32} style={{ borderRadius: '4px' }} />
                }
              </Typography>
            </Box>

            <Box className={clsx(classes.infoBox, classes.customBox)}>

              {!season.info.start && <Skeleton variant="rectangular" animation="wave" width={200} height={70} style={{ borderRadius: '4px' }} />}

              {season.info.start &&
                (DateTime.fromISO(season.info.start) > DateTime.utc()
                  ? <React.Fragment>
                    <Typography variant='h6'>{`season ${season.info.id} begins in`}</Typography>
                    <CountDown date={DateTime.fromISO(season.info.start)} />
                  </React.Fragment>
                  : DateTime.fromISO(season.info.end) > DateTime.utc()
                    ? <React.Fragment>
                      <Typography variant='h6'>{`season ${season.info.id} ends in`}</Typography>
                      <CountDown date={DateTime.fromISO(season.info.end)} />
                    </React.Fragment>
                    : <React.Fragment>
                      <Typography variant='h6'>{`season ${season.info.id} has ended`}</Typography>
                    </React.Fragment>)
              }
            </Box>

            {season.playerInfo.id && <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>You are signed up</Typography>
              <Typography color='textPrimary' variant='h6' style={{ fontSize: '20px' }}>GOOD LUCK!</Typography>
            </Box>}

            {!user.info.id && <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Button variant='contained' color='primary' onClick={joinContest}>sign up now</Button>
            </Box>}

            {user.info.id && !season.playerInfo.id && <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Join season</Typography>
              <Button variant='contained' color='primary' onClick={joinContest} disabled={joining}>join now</Button>
            </Box>}

          </Box>
          <Box mt={8} mb={1}>
            <Typography className={classes.headlineText} variant='h5'>How does it work?</Typography>
          </Box>

          <Typography className={classes.breadText}>
            - Seasons last one month. <br />
            - Each player starts with $20,000 play money, which can be used to trade cryptocurrencies. <br />
            - At the end of each season, the player with the highest net worth (cash+assets) wins. <br />
          </Typography>

          <Box mt={5} mb={1}>
            <Typography className={classes.headlineText} variant='h5'>How do I trade?</Typography>
          </Box>

          <Box mb={1}>
            <Typography className={classes.breadText}>
              Once a season is running, you'll be able to buy and sell cryptos from the market.
              The market can be found under the 'trade' tab. When you've decided on a crypto,
              click the green buy button and choose how much you want to spend. There are currently
              no spending limit, so you could go all-in on one crypto.
            </Typography>

            {/* You can only buy up to $10.000 of a crypto.
            This means that if you own $10.000 or more of a crypto, you won't be able to buy any more of that crypto.
          </Typography>
          <Box mt={0.5}>
            <Typography style={{ fontStyle: 'italic' }}>
              Example: Your current investment of ETH is worth $5000. Your buy limit of ETH is now $10.000 - $5.000 = $5.000.
            </Typography>
          </Box> */}

          </Box>

          <Typography className={classes.breadText}>
            You can keep track of your investments in your portfolio, also found under the 'trade' tab.
            If you wish to sell one of your investments, click the red sell button next to the asset. Be aware
            that there is a sales fee of 2%.
          </Typography>

          <Box mt={5} mb={1}>
            <Typography className={classes.headlineText} variant='h5'>Scoring and prizing</Typography>
          </Box>
          <Box mb={1}>
            <Typography className={classes.breadText}>
              The leaderboard keeps track of all players and their current positions.
              The players' portfolio and trading history can be seen there.
              Leaderboard is updated every 10 min.
            </Typography>
          </Box>
          <Typography className={classes.breadText}>
            To be eligible for a prize, you must have made at least one investment.
            The winner of each season will receive an email with instructions of how to claim their prize.
            Prizes will be paid out in a cryptocurrency.
          </Typography>
          <Box ml={0} mt={1} className={classes.breadText}>
            <Box display='flex' width='140px' justifyContent='space-between'>
              <Box>1st place:</Box>
              <Box>$100</Box>
            </Box>
          </Box>
          <Box mt={5} mb={1}>
            <Typography className={classes.headlineText} variant='h5'>Contact</Typography>
          </Box>
          <Box display='flex'>
            <Typography className={classes.breadText} style={{ width: 'fit-content', marginRight: '20px' }}>
              cryptoseasonsapp@gmail.com
            </Typography>
            <Link target="_blank" href="https://twitter.com/JeppeQin" color='textPrimary'>
              <TwitterIcon />
            </Link>
          </Box>
        </motion.div>
      </Grid >
    </Scrollbars >
  );
}

export default Overview

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
  headlineContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  headlineText: {
    textShadow: '1px 1px 3px rgba(0, 255, 243, 0.9)',
    color: '#fafafa',
    fontFamily: 'astrospace'
  },
  breadText: {
    textShadow: '1px 1px 3px rgba(0, 255, 243, 0.0)',
    color: '#fafafa',
    width: '100%',
    maxWidth: '800px',
    fontFamily: 'system-ui',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px'
  },
  infoBox: {
    width: '330px',
    height: '120px',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
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
    '@media (max-width: 1050px)': {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }
});