import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'
import { styles, CustomButton } from './styles'

export function MetaMaskDialog(props) {
  const _classes = styles()

  return (
    <Dialog open={props.open} onClose={props.close}>
      <Box className={_classes.dialog}>
        <DialogTitle>
          <Typography className={_classes.title}>MetaMask required</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{padding: '8px 15px'}} onClick={props.close} variant='outlined'>Cancel</CustomButton>
            <CustomButton variant='contained' color='secondary'>Install</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}