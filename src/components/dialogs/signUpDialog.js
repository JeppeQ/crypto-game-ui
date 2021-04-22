import React, { useContext } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { styles } from './styles'
import { Web3Context } from '../../contexts/web3'
import Google from '../../assets/images/google-icon.svg'
import metamaskLogo from '../../assets/images/metamask-icon.png'

const ConnectButton = withStyles(() => ({
  root: {
    width: '250px',
    justifyContent: 'flex-start',
    padding: '8px 15px'
  },
  startIcon: {
    marginRight: '15px'
  }
}))(Button)

export function SignUpDialog(props) {
  const _classes = styles()
  const web3 = useContext(Web3Context)

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={_classes.dialog} style={{ width: '303px' }}>
        <DialogTitle>
          <Typography className={_classes.title}>Choose method</Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <ConnectButton onClick={() => web3.connect()} variant='outlined' startIcon={<img src={metamaskLogo} width="21" height="21" alt='metaMaskIcon' />}>
              connect wallet
            </ConnectButton>
          </Box>
          <Box mb={1}>
            <ConnectButton onClick={() => web3.connect()} variant='outlined' startIcon={<img src={Google} width="21" height="21" alt='googleIcon' />}>
              connect with google
            </ConnectButton>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  )
}