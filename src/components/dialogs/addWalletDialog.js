import React, { useState, useContext } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'

import { styles, CustomButton } from './styles'
import { PlayerContext } from '../../contexts/player'
import * as socialApi from '../../api/social'

export function AddWalletDialog(props) {
  const player = useContext(PlayerContext)

  const _classes = styles()
  const [wallet, setWallet] = useState(player.info.wallet)
  const [error, setError] = useState(false)

  const addWallet = async () => {
    if (wallet) {
      const valid = /^0x[a-fA-F0-9]{40}$/
      if (!valid.test(wallet)) {
        setError(true)
        return
      }
    }

    await socialApi.addWallet(wallet)
    player.getPlayerInfo()
    props.close()
  }

  const handleChange = (event) => {
    setError(false)
    setWallet(event.target.value)
  }

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={_classes.dialog} style={{ width: '460px' }}>
        <DialogTitle>
          <Typography className={_classes.title}>Add wallet</Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant='body1'>
              To recieve a prize, you must add an ethereum wallet. The prize will be sent to your wallet when the season ends.
              Make sure you enter a correct address or the prize will be lost.
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant='body1'>
              Need help?
            </Typography>
            <Link target="_blank" href='https://metamask.io/download.html'>
              Create a wallet with MetaMask.
            </Link>
          </Box>
          <Box mb={2}>
            <TextField label="Address" variant="outlined" fullWidth value={wallet} onChange={handleChange} error={error} />
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={props.close} variant='outlined'>Cancel</CustomButton>
            <CustomButton style={{ padding: '8px 15px' }} onClick={addWallet} color='primary' variant='contained'>Add</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}