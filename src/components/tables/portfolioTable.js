import React, { useState, useContext } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import NumberFormat from 'react-number-format'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton'

import { styles } from './styles'
import { SellDialog } from '../dialogs/sellDialog'
import { SeasonContext } from '../../contexts/season'


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
  { id: 'name', label: 'Asset', align: 'left', sortable: true },
  { id: 'amount', label: 'Balance', align: 'right', sortable: true },
  { id: 'value', label: 'Value', align: 'right', sortable: true },
  { id: 'returns', label: 'Return', align: 'right', sortable: true },
  { id: 'sell', label: 'Sell', align: 'center', sortable: false },
]

export function PortfolioTable() {
  const _classes = styles()
  const classes = useStyles()
  const season = useContext(SeasonContext)

  const [sell, setSell] = useState()
  const [orderBy, setOrderBy] = useState()
  const [direction, setDirection] = useState()

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
      return season.playerHoldings.sort((a, b) => b['value'] - a['value'])
    }

    if (direction === 'DESC') {
      return season.playerHoldings.sort((a, b) => a[orderBy] < b[orderBy] ? -1 : 1)
    }

    return season.playerHoldings.sort((a, b) => a[orderBy] > b[orderBy] ? -1 : 1)
  }

  function loadingRow() {
    return (
      <TableRow>
        {cells.map(cell => (
          <CustomTableCell key={'asset_loading_' + cell.id}>
            <Skeleton variant="text" animation="wave" />
          </CustomTableCell>
        ))}
      </TableRow>
    )
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
                      ? <Typography variant='body1' color='textSecondary' className={_classes.activeColumn}>{cell.label}</Typography>
                      : <Typography variant='body1' color='textSecondary'>{cell.label}</Typography>
                    }
                  </Box>
                </CustomTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {season.playerAssetsLoading && loadingRow()}

            {!season.playerAssetsLoading && season.playerHoldings.length === 0 &&
              <Box p={2}>
                <Typography variant='subtitle2' color='textSecondary'>No assets</Typography>
              </Box>
            }

            {!season.playerAssetsLoading && sortPortfolio().map(row => (
              <TableRow key={row.id}>
                <CustomTableCell>
                  <Box display='flex'>
                    <Typography variant='body1'>{row.name}</Typography>
                    <Box ml={1}>
                      <Typography variant='body1' color='textSecondary'>{row.symbol.toUpperCase()}</Typography>
                    </Box>
                  </Box>
                </CustomTableCell>
                <CustomTableCell align='right'>
                  {<NumberFormat value={row.amount} displayType={'text'} decimalScale={5} thousandSeparator />}
                </CustomTableCell>
                <CustomTableCell align='right'>
                  {<NumberFormat value={row.value} displayType={'text'} prefix={'$'} decimalScale={2} thousandSeparator />}
                </CustomTableCell>
                <CustomTableCell align='right' style={{ color: row.returns < 0 ? '#e15241' : '#8dc647' }}>
                  {<NumberFormat value={row.returns} displayType={'text'} prefix={'$'} decimalScale={0} thousandSeparator />}
                </CustomTableCell>
                <CustomTableCell align='center'>
                  <Button variant='contained' disabled={!season.active} className={classes.sellButton} onClick={() => setSell(row)}>Sell</Button>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {sell && <SellDialog
          open={sell}
          close={() => setSell(false)}
          token={sell}
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
  lockedButton: {
    padding: '3px 0',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    "&:hover": {
      backgroundColor: 'rgba(255, 255, 255, 0.12)'
    }
  }
})