import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Skeleton from '@material-ui/lab/Skeleton'
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import ArrowForward from '@material-ui/icons/ArrowForwardIos'

import { styles } from './styles'
import { SearchBar } from '../searchBar'
import { BuyDialog } from '../dialogs/buyDialog'
import * as tokenApi from '../../api/token'


const PAGE_SIZE = 50

const CustomTableCell = withStyles(() => ({
  head: {
    fontSize: 14
  }
}))(TableCell)

const cells = [
  { id: 'rank', align: 'left', label: '#', sortable: true },
  { id: 'name', label: 'Coin', align: 'left', sortable: true },
  { id: 'price', label: 'Price', align: 'right', sortable: true },
  { id: 'priceChangeDay', label: '24h', align: 'right', sortable: true },
  { id: 'marketCap', label: 'Market Cap', align: 'right', sortable: true },
  { id: 'buy', label: 'Buy', align: 'center' }
]

export function MarketTable(props) {
  const _classes = styles()
  const classes = useStyles()

  const [buy, setBuy] = useState()
  const [market, setMarket] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [orderBy, setOrderBy] = useState()
  const [direction, setDirection] = useState()
  const [search, setSearch] = useState()
  const [loading, setLoading] = useState(false)
  const [first, setFirst] = useState(true)

  useEffect(() => {
    async function fetchMarket() {
      setLoading(true)
      const time = +new Date()

      const data = await tokenApi.getMarket(orderBy, direction, page, search)
      setMarket(data.rows)
      setTotal(data.count)

      if (first) {
        setTimeout(() => {
          setLoading(false)
          setFirst(false)
        }, Math.max(0,
          500 - (+new Date() - time)))
      } else {
        setLoading(false)
      }
    }
    fetchMarket()
  }, [page, orderBy, direction, search])

  function headerClick(id, sortable) {
    if (!sortable || loading) {
      return
    }

    if (orderBy === id) {
      if (direction === 'DESC') {
        setOrderBy(null)
      } else {
        setDirection('DESC')
      }
    } else {
      setOrderBy(id)
      setDirection('ASC')
    }
  }

  function nextPage() {
    if (page + 1 < total / PAGE_SIZE) {
      setPage(page + 1)
    }
  }

  function previousPage() {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  function searchCoin(value) {
    if (value !== search) {
      setPage(0)
      setSearch(value)
    }
  }

  function loadingRow() {
    return (
      <TableRow>
        {cells.map(cell => (
          <TableCell key={'loading_' + cell.id}>
            <Skeleton variant="text" animation="wave" />
          </TableCell>
        ))}
      </TableRow>
    )
  }

  function renderData(data) {
    if (loading) {
      return <Skeleton variant="text" animation="wave" />
    }

    return data
  }

  return (
    <React.Fragment>
      <Box mb={1} width='1050px' display='flex' justifyContent='space-between'>
        <Typography variant='h3'>Market</Typography>
        <SearchBar search={value => searchCoin(value)} value={search} />
      </Box>
      <Table component={Paper} className={_classes.table}>
        <TableHead>
          <TableRow>
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
          {first && loadingRow()}
          {!first && market.map(row => (
            <TableRow key={row._id} >
              <TableCell>{renderData(row.rank)}</TableCell>
              <TableCell>
                {loading ? <Skeleton variant="text" animation="wave" /> :
                  <Box display='flex'>
                    {renderData(row.name)}
                    <Box ml={1}>
                      <Typography variant='body' color='textSecondary'>{row.symbol.toUpperCase()}</Typography>
                    </Box>
                  </Box>}
              </TableCell>
              <TableCell align='right'>{renderData(<NumberFormat value={row.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />)}</TableCell>
              <TableCell align='right' style={{ color: row.priceChangeDay < 0 ? '#e15241' : '#8dc647' }}>
                {renderData(<NumberFormat value={row.priceChangeDay} displayType={'text'} suffix={'%'} decimalScale={1} />)}
              </TableCell>
              <TableCell align='right'>
                {renderData(<NumberFormat value={row.marketCap} displayType={'text'} thousandSeparator={true} prefix={'$'} />)}
              </TableCell>
              <TableCell align='center'>
                <Button variant='contained' className={classes.buyButton} onClick={() => setBuy(true)}>Buy</Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant='body' color='textSecondary'>Powered by CoinGecko</Typography>
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell align='right'>
              <Typography variant='body' color='textSecondary'>{`${page * PAGE_SIZE + Math.min(market.length, 1)}-${page * PAGE_SIZE + market.length} of ${total}`}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Box display='flex' justifyContent='space-evenly'>
                <ArrowBack className={_classes.pageArrow} onClick={() => previousPage()} />
                <ArrowForward className={_classes.pageArrow} onClick={() => nextPage()} />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {
        buy && <BuyDialog
          open={buy}
          close={() => setBuy(false)}
          token={'alpha'}
          cash={23000}
        />
      }
    </React.Fragment >
  )
}

const useStyles = makeStyles({
  buyButton: {
    padding: '1px 0',
    fontSize: '13px',
    fontWeight: 'bold',
    backgroundColor: 'green',
    "&:hover": {
      backgroundColor: '#00af00'
    }
  },
})