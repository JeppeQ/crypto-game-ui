import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'
import { DateTime } from "luxon"
import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'

import { Web3Context } from '../contexts/web3'
import { PlayerContext } from '../contexts/player'
import { TournamentContext } from '../contexts/tournament'
import { CountDown } from '../components/countDown'

function Overview() {
  const classes = useStyles()
  const player = useContext(PlayerContext)
  const web3 = useContext(Web3Context)
  const tournament = useContext(TournamentContext)

  const joinContest = () => {
    if (player.info.address) {
      player.signup()
    } else {
      web3.connect(true)
    }
  }

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
          <Box mb={3} width='1050px' display='flex' flexDirection='column'>
            <Typography className={classes.headlineText} variant='h5'>CRYPTO</Typography>
            <Typography style={{ fontSize: '45px', letterSpacing: '2px' }} className={classes.headlineText} variant='h2'>INVESTMENT GAME</Typography>
          </Box>
          <Box mb={'45px'} width='1050px' display='flex'>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>prize pool</Typography>
              <Typography color='textPrimary' variant='h3'>
                {tournament.info.price
                  ? <NumberFormat value={tournament.info.price} displayType={'text'} prefix={'$'} />
                  : <Skeleton variant="rect" animation="wave" width={150} height={32} style={{ borderRadius: '4px' }} />
                }
              </Typography>
            </Box>
            <Box className={clsx(classes.infoBox, classes.customBox)}>
              {!tournament.info.start && <Skeleton variant="rect" animation="wave" width={200} height={70} style={{ borderRadius: '4px' }} />}
              {tournament.info.start &&
                (DateTime.fromISO(tournament.info.start) > DateTime.utc()
                  ? <React.Fragment>
                    <Typography variant='h6'>game begins in</Typography>
                    <CountDown date={DateTime.fromISO(tournament.info.start)} />
                  </React.Fragment>
                  : DateTime.fromISO(tournament.info.end) > DateTime.utc()
                    ? <React.Fragment>
                      <Typography variant='h6'>game ends in</Typography>
                      <CountDown date={DateTime.fromISO(tournament.info.end)} />
                    </React.Fragment>
                    : <Typography variant='h6'>game has ended</Typography>)
              }
            </Box>
            {player.info.tournamentId && <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>You are signed up</Typography>
              <Typography color='textPrimary' variant='h6' style={{ fontSize: '20px' }}>GOOD LUCK!</Typography>
            </Box>}
            {!player.info.tournamentId && <Box className={clsx(classes.infoBox, classes.customBox)}>
              <Typography variant='h6'>Free entry</Typography>
              <Button variant='contained' color='primary' onClick={joinContest}>sign up now</Button>
            </Box>}
          </Box>
          <Box mt={10} mb={1}>
            <Typography className={classes.headlineText} variant='h5'>How does it work?</Typography>
          </Box>
          <Typography className={classes.breadText}>
            - To join the contest, you need to have <Link target="_blank" href='https://metamask.io/download.html'>MetaMask</Link> installed for your browser. <br />
            - The competition starts on May 1st and lasts until May 31st. <br />
            - Each player starts with $50,000 play money, which can be used to trade cryptocurrencies. <br />
            - When the competition ends, the player with the highest networth (cash+assets) wins. <br />
            - Only one entry per person is allowed.
          </Typography>
          <Box mt={5} mb={1}>
            <Typography className={classes.headlineText} variant='h5'>How do I trade?</Typography>
          </Box>
          <Box mb={1}>
            <Typography className={classes.breadText}>
              Once the competition begins, you'll be able to buy and sell cryptos from the market.
              The market can be found under the 'trade' tab. Once you have decided on a crypto,
              click the green buy button, and choose how much you want to spend. There are currently
              no spending limit, so you could go all-in on one crypto.
          </Typography>
          </Box>
          <Typography className={classes.breadText}>
            You can keep track of your investments in your portfolio, also found under the 'trade' tab.
            If you wish to sell one of your investments, click the red sell button next to the asset. Be aware
            that there is a daily limit of 10 trades, so choose your trades carefully.
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
            To be eligible for a prize, you must have made at least one investment, and have traded for more than $20,000.
            Once the competition ends, the top 10 players on the leaderboard will recieve a prize.
            Prizes will be sent to the players wallets after a short verification process.
          </Typography>
          <Box ml={0} mt={1} className={classes.breadText}>
            <Box display='flex' width='155px' justifyContent='space-between'>
              <Box>1st place:</Box>
              <Box>$1000</Box>
            </Box>
            <Box display='flex' width='155px' justifyContent='space-between'>
              <Box>2nd place:</Box>
              <Box>$450</Box>
            </Box>
            <Box display='flex' width='155px' justifyContent='space-between'>
              <Box>3rd place:</Box>
              <Box>$200</Box>
            </Box>
            <Box display='flex' width='155px' justifyContent='space-between'>
              <Box>4-10th place:</Box>
              <Box>$50</Box>
            </Box>
          </Box>
        </motion.div>
      </Grid >
    </Scrollbars >

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
  breadText: {
    textShadow: '1px 1px 3px rgba(0, 255, 243, 0.0)',
    color: '#fafafa',
    width: '800px',
    fontFamily: 'system-ui',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px'
  },
  infoBox: {
    width: '350px',
    height: '120px',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginRight: '20px'
  },
  infoBoxHeadline: {
    height: '30px'
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
  }
});