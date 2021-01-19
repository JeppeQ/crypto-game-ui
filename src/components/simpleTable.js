import React, { useReducer } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
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
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'

const CustomTableCell = withStyles(() => ({
  head: {
    fontSize: 14,
    padding: '12px 24px 12px 16px',
  },
  body: {
    border: 'none',
    padding: '12px 24px 6px 16px',
  }
}))(TableCell)

function SimpleTable(props) {
  const classes = useStyles()

  return (
    <Table className={classes.table} size='small'>
      <TableHead>
        <TableRow style={{ borderBottom: '1px solid grey' }}>
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
            <CustomTableCell>
              <Box display='flex'>
                {row.coin}
                <Box ml={1}>
                  <Typography variant='body' color='textSecondary'>{row.symbol}</Typography>
                </Box>
              </Box>
            </CustomTableCell>
            <CustomTableCell align='right'>{row.balance}</CustomTableCell>
            <CustomTableCell align='right'>{row.value}</CustomTableCell>
            <CustomTableCell align='right'>{row.return}</CustomTableCell>
            <CustomTableCell align='center'>
              <Button variant='contained' className={classes.sellButton}>Sell</Button>
            </CustomTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SimpleTable

const useStyles = makeStyles({
  table: {
    width: '100%',
    backgroundColor: '#1E2530',
    borderCollapse: 'collapse'
  },
  sellButton: {
    padding: 0,
    fontSize: '13px',
    fontWeight: 'bold',
    backgroundColor: 'red',
    color: 'white'
  }
});