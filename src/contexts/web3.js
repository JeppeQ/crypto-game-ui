import React, { createContext, useContext, useState } from "react"
import Web3 from 'web3'

import { PlayerContext } from './player'
import { MetaMaskDialog } from '../components/dialogs/metamaskDialog' 
import * as playerApi from '../api/player'
import { URL } from '../api'

function initWeb3() {
  const web3 = new Web3(window.ethereum);

  window.ethereum.enable()

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });

  return web3
}

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const player = useContext(PlayerContext)
  const [metaMaskDialog, setMetaMaskDialog] = useState(false)

  const connect = async (signup = false) => {
    if (!window.ethereum) {
      setMetaMaskDialog(true)
      return
    }

    const web3 = initWeb3()
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.chainId()

    signMessage({ web3, address: accounts[0], chainId }, signup)
  }

  const signMessage = ({ web3, address, chainId }, signup) => {
    const data = JSON.stringify({
      domain: {
        chainId,
        name: 'Sign up',
        verifyingContract: URL,
        version: '1',
      },
      message: {
        1: "Hello, please sign this message to verify your ownership of the wallet."
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
    
    web3.currentProvider.send({
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
    </Web3Context.Provider>
  );
};