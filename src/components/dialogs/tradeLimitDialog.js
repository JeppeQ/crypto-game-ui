import React from 'react'
import { DateTime } from "luxon"

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles, CustomButton } from './styles'
import { CountDown } from '../countDown'

export function TradeLimitDialog(props) {
  const _classes = styles()

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={_classes.dialog}>
        <DialogTitle>
          <Typography className={_classes.title}>Trade limit reached</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant='body1'>
              You have reached your daily trade limit of 10 trades. You'll be able to trade again in:
            </Typography>
          </Box>
          <Box my={2}>
            <CountDown date={DateTime.utc().endOf('day')} hideDays />
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={props.close} variant='outlined'>close</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}