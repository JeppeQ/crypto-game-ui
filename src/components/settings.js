import React from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import DisconnectIcon from '@mui/icons-material/ExitToApp';

import { Typography } from '@mui/material'

export function Settings(props) {
  const disconnect = () => {
    localStorage.removeItem('jwtToken')
    window.location.reload()
  }

  return (
    <React.Fragment>
      <Menu
        anchorEl={props.anchor}
        keepMounted
        open={props.open}
        onClose={props.close}
        PaperProps={{ style: { marginTop: props.marginTop || '30px' } }}
      >
        <MenuItem onClick={disconnect}>
          <ListItemIcon>
            <DisconnectIcon />
          </ListItemIcon>
          <Typography variant='subtitle1'>disconnect</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}