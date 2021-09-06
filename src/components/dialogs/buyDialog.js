import React, { useState, useContext } from 'react'
import NumberFormat from 'react-number-format'
import currency from 'currency.js'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'

import { styles, CustomButton } from './styles'
import * as tradeApi from '../../api/trade'
import { SeasonContext } from '../../contexts/season'

export function BuyDialog(props) {
  const _classes = styles()
  const [amount, setAmount] = useState()
  const [error, setError] = useState()
  const season = useContext(SeasonContext)

  const handleChange = (event) => {
    setError(false)
    setAmount(event.target.value)
  }

  const buyToken = async () => {
    if (!amount || amount < 10) {
      setError(true)
      return
    }

    const status = await tradeApi.buyToken(props.token.id, amount)

    if (status === 200) {
      season.updatePlayer()
    } else if (!status) {
      return
    }

    props.close()
  }

  const { name, price, symbol } = props.token
  return (
    <Dialog open={props.open} onClose={props.close}>
      <Box className={_classes.dialog}>

        <DialogTitle>
          <Box display='flex' alignItems='baseline'>
            <Typography className={_classes.title}>Buy {name}</Typography>
            <Typography style={{ marginLeft: '5px' }} variant='h6' color='textSecondary'>{symbol.toUpperCase()}</Typography>
          </Box>
          <Typography variant='h6'>~{<NumberFormat value={price} displayType={'text'} thousandSeparator prefix={'$'} />} USD</Typography>
        </DialogTitle>

        <DialogContent>
          <Box fullWidth display='flex' alignItems='center' justifyContent='space-between' px={'2px'} mt={'5px'}>
            <Typography variant='h6'>spend</Typography>
            <Box display='flex' alignItems='center'>
              <WalletIcon style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 16, marginRight: '3px' }} />
              <Typography variant='h6' style={{ paddingTop: '2px' }}>{<NumberFormat value={season.playerInfo.cash} displayType={'text'} thousandSeparator prefix={'$'} />}</Typography>
            </Box>
          </Box>

          <TextField
            className={_classes.input}
            placeholder={0}
            value={amount}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (<InputAdornment position="start">$</InputAdornment>),
              endAdornment: (<Box className={_classes.maxButton} onClick={() => setAmount(season.playerInfo.cash)}>max</Box>)
            }}
            helperText={error ? <Typography variant='subtitle2'>Minimum spend $10</Typography> : ''}
            error={error}
          />

          <Box fullWidth px={'5px'}>
            <Slider
              defaultValue={0}
              step={10}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(x) => `${x}%`}
              onChangeCommitted={(e, v) => { setAmount(currency(season.playerInfo.cash / 100 * v).value) }}
            />
          </Box>

          <DialogActions style={{ paddingRight: '0' }}>
            <CustomButton style={{ padding: '8px 15px' }} onClick={props.close} variant='outlined'>Cancel</CustomButton>
            <CustomButton variant='contained' color='primary' onClick={buyToken}>Buy</CustomButton>
          </DialogActions>

        </DialogContent>
      </Box>
    </Dialog>
  )
}