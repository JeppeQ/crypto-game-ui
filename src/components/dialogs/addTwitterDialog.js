import React, { useState, useContext } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import { styles, CustomButton } from './styles'
import { PlayerContext } from '../../contexts/player'
import * as socialApi from '../../api/social'

export function AddTwitterDialog(props) {
  const player = useContext(PlayerContext)

  const _classes = styles()
  const [twitter, setTwitter] = useState(player.info.twitter)
  const [error, setError] = useState(false)

  const addTwitter = async () => {
    if (twitter) {
      const valid = /^@(\w){1,15}$/
      if (!valid.test(twitter)) {
        setError(true)
        return
      }
    }

    await socialApi.addTwitter(twitter)
    player.getPlayerInfo()
    props.close()
  }

  const handleChange = (event) => {
    setError(false)
    setTwitter(event.target.value)
  }

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={_classes.dialog} style={{ width: '400px' }}>
        <DialogTitle>
          <Typography className={_classes.title}>Add twitter</Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant='body1'>
              Your twitter handle will show up on the leaderboard.
            </Typography>
          </Box>
          <Box mb={2}>
            <TextField label="Twitter" placeholder='@username' variant="outlined" fullWidth value={twitter} onChange={handleChange} error={error} />
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={props.close} variant='outlined'>Cancel</CustomButton>
            <CustomButton style={{ padding: '8px 15px' }} onClick={addTwitter} color='primary' variant='contained'>Add</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}