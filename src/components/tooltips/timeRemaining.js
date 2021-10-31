import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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