import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import { motion } from 'framer-motion'
import clsx from 'clsx'
import ReactGA from 'react-ga'

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import MenuIcon from '@mui/icons-material/Menu'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import InfoIcon from '@mui/icons-material/Info'
import PlusOneIcon from '@mui/icons-material/PlusOne';
import useMediaQuery from '@mui/material/useMediaQuery'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import PersonIcon from '@mui/icons-material/Person'

import MobileMenu from './mobile/menu'
import { Settings } from './settings'
import { UserContext } from '../contexts/user'

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
  const [settings, openSettings] = useState(false)
  const anchorRef = React.useRef(null);

  const user = useContext(UserContext)

  useEffect(() => {
    setActive(menuItems.find(item => location.pathname === item.path) || menuItems[0])
    ReactGA.pageview(location.pathname)
    ReactGA.set({ page: location.pathname })
  }, [location])


  if (mobile) {
    return (
      <React.Fragment>
        <Grid container className={classes.header} style={{ height: '60px', padding: '0' }} alignItems='center' justifyContent='space-between'>
          <IconButton onClick={() => openMenu(true)} size="large">
            <MenuIcon fontSize='large' />
          </IconButton>
          <Box style={{ letterSpacing: '3px', fontSize: '14px', fontWeight: 'bold' }}>
            {active.name}
          </Box>
          <Box width={'60px'} />
        </Grid>
        <MobileMenu open={menu} close={() => openMenu(false)} items={menuItems} active={active} />
      </React.Fragment>
    );
  }

  return (
    <Grid container className={classes.header} justifyContent='space-between' alignItems='center'>
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

          <Link to={'/news'} onClick={() => localStorage.setItem('news_one', true)}>
            <Box className={clsx(classes.logo, classes.item)}>
              <AcUnitIcon className={classes.content} />
              {!localStorage.getItem('news_one') && <Box>
                <PlusOneIcon className={classes.newUpdate} />
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

      <Grid item>
        {user.info.id
          ? <Button startIcon={<PersonIcon />} onClick={() => openSettings(true)} ref={anchorRef} style={{ textTransform: 'none' }}>
            {user.info.name}
          </Button>
          : <Button onClick={() => user.showSignupDialog(true)}>
            signup / login
          </Button>}
      </Grid>

      <Settings anchor={anchorRef.current} open={settings} close={() => openSettings(false)} />

    </Grid>
  );
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
    fontSize: '14px',
    lineHeight: '1.43'
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