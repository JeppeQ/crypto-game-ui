import React, { useReducer } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'

const CustomTableCell = withStyles(() => ({
  head: {
    fontSize: 14
  }
}))(TableCell)

const buyButton = withStyles(() => ({

}))

export function MarketTable(props) {
  const classes = useStyles()

  return (
    <Table component={Paper} className={classes.table}>
      <TableHead>
        <TableRow>
          {props.cells.map(cell => (
            <CustomTableCell key={cell.id} align={cell.align}>
              <Typography variant='body' color='textSecondary'>{cell.label}</Typography>
            </CustomTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map(row => (
          <TableRow key={row._id}>
            <TableCell>{row.rank}</TableCell>
            <TableCell>
              <Box display='flex'>
                {row.coin}
                <Box ml={1}>
                  <Typography variant='body' color='textSecondary'>{row.symbol}</Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell align='right'>{row.price}</TableCell>
            <TableCell align='right'>{row.priceChangeDay}</TableCell>
            <TableCell align='right'>{row.marketCap}</TableCell>
            <TableCell align='center'>
              <Button variant='contained' className={classes.buyButton}>Buy</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function LeaderboardTable(props) {
  const classes = useStyles()

  return (
    <Table component={Paper} className={classes.table}>
      <TableHead>
        <TableRow>
          {props.cells.map(cell => (
            <CustomTableCell key={cell.id} align={cell.align}>
              <Typography variant='body' color='textSecondary'>{cell.label}</Typography>
            </CustomTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map(row => (
          <TableRow key={row._id}>
            <TableCell>{row.rank}</TableCell>
            <TableCell>{row.player}</TableCell>
            <TableCell>{row.mainAsset}</TableCell>
            <TableCell align='right'>{row.positionChangeDay}</TableCell>
            <TableCell align='right'>{row.netWorth}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const useStyles = makeStyles({
  table: {
    width: '100%',
    backgroundColor: '#1E2530',
  },
  buyButton: {
    padding: 0,
    fontSize: '13px',
    fontWeight: 'bold',
    backgroundColor: 'green',
    color: 'white'
  }
});