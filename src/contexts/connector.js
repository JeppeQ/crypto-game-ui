import React, { createContext, useContext, useState } from "react"
import ReactGA from 'react-ga'

import { PlayerContext } from './player'
import { MetaMaskDialog } from '../components/dialogs/metamaskDialog'
import { ConnectDialog } from '../components/dialogs/connectDialog'
import * as authApi from '../api/auth'
import { URL } from '../api'

const ethereum = window.ethereum

export const ConnectorContext = createContext()

export const ConnectorProvider = ({ children }) => {
  const player = useContext(PlayerContext)
  const [metaMaskDialog, setMetaMaskDialog] = useState(false)
  const [connectDialog, setConnectDialog] = useState({ show: false, signup: false })

  const connectWallet = async (signup = false) => {
    if (!ethereum) {
      setMetaMaskDialog(true)
    
      ReactGA.event({
        category: 'User',
        action: 'Missing metamask'
      })

      return
    }

    const requestAccounts = await ethereum.send('eth_requestAccounts')
    if (!requestAccounts || !requestAccounts.result || requestAccounts.result.length < 1) {
      return
    }
    const account = requestAccounts.result[0]
    const chainId = await ethereum.request({ method: 'eth_chainId' })

    signMessage({ address: account, chainId }, signup)
  }

  const signMessage = ({ address, chainId }, signup) => {
    const data = JSON.stringify({
      domain: {
        chainId,
        name: 'Sign up',
        verifyingContract: URL,
        version: '1',
      },
      message: {
        1: "Hello, please sign this message to confirm your ownership of the wallet."
      },
      primaryType: 'EIP712Domain',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'string' },
        ]
      }
    });
    
    ethereum.sendAsync({
      method: 'eth_signTypedData_v4',
      params: [address, data],
      from: address,
    }, async (err, result) => {
      if (err) return;
      
      const jwt = await authApi.walletAuth(result.result, data)
      if (jwt) {
        if (signup === true) {
          player.signup(jwt)
        } else {
          player.getPlayerInfo(jwt)
        }
      }
    })
  }
  
  return (
    <ConnectorContext.Provider
      value={{
        connectWallet,
        setConnectDialog,
      }}
    >
      {children}
      <MetaMaskDialog open={metaMaskDialog} close={() => setMetaMaskDialog(false)} />
      <ConnectDialog open={connectDialog.show} signup={connectDialog.signup} close={() => setConnectDialog({ show: false, signup: false })} />
    </ConnectorContext.Provider>
  );
};