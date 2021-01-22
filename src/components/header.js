import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import LocalBarIcon from '@material-ui/icons/LocalBar'
import { motion, useAnimation } from 'framer-motion'

const menuItems = [
  {
    name: 'OVERVIEW',
    path: '/overview',
    left: '90px',
    width: '180px',
    activeWidth: '178px'
  },
  {
    name: 'TRADE',
    path: '/trade',
    left: '270px',
    width: '180px',
    activeWidth: '178px'
  },
  {
    name: 'LEADERBOARD',
    path: '/leaderboard',
    left: '450px',
    width: '220px',
    activeWidth: '218px'
  }
]

function Header() {
  const classes = useStyles()
  const location = useLocation()
  const [active, setActive] = useState({})

  useEffect(() => {
    setActive(menuItems.find(item => location.pathname === item.path))
  }, [location])

  return (
    <Grid container className={classes.header} justify='space-between' alignItems='center'>
      <Grid item>
        <Grid container>
          <motion.div 
            className={classes.activeContent}
            animate={{ left: active.left, width: active.activeWidth }}
            transition={{ duration: 0.2 }}
          >
            <Box className={classes.activeGlow} />
          </motion.div>
          <Box className={clsx(classes.logo, classes.item)}>
            <LocalBarIcon className={classes.content} />
          </Box>
          {menuItems.map(item => {
            return <Link to={item.path} key={item.name} className={classes.item} style={{ width: item.width }}>
              <Box className={classes.content} style={{ textShadow: item.name === active.name ? '0 0 5px white' : 'none' }}>
                {item.name}
              </Box>
            </Link>
          })}
        </Grid>
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
    paddingRight: '10px',
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
    marginLeft: '-10px'
  },
  content: {
    transform: 'skew(35deg)',
    textDecoration: 'none',
    color: 'white',
  },
  activeContent: {
    position: 'absolute',
    left: '200px',
    width: '178px',
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
    color: 'white'
  }
});