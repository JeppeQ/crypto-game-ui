import React, { useState, useContext } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { styles, CustomButton } from './styles'
import * as socialApi from '../../api/social'
import { SeasonContext } from '../../contexts/season'

export function SignedUpDialog(props) {
  const _classes = styles()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const season = useContext(SeasonContext)

  const registerEmail = () => {
    if (!email) {
      setError(true)
      return
    }

    socialApi.addEmail(email)
    props.close()
  }

  const handleChange = (event) => {
    setError(false)
    setEmail(event.target.value)
  }

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={_classes.dialog} style={{ width: '400px' }}>
        <DialogTitle>
          <Typography className={_classes.title}>You have signed up</Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={1}>
            <Typography variant='body1'>
              Thank you for joining the competition.
              Please note that the leaderboard gets updated every 10 minutes.
            </Typography>
          </Box>
          <Box mb={2}>
            {season && season.active
              ? <Typography variant='body1'>
                Would you like to receive updates about the competition?
            </Typography>
              : <Typography variant='body1'>
                Would you like to receive an email notification when the competition starts?
            </Typography>
            }
          </Box>
          <Box mb={2}>
            <TextField label="Email" variant="outlined" fullWidth value={email} onChange={handleChange} error={error} />
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={props.close} variant='outlined'>No thanks</CustomButton>
            <CustomButton style={{ padding: '8px 15px' }} onClick={registerEmail} color='primary' variant='contained'>Yes please</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}