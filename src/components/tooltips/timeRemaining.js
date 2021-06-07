import React from 'react'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { CountDown } from '../countDown'

export function TimeRemaining(props) {
  return (
    <Box m={1}>
      <Typography>Time remaining</Typography>
      <Box my={1} mb={2}>
        <CountDown date={props.date} hideDays />
      </Box>
    </Box>
  )

}