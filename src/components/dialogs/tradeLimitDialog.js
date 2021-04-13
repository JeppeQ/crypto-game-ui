import React from 'react'
import { DateTime } from "luxon"

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { styles, CustomButton } from './styles'
import { CountDown } from '../countDown'

export function TradeLimitDialog(props) {
  const _classes = styles()
  console.log(DateTime.utc().endOf('day'))
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