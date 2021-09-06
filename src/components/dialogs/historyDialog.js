import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { DateTime } from "luxon"
import clsx from 'clsx'
import { Scrollbars } from 'react-custom-scrollbars'

import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import { styles } from './styles'
import * as playerApi from '../../api/player'

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
  const [player, setPlayer] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getPlayer() {
      setLoading(true)

      const data = await playerApi.getPlayer(props.player.id)
      setPlayer(data)

      setLoading(false)
    }

    getPlayer()
  }, [props.player.id])

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='xl'>
      <Box className={clsx(_classes.dialog, classes.container)}>
        <Scrollbars autoHeight={true} autoHeightMax={580}>
          <Box p={2.5}>
            <Box display='flex' alignItems='baseline' justifyContent='space-between'>
              <Typography className={classes.headline}>Portfolio</Typography>
              <Typography variant='h6' color='textSecondary' style={{fontSize: '12px'}}>@{props.player['user.name']}</Typography>
            </Box>

            <PortfolioTable loading={loading} holdings={player.holdings} />

            <Typography className={classes.headline}>Trade history</Typography>

            <TradeHistoryTable loading={loading} trades={player.trades} />

          </Box>
        </Scrollbars>
      </Box>
    </Dialog>
  )
}

function loadingRow(cells) {
  return (
    <TableRow>
      {cells.map(cell =>
        <CustomTableCell key={cell}>
          <Skeleton variant="text" animation="wave" />
        </CustomTableCell>
      )}
    </TableRow>
  )
}

function emptyTable(name, cells) {
  return (
    <TableRow>
      <CustomTableCell>
        <Typography variant='subtitle2' color='textSecondary'>No {name}</Typography>
      </CustomTableCell>
      {cells.slice(1).map(cell =>
        <CustomTableCell key={cell} />
      )}
    </TableRow>
  )
}

function PortfolioTable(props) {
  const classes = useStyles()

  const cells = ['Asset', 'Amount', 'Value']

  return (
    <Table className={classes.table} style={{ marginBottom: '30px' }}>

      <TableHead>
        <TableRow>
          {cells.map(cell =>
            <CustomTableCell key={cell}>{cell}</CustomTableCell>
          )}
        </TableRow>
      </TableHead>

      <TableBody>

        {props.loading && loadingRow(cells)}

        {!props.loading && props.holdings.map(token =>
          <TableRow key={token.id}>
            <CustomTableCell>
              <Box display='flex'>
                {token.name}
                <Box ml={1}>
                  <Typography variant='body1' color='textSecondary'>{token.symbol.toUpperCase()}</Typography>
                </Box>
              </Box>
            </CustomTableCell>

            <CustomTableCell>
              <NumberFormat value={token.amount} displayType={'text'} thousandSeparator decimalScale={5} />
            </CustomTableCell>

            <CustomTableCell>
              <NumberFormat value={token.value} displayType={'text'} thousandSeparator prefix={'$'} decimalScale={2} />
            </CustomTableCell>
          </TableRow>
        )}

        {!props.loading && props.holdings.length === 0 && emptyTable('assets', cells)}

      </TableBody>
    </Table>
  )
}


function TradeHistoryTable(props) {
  const classes = useStyles()
  const cells = ['Date', 'Coin', 'Side', 'Price', 'Amount', 'Total']

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {cells.map(cell =>
            <CustomTableCell key={cell}>
              <Typography variant='body1'>{cell}</Typography>
            </CustomTableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>

        {props.loading && loadingRow(cells)}

        {!props.loading && props.trades.map(trade =>
          <TableRow key={trade.date}>
            <CustomTableCell>
              {DateTime.fromISO(trade.date).toFormat('LLL dd, HH:mm:ss')}
            </CustomTableCell>
            <CustomTableCell>
              <Typography variant='body1' color='textSecondary'>{trade.token.symbol.toUpperCase()}</Typography>
            </CustomTableCell>
            <CustomTableCell style={{ color: trade.side === 'Sell' ? '#e15241' : '#8dc647' }}>
              {trade.side}
            </CustomTableCell>
            <CustomTableCell>
              <NumberFormat value={trade.price} displayType={'text'} thousandSeparator prefix={'$'} />
            </CustomTableCell>
            <CustomTableCell>
              <NumberFormat value={trade.amount} displayType={'text'} thousandSeparator decimalScale={5} />
            </CustomTableCell>
            <CustomTableCell>
              <NumberFormat value={trade.price * trade.amount * (trade.side === 'Sell' ? 0.98 : 1) } displayType={'text'} thousandSeparator prefix={'$'} decimalScale={2} />
            </CustomTableCell>
          </TableRow>
        )}

        {!props.loading && props.trades.length === 0 && emptyTable('trades', cells)}

      </TableBody>
    </Table>
  )
}

const useStyles = makeStyles({
  container: {
    width: '900px',
    maxHeight: '600px'
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