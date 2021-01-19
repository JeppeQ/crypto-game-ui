import React, { useReducer } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'

import clsx from 'clsx'
import DataTable from '../components/table'
import SimpleTable from '../components/simpleTable'
import { SearchBar } from '../components/searchBar'

const tradeCells = [
  { id: 'rank', tooltip: false, disablePadding: true, label: '#' },
  { id: 'coin', label: 'Coin' },
  { id: 'price', label: 'Price' },
  { id: 'priceChangeDay', label: '24h' },
  { id: 'marketCap', label: 'Market Cap' },
  { id: 'buy', label: 'Buy' }
]

const testData = [
  { rank: '1', coin: 'Bitcoin', symbol: 'BTC', price: '$34300', priceChangeDay: '12%', marketCap: '36B' },
  { rank: '2', coin: 'Ethereum', symbol: 'ETH', price: '$1200', priceChangeDay: '12%', marketCap: '16B' },
  { rank: '3', coin: 'Yearn Finance', symbol: 'YFI', price: '$32300', priceChangeDay: '5%', marketCap: '1B' },
  { rank: '4', coin: 'Alpha Finance', symbol: 'ALPHA', price: '$0.45', priceChangeDay: '22%', marketCap: '754M' },
  { rank: '5', coin: 'Nebulas', symbol: 'NAS', price: '$0.31', priceChangeDay: '1%', marketCap: '24M' },
]

function Leaderboard() {
  const classes = useStyles()

  return (
    <Scrollbars
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: '#fff', borderRadius: '5px', opacity: '0.4' }} />}
    >
      <Grid container direction='column' alignItems='center' justify='center' className={classes.mainContainer}>
        <Box mb={'45px'} width='1050px' display='flex' justifyContent='space-between'>
          <Box className={clsx(classes.infoBox, classes.customBox)}>
            <Typography variant='body2' color='textSecondary'>Net worth</Typography>
            <Typography color='textPrimary' variant='h4'>$54.231</Typography>
          </Box>
          <Box className={clsx(classes.infoBox, classes.customBox)}>
            <Typography variant='body2' color='textSecondary'>Position</Typography>
            <Typography color='textPrimary' variant='h4'>532</Typography>
          </Box>
          <Box className={clsx(classes.infoBox, classes.customBox)}>
            <Typography variant='body2' color='textSecondary'>Players</Typography>
            <Typography color='textPrimary' variant='h4'>13.312</Typography>
          </Box>
        </Box>
        <Box mb={1} width='1050px' display='flex' justifyContent='space-between'>
          <Typography color='textPrimary' variant='h4'>Leaderboard</Typography>
          <SearchBar />
        </Box>
        <Box className={clsx(classes.tableContainer, classes.customBox)}>
          <DataTable
            cells={tradeCells}
            data={testData}
          />
        </Box>
      </Grid >
    </Scrollbars >
  )
}

export default Leaderboard

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    marginTop: '100px',
    marginBottom: '50px'
  },
  infoBox: {
    width: '330px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
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
});