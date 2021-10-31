import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { styles, CustomButton } from './styles'

export function MetaMaskDialog(props) {
  const _classes = styles()

  return (
    <Dialog open={props.open} onClose={() => window.location.reload()} maxWidth='sm'>
      <Box className={_classes.dialog} style={{ width: '500px' }}>
        <DialogTitle>
          <Typography className={_classes.title}>MetaMask required</Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={1}>
            <Typography variant='body1'>
              To join the contest, you must have MetaMask installed together with a wallet. MetaMask is a browser extension
              that helps you connect your cryptocurrency wallet to blockchain apps. <br />It only takes a few minutes to set up.
            </Typography>
          </Box>
          <Box my={1}>
            <Link target="_blank" href='https://metamask.io/download.html'>
              Click here to download MetaMask and create a wallet.
            </Link>
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={() => window.location.reload()} variant='outlined'>continue</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}