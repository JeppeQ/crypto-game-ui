import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import { Typography } from '@material-ui/core'
import { styles, CustomButton } from './styles'

import Slider from '@material-ui/core/Slider'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'

export function SellDialog(props) {
  const _classes = styles()
  const [amount, setAmount] = useState()

  const handleChange = (event) => {
    setAmount(event.target.value)
  }

  return (
    <Dialog open={props.open} onClose={props.close}>
      <Box className={_classes.dialog}>
        <DialogTitle>
          <Typography className={_classes.title}>Sell {props.token}</Typography>
          <Typography variant='h6'>~2.32 USD</Typography>
        </DialogTitle>
        <DialogContent>
          <Box fullWidth display='flex' alignItems='center' justifyContent='space-between' px={'2px'} mt={'5px'}>
            <Typography variant='h6'>amount</Typography>
            <Box display='flex' alignItems='center'>
              <WalletIcon style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 16, marginRight: '3px' }} />
              <Typography variant='h6' style={{ paddingTop: '2px' }}>150 ALPHA</Typography>
            </Box>
          </Box>
          <FormControl fullWidth className={_classes.input} variant="outlined">
            <OutlinedInput
              placeholder={0}
              value={amount}
              onChange={handleChange}
              endAdornment={<Box className={_classes.maxButton}>max</Box>}
            />
          </FormControl>
          <Box fullWidth px={'5px'}>
            <Slider
              defaultValue={0}
              step={25}
              marks
              scale={(x) => 1.2}
            />
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{padding: '8px 15px'}} onClick={props.close} variant='outlined'>Cancel</CustomButton>
            <CustomButton variant='contained' color='secondary'>Sell</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}