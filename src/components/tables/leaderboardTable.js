import React, { useState, useEffect, useContext } from 'react'
import NumberFormat from 'react-number-format'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import ArrowForward from '@material-ui/icons/ArrowForwardIos'

import { styles } from './styles'
import { SearchBar } from '../searchBar'
import { HistoryDialog } from '../dialogs/historyDialog'
import * as leaderboardApi from '../../api/leaderboard'
import { SeasonContext } from '../../contexts/season'
import { ellipseAddress } from '../../helpers/utilities'

const PAGE_SIZE = 50

const CustomTableCell = withStyles(() => ({
  head: {
    fontSize: 14
  }
}))(TableCell)

const cells = [
  { id: 'rank', label: '#', sortable: true },
  { id: 'id', label: 'Player', sortable: true },
  { id: 'mainAsset', label: 'Main Asset', sortable: true },
  { id: 'rankChange', label: <Typography>&#x2191;&#x2193;</Typography>, align: 'right', sortable: true },
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

  const season = useContext(SeasonContext)

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true)
      const time = +new Date()

      const data = await leaderboardApi.getLeaderboard(orderBy, direction, page, search)
      setleaderboard(data.rows)
      setTotal(data.count)
      season.setPlayers(data.count)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function searchPlayer(address) {
    if (address !== search) {
      setPage(0)
      setSearch(address)
    }
  }

  return (
    <React.Fragment>
      <Box mb={1} className={_classes.searchHeader}>
        <Typography variant='h3'>Leaderboard</Typography>
        <SearchBar search={value => searchPlayer(value)} value={search} placeholder={'Search address...'} />
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
            {!first && leaderboard.map(row => (
              <TableRow key={row.playerId}>
                <TableCell>{row.rank}</TableCell>
                <TableCell>
                  <Button style={{ padding: '0px 5px' }}>
                    {ellipseAddress(row.playerId, 8, 4)}
                  </Button>
                </TableCell>
                <TableCell>{row.mainAsset}</TableCell>
                <TableCell align='right' style={{ color: row.rankChange < 0 ? '#e15241' : '#8dc647' }}>
                  {row.rankChange > 0 ? `+${row.rankChange}` : row.rankChange}
                </TableCell>
                <TableCell align='right'>
                  <NumberFormat value={row.netWorth} displayType={'text'} thousandSeparator prefix={'$'} />
                </TableCell>
                <TableCell align='center'>
                  <Box className={classes.viewLink} onClick={() => setViewHistory(row.playerId)}>VIEW</Box>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell align='right'>
                <Typography variant='body1' color='textSecondary'>{`${page * PAGE_SIZE + Math.min(leaderboard.length, 1)}-${page * PAGE_SIZE + leaderboard.length} of ${total}`}</Typography>
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
      {viewHistory && <HistoryDialog
        open={viewHistory !== null}
        close={() => setViewHistory(null)}
        address={viewHistory}
      />}
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  viewLink: {
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: 'astrospace',
    color: '#058665',
    "&:hover": {
      color: 'rgba(14, 70, 26, 0.9)'
    }
  },
})