import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import NumberFormat from 'react-number-format'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'
import { SellDialog } from '../dialogs/sellDialog'
import { Scrollbars } from 'react-custom-scrollbars'
import { makeStyles } from '@material-ui/core/styles'
import { styles } from './styles'

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

const cells = [
  { id: 'coin', label: 'Asset', align: 'left', sortable: true },
  { id: 'balance', label: 'Balance', align: 'right', sortable: true },
  { id: 'value', label: 'Value', align: 'right', sortable: true },
  { id: 'return', label: 'Return', align: 'right', sortable: true },
  { id: 'sell', label: 'Sell', align: 'center', sortable: false },
]

const testData = [
  { coin: 'Bitcoin', symbol: 'BTC', balance: 1.2, value: 23, return: 1000 },
  { coin: 'Ethereum', symbol: 'ETH', balance: 10, value: 12, return: 1000 },
  { coin: 'Alpha', symbol: 'ALPHA', balance: 100000, value: 12, return: 1000 },
  { coin: 'Sushi', symbol: 'SUSHI', balance: 1230, value: 12, return: 1000 },
  { coin: 'Aave', symbol: 'AAVE', balance: 500, value: 12, return: 1000 },
]

export function PortfolioTable() {
  const _classes = styles()
  const classes = useStyles()

  const [sell, setSell] = useState()
  const [orderBy, setOrderBy] = useState()
  const [direction, setDirection] = useState()
  const [portfolio, setPortfolio] = useState(testData)

  function headerClick(id, sortable) {
    if (!sortable) {
      return
    }

    if (orderBy === id) {
      if (direction === 'DESC') {
        setDirection('ASC')
      } else {
        setDirection('DESC')
      }
    } else {
      setOrderBy(id)
      setDirection('ASC')
    }
  }

  function sortPortfolio() {
    if (!orderBy) {
      return portfolio
    }

    if (direction === 'DESC') {
      return portfolio.sort((a, b) => a[orderBy] < b[orderBy] ? -1 : 1)
    }

    return portfolio.sort((a, b) => a[orderBy] > b[orderBy] ? -1 : 1)
  }

  return (
    <React.Fragment>
      <Scrollbars>
        <Table className={classes.portfolioTable} size='small'>
          <TableHead>
            <TableRow style={{ borderBottom: '1px solid grey' }}>
              {cells.map(cell => (
                <CustomTableCell key={cell.id} align={cell.align} onClick={() => headerClick(cell.id, cell.sortable)}>
                  <Box style={{ cursor: cell.sortable ? 'pointer' : '', userSelect: 'none' }}>
                    {orderBy === cell.id
                      ? <Typography variant='body' color='textSecondary' className={_classes.activeColumn}>{cell.label}</Typography>
                      : <Typography variant='body' color='textSecondary'>{cell.label}</Typography>
                    }
                  </Box>
                </CustomTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortPortfolio().map(row => (
              <TableRow key={row._id}>
                <CustomTableCell>
                  <Box display='flex'>
                    {row.coin}
                    <Box ml={1}>
                      <Typography variant='body' color='textSecondary'>{row.symbol}</Typography>
                    </Box>
                  </Box>
                </CustomTableCell>
                <CustomTableCell align='right'>{<NumberFormat value={row.balance} displayType={'text'} thousandSeparator />}</CustomTableCell>
                <CustomTableCell align='right'>{<NumberFormat value={row.value} displayType={'text'} prefix={'$'} />}</CustomTableCell>
                <CustomTableCell align='right'>{<NumberFormat value={row.return} displayType={'text'} prefix={'$'} />}</CustomTableCell>
                <CustomTableCell align='center'>
                  <Button variant='contained' className={classes.sellButton} onClick={() => setSell(true)}>Sell</Button>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {sell && <SellDialog
          open={sell}
          close={() => setSell(false)}
          token={'alpha'}
        />}
      </Scrollbars>
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  portfolioTable: {
    width: '100%',
    backgroundColor: '#1E2530',
    borderCollapse: 'collapse'
  },
  sellButton: {
    padding: '1px 0',
    fontSize: '13px',
    fontWeight: 'bold',
    backgroundColor: '#c50606',
    "&:hover": {
      backgroundColor: '#e60808'
    }
  },
})