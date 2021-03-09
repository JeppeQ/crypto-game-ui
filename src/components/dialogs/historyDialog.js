import React, { useState } from 'react'
import clsx from 'clsx'

import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import { styles } from './styles'

const CustomTableCell = withStyles(() => ({
  head: {
    fontSize: 14,
    padding: '8px 24px 8px 16px',
    backgroundColor: '#29313e'
  },
  body: {
    fontSize: 14,
    padding: '8px 24px 8px 16px'
  }
}))(TableCell)

export function HistoryDialog(props) {
  const _classes = styles()
  const classes = useStyles()

  return (
    <Dialog open={props.open} onClose={props.close}>
      <Box className={clsx(_classes.dialog, classes.container)}>
        <Typography className={classes.headline}>Portfolio</Typography>
        {PortfolioTable()}
        <Typography className={classes.headline}>Trade history</Typography>
        {TradeHistoryTable()}
      </Box>
    </Dialog>
  )
}

function PortfolioTable() {
  const classes = useStyles()

  return (
    <Table className={classes.table} style={{ marginBottom: '30px' }}>
      <TableHead>
        <TableRow>
          <CustomTableCell>Asset</CustomTableCell>
          <CustomTableCell>Amount</CustomTableCell>
          <CustomTableCell>Value</CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <CustomTableCell>Alpha</CustomTableCell>
          <CustomTableCell>235</CustomTableCell>
          <CustomTableCell>$500</CustomTableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function TradeHistoryTable() {
  const classes = useStyles()

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <CustomTableCell>Date</CustomTableCell>
          <CustomTableCell>Coin</CustomTableCell>
          <CustomTableCell>Side</CustomTableCell>
          <CustomTableCell>Price</CustomTableCell>
          <CustomTableCell>Amount</CustomTableCell>
          <CustomTableCell>Total</CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <CustomTableCell>2013-01-01 23:25</CustomTableCell>
          <CustomTableCell>Alpha</CustomTableCell>
          <CustomTableCell>Buy</CustomTableCell>
          <CustomTableCell>$2</CustomTableCell>
          <CustomTableCell>500</CustomTableCell>
          <CustomTableCell>$1000</CustomTableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

const useStyles = makeStyles({
  container: {
    width: '500px',
    padding: '20px'
  },
  headline: {
    fontSize: 26,
    fontFamily: 'astrospace',
    letterSpacing: '1px',
    marginBottom: '10px'
  },
  table: {
    border: '1px solid rgba(81, 81, 81, 1)'
  }
})