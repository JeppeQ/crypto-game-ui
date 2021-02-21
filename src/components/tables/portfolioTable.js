import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'
import { SellDialog } from '../dialog'
import { styles } from './styles'
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

const cells = [
  { id: 'coin', label: 'Asset', align: 'left' },
  { id: 'balance', label: 'Balance', align: 'right' },
  { id: 'value', label: 'Value', align: 'right' },
  { id: 'return', label: 'Return', align: 'right' },
  { id: 'sell', label: 'Sell', align: 'center' },
]

const testData = [
  { coin: 'Bitcoin', symbol: 'BTC', balance: '1.2', value: '$23', return: '$1000' },
  { coin: 'Bitcoin', symbol: 'BTC', balance: '1.2', value: '$12', return: '$1000' },
  { coin: 'Bitcoin', symbol: 'BTC', balance: '1.2', value: '$12', return: '$1000' },
  { coin: 'Bitcoin', symbol: 'BTC', balance: '1.2', value: '$12', return: '$1000' },
  { coin: 'Bitcoin', symbol: 'BTC', balance: '1.2', value: '$12', return: '$1000' },
]

export function PortfolioTable() {
  const classes = styles()
  const [sell, setSell] = useState()

  return (
    <React.Fragment>
      <Scrollbars>
        <Table className={classes.portfolioTable} size='small'>
          <TableHead>
            <TableRow style={{ borderBottom: '1px solid grey' }}>
              {cells.map(cell => (
                <CustomTableCell key={cell.id} align={cell.align}>
                  <Typography variant='body' color='textSecondary'>{cell.label}</Typography>
                </CustomTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {testData.map(row => (
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