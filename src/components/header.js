import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import { motion } from 'framer-motion'
import clsx from 'clsx'
import ReactGA from 'react-ga'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import EcoIcon from '@material-ui/icons/Eco'
import MenuIcon from '@material-ui/icons/Menu'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import InfoIcon from '@material-ui/icons/Info'
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AnnouncementIcon from '@material-ui/icons/Announcement'

import { PlayerContext } from '../contexts/player'
import { Web3Context } from '../contexts/web3'
import { ellipseAddress } from '../helpers/utilities'
import Menu from './mobile/menu'
import metamaskLogo from '../assets/images/metamask-icon.png'
import axios from 'axios'

const menuItems = [
  {
    name: 'OVERVIEW',
    path: '/overview',
    left: '90px',
    width: '180px',
    activeWidth: '178px',
    icon: <InfoIcon />
  },
  {
    name: 'TRADE',
    path: '/trade',
    left: '270px',
    width: '180px',
    activeWidth: '178px',
    icon: <LocalAtmIcon />
  },
  {
    name: 'LEADERBOARD',
    path: '/leaderboard',
    left: '450px',
    width: '220px',
    activeWidth: '218px',
    icon: <EqualizerIcon />
  },
  {
    name: 'NEWS',
    path: '/news',
    left: '-32px',
    activeWidth: '120px',
    icon: <AnnouncementIcon />,
    hideMenu: true
  }
]

function Header() {
  const classes = useStyles()
  const location = useLocation()
  const mobile = useMediaQuery('(max-width: 850px)')
  const [active, setActive] = useState({})
  const [menu, openMenu] = useState(false)
  const player = useContext(PlayerContext)
  const web3 = useContext(Web3Context)

  useEffect(() => {
    setActive(menuItems.find(item => location.pathname === item.path) || menuItems[0])
    ReactGA.pageview(location.pathname)
    ReactGA.set({ page: location.pathname })
  }, [location])

  if (mobile) {
    return (
      <React.Fragment>
        <Grid container className={classes.header} style={{ height: '60px', padding: '0' }} alignItems='center' justify='space-between'>
          <IconButton onClick={() => openMenu(true)}>
            <MenuIcon fontSize='large' />
          </IconButton>
          <Box style={{ letterSpacing: '3px', fontSize: '14px', fontWeight: 'bold' }}>
            {active.name}
          </Box>
          <Box width={'60px'} />
        </Grid>
        <Menu open={menu} close={() => openMenu(false)} items={menuItems} active={active} />
      </React.Fragment>
    )
  }

  return (
    <Grid container className={classes.header} justify='space-between' alignItems='center'>
      <Grid item>
        <Grid container>
          <motion.div
            className={classes.activeContent}
            style={{ left: active.left, width: active.activeWidth }}
            animate={{ left: active.left, width: active.activeWidth }}
            transition={{ duration: 0.2 }}
          >
            <Box className={classes.activeGlow} />
          </motion.div>
          <Link to={'/news'} onClick={() => localStorage.setItem('news', true)}>
            <Box className={clsx(classes.logo, classes.item)}>
              <EcoIcon className={classes.content} />
              {!localStorage.getItem('news') && <Box>
                <ExposurePlus1Icon className={classes.newUpdate} />
              </Box>}
            </Box>
          </Link>
          {menuItems.filter(item => !item.hideMenu).map(item => {
            return <Link to={item.path} key={item.name} className={classes.item} style={{ width: item.width }}>
              <Box className={classes.content} style={{ textShadow: item.name === active.name ? '0 0 5px white' : 'none' }}>
                {item.name}
              </Box>
            </Link>
          })}
        </Grid>
      </Grid>
      {process.env.NODE_ENV !== 'production' && <Grid item>
        <Button style={{ marginRight: '10px' }} color='secondary' variant='outlined' onClick={() => {
          axios.post('http://localhost:8080/api/leaderboard/update')
        }}>Update Leaderboard</Button>
        <Button color='secondary' variant='outlined' onClick={() => {
          axios.post('http://localhost:8080/api/token/updateTokens')
        }}>Update Market</Button>
      </Grid>}
      <Grid item>
        {player.info.address
          ? <Button startIcon={<img src={metamaskLogo} width="21" height="21" alt='metaMaskIcon' />}>
            {ellipseAddress(player.info.address, 4, 4)}
          </Button>
          : <Button onClick={() => web3.connect()}>
            connect wallet
          </Button>}
      </Grid>
    </Grid>
  )
}

export default Header

const useStyles = makeStyles({
  header: {
    width: '100%',
    height: '55px',
    background: 'linear-gradient(to left, rgba(30,37,48,0.2), rgba(30,37,48,1) 70%)',
    paddingRight: '15px',
    position: 'absolute',
    zIndex: '2'
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
    width: '180px',
    borderRight: '2px solid black',
    transform: 'skew(-35deg)',
    letterSpacing: '3px',
    fontSize: '14px'
  },
  logo: {
    width: '100px',
    marginLeft: '-10px',
    cursor: 'pointer'
  },
  content: {
    transform: 'skew(35deg)',
    textDecoration: 'none',
    color: 'white',
  },
  activeContent: {
    position: 'absolute',
    height: '100%',
    transform: 'skew(-35deg)',
    borderLeft: '4px solid rgba(255, 255, 255, 0.1)',
    borderRight: '4px solid rgba(255, 255, 255, 0.1)',
    borderTop: '3px solid rgba(255, 255, 255, 0.2)',
    borderBottom: '3px solid rgba(255, 255, 255, 0.2)',
  },
  activeGlow: {
    position: 'absolute',
    left: '25%',
    top: '50%',
    width: '50%',
    height: '0px',
    borderRadius: '50%',
    boxShadow: '0px 0px 50px 20px rgba(0, 255, 243, 0.3)',
  },
  connect: {
    height: '38px',
    padding: '0 20px',
    borderRadius: '20px',
    border: '1px solid white',
    color: 'white',
    width: '25px'
  },
  newUpdate: {
    position: 'absolute',
    transform: 'skew(35deg)',
    textDecoration: 'none',
    color: 'white',
    fontSize: '18px',
    borderRadius: '50%',
    padding: '1px',
    backgroundColor: 'rgba(0, 255, 243, 0.1)',
    boxShadow: '0px 0px 1px 1px rgba(0, 255, 243, 0.3)',
  }
});