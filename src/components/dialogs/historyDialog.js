import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { DateTime } from "luxon"
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
import * as tradeApi from '../../api/trade'
import * as holdingApi from '../../api/holding'

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
    <Dialog open={props.open} onClose={props.close} maxWidth='xl'>
      <Box className={clsx(_classes.dialog, classes.container)}>
        <Typography className={classes.headline}>Portfolio</Typography>
        {PortfolioTable(props.address)}
        <Typography className={classes.headline}>Trade history</Typography>
        {TradeHistoryTable(props.address)}
      </Box>
    </Dialog>
  )
}

function PortfolioTable(address) {
  const classes = useStyles()
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getPortfolio() {
      setLoading(true)

      const holdings = await holdingApi.getHoldings(address)
      setPortfolio(holdings)

      setLoading(false)
    }
    getPortfolio()
  }, [])

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
        {portfolio.map(token =>
          <TableRow>
            <CustomTableCell>
              <Box display='flex'>
                {token.name}
                <Box ml={1}>
                  <Typography variant='body' color='textSecondary'>{token.symbol.toUpperCase()}</Typography>
                </Box>
              </Box>
            </CustomTableCell>
            <CustomTableCell>
              <NumberFormat value={token.amount} displayType={'text'} thousandSeparator />
            </CustomTableCell>
            <CustomTableCell>
              <NumberFormat value={token.value} displayType={'text'} thousandSeparator prefix={'$'} />
            </CustomTableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

function TradeHistoryTable(address) {
  const classes = useStyles()
  const [tradeHistory, setTradeHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getTradeHistory() {
      setLoading(true)

      const trades = await tradeApi.getTradeHistory(address)
      setTradeHistory(trades)

      setLoading(false)
    }
    getTradeHistory()
  }, [])

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
        {tradeHistory.map(trade =>
          <TableRow>
            <CustomTableCell>
              {DateTime.fromISO(trade.date).toFormat('LLL dd, hh:mm:ss')}
            </CustomTableCell>
            <CustomTableCell>{trade.token.name}</CustomTableCell>
            <CustomTableCell style={{ color: trade.side === 'Sell' ? '#e15241' : '#8dc647' }}>
              {trade.side}
            </CustomTableCell>
            <CustomTableCell>
              <NumberFormat value={trade.price} displayType={'text'} thousandSeparator prefix={'$'} />
            </CustomTableCell>
            <CustomTableCell>
              <NumberFormat value={trade.amount} displayType={'text'} thousandSeparator />
            </CustomTableCell>
            <CustomTableCell>
              <NumberFormat value={trade.price * trade.amount} displayType={'text'} thousandSeparator prefix={'$'} decimalScale={2} />
            </CustomTableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

const useStyles = makeStyles({
  container: {
    padding: '20px',
    width: '900px'
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