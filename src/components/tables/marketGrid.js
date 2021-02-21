import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_ENDPOINT } from '../../config'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './styles'
import { DataGrid } from '@material-ui/data-grid'

const cells = [
  { field: 'rank', headerName: '#', width: 50 },
  { field: 'name', headerName: 'Coin', align: 'left', width: 250 },
  { field: 'price', headerName: 'Price', type: 'number', width: 150 },
  { field: 'priceChangeDay', headerName: '24h', type: 'number', width: 150 },
  { field: 'marketCap', headerName: 'Market Cap', type: 'number', width: 250 },
  { field: 'buy', headerName: 'Buy' }
]

async function fetchData() {
  const url = `${API_ENDPOINT}/token/list`
  const response = await axios.get(url).catch(err => console.log(err))
  return response.data
}

export function MarketGrid() {
  const classes = styles()
  const [buy, setBuy] = useState()
  const [market, setMarket] = useState([])

  useEffect(async () => {
    const data = await fetchData()
    setMarket(data)  
  }, [])

  return (
    <DataGrid
      className={classes.table}
      rows={market}
      columns={cells}
      autoHeight
      autoPageSize
      disableColumnMenu
      loading={market.length < 1}
      disableColumnSelector
    />
  );
}