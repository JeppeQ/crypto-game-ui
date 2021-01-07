import { Link } from "react-router-dom"
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import LocalBarIcon from '@material-ui/icons/LocalBar'

const menuItems = [
  {
    name: 'OVERVIEW',
    path: '/overview',
    active: true
  },
  {
    name: 'TRADE',
    path: '/trade',
    active: false
  },
  {
    name: 'LEADERBOARD',
    path: '/leaderboard',
    active: false
  }
]

function Header() {
  const classes = useStyles()

  return (
    <Grid container className={classes.header} justify='space-between' alignItems='center'>
      <Grid item>
        <Grid container>
          <Box className={clsx(classes.logo, classes.item)}>
            <LocalBarIcon className={classes.content} />
          </Box>
          {menuItems.map(item => {
            return <Link to={item.path} key={item.name} className={classes.item}>
              <Box className={classes.content}>{item.name}</Box>
              {item.active && <Box className={classes.activeContent} />}
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
    height: '60px',
    backgroundColor: '#1E2530',
    paddingRight: '10px',
    boxShadow: '0px 2px 10px rgba(0, 255, 243, 0.1)',
    position: 'absolute',
    zIndex: '2'
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
    width: '180px',
    borderRight: '2px solid black',
    transform: 'skew(-35deg)',
    letterSpacing: '3px',
    fontSize: '15px'
  },
  logo: {
    width: '100px',
    marginLeft: '-10px'
  },
  content: {
    transform: 'skew(35deg)',
    textDecoration: 'none',
    color: 'white',
    textShadow: '0 0 5px white'
  },
  glowText: {
  },
  activeContent: {
    position: 'absolute',
    width: 'calc(100% - 2px)',
    height: '100%',
    borderLeft: '4px solid rgba(255, 255, 255, 0.1)',
    borderRight: '4px solid rgba(255, 255, 255, 0.1)',
    borderTop: '3px solid rgba(255, 255, 255, 0.2)',
    borderBottom: '3px solid rgba(255, 255, 255, 0.2)',
  },
  connect: {
    height: '38px',
    padding: '0 20px',
    borderRadius: '20px',
    border: '1px solid white',
    color: 'white'
  }
});