import React, { useContext } from 'react'
import GoogleLogin from 'react-google-login'
import { isMobile } from "react-device-detect"

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { styles } from './styles'
import { ConnectorContext } from '../../contexts/connector'
import { PlayerContext } from '../../contexts/player'
import Google from '../../assets/images/google-icon.svg'
import metamaskLogo from '../../assets/images/metamask-icon.png'
import * as authApi from '../../api/auth'

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

export function ConnectDialog(props) {
  const _classes = styles()
  const connector = useContext(ConnectorContext)
  const player = useContext(PlayerContext)

  const googleConnect = async (response) => {
    const jwt = await authApi.googleAuth(response)

    if (jwt) {
      if (props.signup) {
        player.signup(jwt)
      } else {
        player.getPlayerInfo(jwt)
      }
    }

    props.close()
  }

  const walletConnect = () => {
    connector.connectWallet(props.signup)
    props.close()
  }

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={_classes.dialog} style={{ width: '303px' }}>
        <DialogTitle>
          <Typography className={_classes.title}>Choose method</Typography>
        </DialogTitle>
        <DialogContent>

          {props.signup && isMobile &&
            <Box mb={2}>
              <Typography variant='h6'>Sign up disabled on mobile</Typography>
            </Box>
          }

          {!isMobile &&
            <Box mb={2}>
              <ConnectButton onClick={walletConnect} variant='outlined' startIcon={<img src={metamaskLogo} width="21" height="21" alt='metaMaskIcon' />}>
                connect wallet
              </ConnectButton>
            </Box>
          }

          {!props.signup &&
            <Box mb={1}>
              <GoogleLogin
                clientId="617834778827-4mkgnrm65p2r63ti2dfp6o6a7i0rm8im.apps.googleusercontent.com"
                render={renderProps => (
                  <ConnectButton onClick={renderProps.onClick} disabled={renderProps.disabled} variant='outlined' startIcon={<img src={Google} width="21" height="21" alt='googleIcon' />}>
                    connect with google
                  </ConnectButton>
                )}
                onSuccess={googleConnect}
                onFailure={() => { }}
                cookiePolicy={'single_host_origin'}
              />
            </Box>
          }

        </DialogContent>
      </Box>
    </Dialog>
  )
}