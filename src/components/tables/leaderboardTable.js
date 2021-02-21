import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './styles'
import { SearchBar } from '../searchBar'

const CustomTableCell = withStyles(() => ({
  head: {
    fontSize: 14
  }
}))(TableCell)

const cells = [
  { id: 'rank', tooltip: false, disablePadding: true, label: '#' },
  { id: 'player', label: 'Player' },
  { id: 'mainAsset', label: 'Main Asset' },
  { id: 'positionChangeDay', label: '24h', align: 'right' },
  { id: 'price', label: 'Networth', align: 'right' },
  { id: 'portfolio', label: 'Portfolio', align: 'center' },
]

const testData = [
  { rank: '1', player: '0x0E43Axdm4ee', netWorth: '$34300', positionChangeDay: '+2', mainAsset: 'BTC' },
  { rank: '2', player: '0x0E43Axdm4ee', netWorth: '$1200', positionChangeDay: '+5', mainAsset: 'ETH' },
  { rank: '3', player: '0x0E43Axdm4ee', netWorth: '$32300', positionChangeDay: '-1', mainAsset: 'LTC' },
  { rank: '4', player: '0x0E43Axdm4ee', netWorth: '$0.45', positionChangeDay: '+5', mainAsset: 'NAS' },
  { rank: '5', player: '0x0E43Axdm4ee', netWorth: '$0.31', positionChangeDay: '-10', mainAsset: 'YFI' },
]

export function LeaderboardTable(props) {
  const classes = styles()

  return (
    <React.Fragment>
      <Box mb={1} width='1050px' display='flex' justifyContent='space-between'>
        <Typography variant='h3'>Leaderboard</Typography>
        <SearchBar />
      </Box>
      <Table component={Paper} className={classes.table}>
        <TableHead>
          <TableRow>
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
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.player}</TableCell>
              <TableCell>{row.mainAsset}</TableCell>
              <TableCell align='right'>{row.positionChangeDay}</TableCell>
              <TableCell align='right'>{row.netWorth}</TableCell>
              <TableCell align='center'><Box className={classes.viewLink}>VIEW</Box></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}