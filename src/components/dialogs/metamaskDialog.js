import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { styles, CustomButton } from './styles'

export function MetaMaskDialog(props) {
  const _classes = styles()

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={_classes.dialog} style={{ width: '500px' }}>
        <DialogTitle>
          <Typography className={_classes.title}>MetaMask required</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography>
              To join the contest, you need to have MetaMask installed. MetaMask is a browser extension
            that helps you connect your wallet to blockchain apps. <br />
            It only takes 2 minutes to install and create a cryptocurrency wallet.
          </Typography>
          </Box>
          <Box my={1}>
            <Link target="_blank" href='https://metamask.io/download.html'>
              Click here to download MetaMask.
            </Link>
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={props.close} variant='outlined'>continue</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}