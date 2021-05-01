import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { styles, CustomButton } from './styles'

export function MobileSignupDialog(props) {
  const _classes = styles()

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={_classes.dialog}>
        <DialogTitle>
          <Typography className={_classes.title}>Desktop required</Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={1}>
            <Typography variant='body1'>
              Mobile signup is not supported as of now. Please use a pc or wait until the next competition.
            </Typography>
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={props.close} variant='outlined'>continue</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}