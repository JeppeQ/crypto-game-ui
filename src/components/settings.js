import React, { useState } from 'react'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import TwitterIcon from '@material-ui/icons/Twitter'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import DisconnectIcon from '@material-ui/icons/ExitToApp';

import { Typography } from '@material-ui/core'
import { AddWalletDialog } from './dialogs/addWalletDialog'
import { AddTwitterDialog } from './dialogs/addTwitterDialog'

export function Settings(props) {
  const [addTwitter, openAddTwitter] = useState(false);
  const [addWallet, openAddWallet] = useState(false);

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
        <MenuItem onClick={() => { openAddWallet(true); props.close() }}>
          <ListItemIcon>
            <WalletIcon />
          </ListItemIcon>
          <Typography variant='h5'>Add wallet</Typography>
        </MenuItem>
        <MenuItem onClick={() => { openAddTwitter(true); props.close() }}>
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <Typography variant='h5'>Add twitter</Typography>
        </MenuItem>
        <MenuItem onClick={disconnect}>
          <ListItemIcon>
            <DisconnectIcon />
          </ListItemIcon>
          <Typography variant='h5'>disconnect</Typography>
        </MenuItem>
      </Menu>
      { addWallet && <AddWalletDialog open={addWallet} close={() => openAddWallet(false)} />}
      { addTwitter && <AddTwitterDialog open={addTwitter} close={() => openAddTwitter(false)} />}
    </React.Fragment>
  )
}