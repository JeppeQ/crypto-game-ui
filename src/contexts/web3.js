import React, { createContext, useContext, useState } from "react"
import ReactGA from 'react-ga'
import { isMobile } from "react-device-detect"

import { PlayerContext } from './player'
import { MetaMaskDialog } from '../components/dialogs/metamaskDialog'
import { MobileSignupDialog } from '../components/dialogs/mobileSignupDialog'
import * as playerApi from '../api/player'
import { URL } from '../api'

const ethereum = window.ethereum

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const player = useContext(PlayerContext)
  const [metaMaskDialog, setMetaMaskDialog] = useState(false)
  const [mobileSignupDialog, setMobileSignupDialog] = useState(false)

  const connect = async (signup = false) => {
    if (!ethereum) {
      if (isMobile) {
        setMobileSignupDialog(true)
        return
      }

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
      
      const jwt = await playerApi.authenticate(result.result, data)
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
    <Web3Context.Provider
      value={{
        connect,
      }}
    >
      {children}
      <MetaMaskDialog open={metaMaskDialog} close={() => setMetaMaskDialog(false)} />
      <MobileSignupDialog open={mobileSignupDialog} close={() => setMobileSignupDialog(false)} />
    </Web3Context.Provider>
  );
};