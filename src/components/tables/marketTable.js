import React, { useEffect, useState, useContext } from 'react'
import NumberFormat from 'react-number-format'
import { withStyles, makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Skeleton from '@material-ui/lab/Skeleton'
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import ArrowForward from '@material-ui/icons/ArrowForwardIos'

import { styles } from './styles'
import { SearchBar } from '../searchBar'
import { BuyDialog } from '../dialogs/buyDialog'
import * as tokenApi from '../../api/token'
import { TournamentContext } from '../../contexts/tournament'

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

  const tournament = useContext(TournamentContext)

  async function updateMarket() {
    const data = await tokenApi.getMarket(orderBy, direction, page, search)
    setMarket(data.rows)
    setTotal(data.count)
  }

  useEffect(() => {
    async function fetchMarket() {
      setLoading(true)
      const time = +new Date()

      await updateMarket()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, orderBy, direction, search])

  useEffect(() => {
    const periodicFetch = setInterval(() => {
      updateMarket()
    }, 30000)

    return () => clearInterval(periodicFetch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <Box mb={1} className={_classes.searchHeader}>
        <Typography variant='h3'>Market</Typography>
        <SearchBar search={value => searchCoin(value)} value={search} placeholder={'Search coin...'} />
      </Box>
      <Box className={_classes.tableContainer}>
        <Table className={_classes.table}>
          <TableHead>
            <TableRow>
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
            {first && loadingRow()}
            {!first && market.map(row => (
              <TableRow key={row.id} >
                <TableCell>{renderData(row.rank)}</TableCell>
                <TableCell>
                  {loading ? <Skeleton variant="text" animation="wave" /> :
                    <Box display='flex'>
                      <Link href={`https://www.coingecko.com/en/coins/${row.id}`} target='_blank' color='textPrimary'>
                        {renderData(row.name)}
                      </Link>
                      <Box ml={1}>
                        <Typography variant='body1' color='textSecondary'>{row.symbol.toUpperCase()}</Typography>
                      </Box>
                    </Box>}
                </TableCell>
                <TableCell align='right'>{renderData(<NumberFormat value={row.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />)}</TableCell>
                <TableCell align='right' style={{ color: row.priceChangeDay < 0 ? '#e15241' : '#8dc647' }}>
                  {renderData(<NumberFormat value={row.priceChangeDay} displayType={'text'} suffix={'%'} />)}
                </TableCell>
                <TableCell align='right'>
                  {renderData(<NumberFormat value={row.marketCap} displayType={'text'} thousandSeparator={true} prefix={'$'} />)}
                </TableCell>
                <TableCell align='center'>
                  <Button variant='contained' disabled={!tournament.active} className={classes.buyButton} onClick={() => setBuy(row)}>Buy</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant='body1' color='textSecondary'>Powered by CoinGecko</Typography>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell align='right'>
                <Typography variant='body1' color='textSecondary'>{`${page * PAGE_SIZE + Math.min(market.length, 1)}-${page * PAGE_SIZE + market.length} of ${total}`}</Typography>
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
      </Box>
      {
        buy && <BuyDialog
          open={buy}
          close={() => setBuy(false)}
          token={buy}
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