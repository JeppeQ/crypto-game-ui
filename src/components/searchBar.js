import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

export function SearchBar(props) {
  const classes = useStyles()
  const [search, setSearch] = useState(''); 

  return (
    <Box className={clsx(classes.searchBar, classes.customBox)}>
      <IconButton type='submit' aria-label='search'>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder='Search'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </Box>
  )
}

const useStyles = makeStyles({
  searchBar: {
    height: '42px',
    width: '280px',
    background: '#1E2530',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '10px'
  },
  customBox: {
    backgroundColor: '#1E2530',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRight: '3px solid rgba(255, 255, 255, 0.1)',
    borderTop: '2px solid rgba(255, 255, 255, 0.2)',
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
  },
});