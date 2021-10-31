import React, { useState, useContext } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { styles, CustomButton } from './styles'
import * as userApi from '../../api/user'
import { UserContext } from '../../contexts/user'

export function AddNameDialog(props) {
  const user = useContext(UserContext)

  const _classes = styles()
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [processing, setProcessing] = useState(false)

  const addName = async () => {
    if (!name) {
      return
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters")
      return
    }

    setProcessing(true)

    await userApi.addName(name)

    user.getUserInfo()

    setProcessing(false)
  }

  const handleChange = (event) => {
    setError(false)
    setName(event.target.value)
  }

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={_classes.dialog} style={{ width: '400px' }}>

        <DialogTitle>
          <Typography className={_classes.title}>Choose a name</Typography>
        </DialogTitle>

        <DialogContent>

          <Box mb={2}>
            <Typography variant='body1'>
              Your name will be visible on the leaderboard
            </Typography>
          </Box>

          <Box mb={2}>
            <TextField
              label={error || "Name"}
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleChange}
              error={Boolean(error)}
              inputProps={{ maxLength: 30 }}
            />
          </Box>

          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton disabled={processing} style={{ padding: '8px 15px' }} onClick={addName} color='primary' variant='contained'>
              Continue
            </CustomButton>
          </DialogActions>

        </DialogContent>
      </Box>
    </Dialog>
  )
}