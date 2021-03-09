import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import { Typography } from '@material-ui/core'
import Slider from '@material-ui/core/Slider'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'

import { styles, CustomButton } from './styles'

export function BuyDialog(props) {
  const _classes = styles()
  const [amount, setAmount] = useState()

  const handleChange = (event) => {
    setAmount(event.target.value)
  }

  return (
    <Dialog open={props.open} onClose={props.close}>
      <Box className={_classes.dialog}>
        <DialogTitle>
          <Typography className={_classes.title}>Buy {props.token}</Typography>
          <Typography variant='h6'>~2.32 USD</Typography>
        </DialogTitle>
        <DialogContent>
          <Box fullWidth display='flex' alignItems='center' justifyContent='space-between' px={'2px'} mt={'5px'}>
            <Typography variant='h6'>spend</Typography>
            <Box display='flex' alignItems='center'>
              <WalletIcon style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 16, marginRight: '3px' }} />
              <Typography variant='h6' style={{ paddingTop: '2px' }}>{props.cash}$</Typography>
            </Box>
          </Box>
          <FormControl fullWidth className={_classes.input} variant="outlined">
            <OutlinedInput
              placeholder={0}
              value={amount}
              onChange={handleChange}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              endAdornment={<Box className={_classes.maxButton} onClick={() => setAmount(props.cash)}>max</Box>}
            />
          </FormControl>
          <Box fullWidth px={'5px'}>
            <Slider
              defaultValue={0}
              step={10}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(x) => `${x}%`}
              onChangeCommitted={(e, v) => { setAmount(props.cash / 100 * v) }}
            />
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={props.close} variant='outlined'>Cancel</CustomButton>
            <CustomButton variant='contained' color='primary'>Buy</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}