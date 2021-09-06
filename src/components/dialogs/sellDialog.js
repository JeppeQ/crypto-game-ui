import React, { useState, useContext } from 'react'
import NumberFormat from 'react-number-format'
import currency from 'currency.js'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Typography } from '@material-ui/core'
import Slider from '@material-ui/core/Slider'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'

import { styles, CustomButton } from './styles'
import * as tradeApi from '../../api/trade'
import { SeasonContext } from '../../contexts/season'

export function SellDialog(props) {
  const _classes = styles()
  const season = useContext(SeasonContext)

  const [amount, setAmount] = useState(0)
  const [error, setError] = useState()

  const handleChange = (event) => {
    setError(false)
    setAmount(event.target.value)
  }

  const handleBlur = () => {
    if (amount > props.token.amount) {
      setAmount(props.token.amount)
    }
  }

  const sellToken = async () => {
    if (!amount || amount <= 0) {
      setError(true)
      return
    }

    const status = await tradeApi.sellToken(props.token.id, amount)

    if (status === 200) {
      season.updatePlayer()
    }

    props.close()
  }

  const { name, price, symbol } = props.token
  return (
    <Dialog open={props.open} onClose={props.close}>
      <Box className={_classes.dialog}>

        <DialogTitle>
          <Typography className={_classes.title}>Sell {name}</Typography>
          <Typography variant='h6'>~{<NumberFormat value={price} displayType={'text'} thousandSeparator prefix={'$'} />}</Typography>
        </DialogTitle>

        <DialogContent>
          <Box fullWidth display='flex' alignItems='center' justifyContent='space-between' px={'2px'} mt={'5px'}>
            <Typography variant='h6'>amount</Typography>
            <Box display='flex' alignItems='center'>
              <WalletIcon style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 16, marginRight: '3px' }} />
              <Typography variant='h6' style={{ paddingTop: '2px' }}>{props.token.amount} {symbol}</Typography>
            </Box>
          </Box>

          <TextField
            className={_classes.input}
            placeholder={0}
            value={amount}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            endAdornment={<Box className={_classes.maxButton}>max</Box>}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Typography variant='h6' style={{ fontSize: '13px' }}>{symbol}</Typography></InputAdornment>),
              endAdornment: (<Box className={_classes.maxButton} onClick={() => setAmount(props.token.amount)}>max</Box>),
              style: { alignItems: 'baseline' }
            }}
            error={error}
          />

          <Box fullWidth px={'5px'}>
            <Slider
              defaultValue={0}
              step={10}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(x) => `${x}%`}
              onChangeCommitted={(e, v) => { setAmount(currency(props.token.amount / 100 * v).value) }}
            />
          </Box>

          <Box display='flex' justifyContent='space-between' mt={1}>
            <Typography variant='h6'>~2% fee</Typography>
            <Typography variant='h6'><NumberFormat value={amount * price * 0.02} displayType={'text'} thousandSeparator prefix={'$'} decimalScale={2} /></Typography>
          </Box>

          <Box display='flex' justifyContent='space-between' mb={1}>
            <Typography variant='h6'>~total</Typography>
            <Typography variant='h6'><NumberFormat value={amount * price * 0.98} displayType={'text'} thousandSeparator prefix={'$'} decimalScale={2} /></Typography>
          </Box>

          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={props.close} variant='outlined'>Cancel</CustomButton>
            <CustomButton variant='contained' color='secondary' onClick={sellToken}>Sell</CustomButton>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog >
  )
}