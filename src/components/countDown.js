import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DateTime } from "luxon"

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export function CountDown(props) {
  const classes = useStyles()
  const [now, setNow] = useState(DateTime.utc())

  useEffect(() => {
    const timer = setTimeout(() => setNow(DateTime.utc()), 60000)
    return () => clearTimeout(timer)
  }, [now, props.date])

  const { days, hours, minutes } = props.date.diff(now, props.hideDays ? ['hours', 'minutes'] : ['days', 'hours', 'minutes'])

  return (
    <Box display='flex' justifyContent='center'>
      {!props.hideDays && <React.Fragment>
        <Box className={classes.countDownUnit}>
          <Typography variant='h3' className={classes.countDownText}>{Math.max(days, 0)}</Typography>
          <Typography className={classes.countDownSubText}>Days</Typography>
        </Box>
        <Box mt={0.5} mx={1}>
          <Typography variant='h6'>:</Typography>
        </Box>
      </React.Fragment>}
      <Box className={classes.countDownUnit}>
        <Typography variant='h3' className={classes.countDownText}>{Math.max(hours, 0)}</Typography>
        <Typography className={classes.countDownSubText}>hours</Typography>
      </Box>
      <Box mt={0.5} mx={1}>
        <Typography variant='h6'>:</Typography>
      </Box>
      <Box className={classes.countDownUnit}>
        <Typography variant='h3' className={classes.countDownText}>{Math.max(Math.floor(minutes), 0)}</Typography>
        <Typography className={classes.countDownSubText}>mins</Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles({
  countDownUnit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5px',
    marginBottom: '-10px'
  },
  countDownText: {
    letterSpacing: '3px',
    lineHeight: '30px'
  },
  countDownSubText: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.35)'
  }
});