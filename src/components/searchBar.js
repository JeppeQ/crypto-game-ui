import React, { useState } from 'react';

import Box from '@material-ui/core/Box'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'

export function SearchBar(props) {
  const classes = useStyles()
  const [search, setSearch] = useState(''); 

  return (
    <Box className={classes.searchBar}>
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
    width: '258px',
    background: '#1E2530',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '10px'
  },
});