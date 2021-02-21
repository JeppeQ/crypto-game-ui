import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import Slider from '@material-ui/core/Slider'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'

const CustomButton = withStyles(() => ({
  root: {
    padding: '8px 24px'
  }
}))(Button)

function valuetext(value) {
  return `${value}°C`;
}

export function BuyDialog(props) {
  const classes = useStyles()
  const [amount, setAmount] = useState()

  const handleChange = (event) => {
    setAmount(event.target.value)
  }

  return (
    <Dialog open={props.open} onClose={props.close}>
      <Box className={classes.BuyDialog}>
        <DialogTitle>
          <Typography className={classes.title}>Buy {props.token}</Typography>
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
          <FormControl fullWidth className={classes.input} variant="outlined">
            <OutlinedInput
              placeholder={0}
              value={amount}
              onChange={handleChange}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              endAdornment={<Box className={classes.maxButton} onClick={() => setAmount(props.cash)}>max</Box>}
            />
          </FormControl>
          <Box fullWidth px={'5px'}>
            <Slider
              defaultValue={0}
              step={10}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(x) => `${x}%`}
              onChangeCommitted={(e, v) => { setAmount(props.cash/100 * v) }}
            />
          </Box>
          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{padding: '8px 15px'}} onClick={props.close} variant='outlined'>Cancel</CustomButton>
            <CustomButton variant='contained' color='primary'>Buy</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export function SellDialog(props) {
  const classes = useStyles()
  const [amount, setAmount] = useState()

  const handleChange = (event) => {
    setAmount(event.target.value)
  }

  return (
    <Dialog open={props.open} onClose={props.close}>
      <Box className={classes.BuyDialog}>
        <DialogTitle>
          <Typography className={classes.title}>Sell {props.token}</Typography>
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
          <FormControl fullWidth className={classes.input} variant="outlined">
            <OutlinedInput
              placeholder={0}
              value={amount}
              onChange={handleChange}
              endAdornment={<Box className={classes.maxButton}>max</Box>}
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
            <CustomButton className={classes.sellButton} variant='contained' color='secondary'>Sell</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  )
}

const useStyles = makeStyles({
  BuyDialog: {
    width: '395px',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRight: '3px solid rgba(255, 255, 255, 0.1)',
    borderTop: '2px solid rgba(255, 255, 255, 0.3)',
    borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0px 2px 10px rgba(0, 255, 243, 0.2)',
    paddingTop: '5px',
    paddingBottom: '10px'
  },
  input: {
    marginBottom: '10px'
  },
  title: {
    color: '#fafafa',
    fontFamily: 'astrospace',
    fontSize: '20px'
  },
  maxButton: {
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'astrospace',
    color: 'rgba(255, 255, 255, 0.5)'
  }
})