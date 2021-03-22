import React, { useState, useEffect } from 'react'
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
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import ArrowForward from '@material-ui/icons/ArrowForwardIos'

import { styles } from './styles'
import { SearchBar } from '../searchBar'
import { HistoryDialog } from '../dialogs/historyDialog'
import * as leaderboardApi from '../../api/leaderboard'

const PAGE_SIZE = 50

const CustomTableCell = withStyles(() => ({
  head: {
    fontSize: 14
  }
}))(TableCell)

const cells = [
  { id: 'rank', label: '#', sortable: true },
  { id: 'address', label: 'Player', sortable: true },
  { id: 'mainAsset', label: 'Main Asset', sortable: true },
  { id: 'rankChange', label: '24h', align: 'right', sortable: true },
  { id: 'networth', label: 'Networth', align: 'right', sortable: true },
  { id: 'portfolio', label: 'Portfolio', align: 'center' },
]

export function LeaderboardTable() {
  const _classes = styles()
  const classes = useStyles()

  const [viewHistory, setViewHistory] = useState(null)
  const [leaderboard, setleaderboard] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [orderBy, setOrderBy] = useState()
  const [direction, setDirection] = useState()
  const [search, setSearch] = useState()
  const [loading, setLoading] = useState(false)
  const [first, setFirst] = useState(true)

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true)
      const time = +new Date()

      const data = await leaderboardApi.getLeaderboard(orderBy, direction, page, search)
      setleaderboard(data.rows)
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
    fetchLeaderboard()
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

  function searchPlayer(address) {
    if (address !== search) {
      setPage(0)
      setSearch(address)
    }
  }

  return (
    <React.Fragment>
      <Box mb={1} width='1050px' display='flex' justifyContent='space-between'>
        <Typography variant='h3'>Leaderboard</Typography>
        <SearchBar search={value => searchPlayer(value)} value={search} />
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
          {leaderboard.map(row => (
            <TableRow key={row._id}>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.mainAsset}</TableCell>
              <TableCell align='right'>
                {row.rankChange}
              </TableCell>
              <TableCell align='right'>
                <NumberFormat value={row.netWorth} displayType={'text'} thousandSeparator prefix={'$'} />
              </TableCell>
              <TableCell align='center'>
                <Box className={classes.viewLink} onClick={() => setViewHistory(row.address)}>VIEW</Box>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell align='right'>
              <Typography variant='body' color='textSecondary'>{`${page * PAGE_SIZE + Math.min(leaderboard.length, 1)}-${page * PAGE_SIZE + leaderboard.length} of ${total}`}</Typography>
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
      {viewHistory && <HistoryDialog
        open={viewHistory !== null}
        close={() => setViewHistory(null)}
        wallet={viewHistory}
      />}
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  viewLink: {
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: 'astrospace',
    color: 'rgba(255, 255, 255)',
    "&:hover": {
      color: 'rgba(29, 255, 243, 0.4)'
    }
  },
})