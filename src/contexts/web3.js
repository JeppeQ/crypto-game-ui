import React, { createContext, useContext } from "react"
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import { PlayerContext } from './player'
import * as playerApi from '../api/player'

function initWeb3(provider) {
  const web3 = new Web3(provider);

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

const providerOptions = {}

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions,
  theme: 'dark'
})

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const player = useContext(PlayerContext)

  const connect = async (signup = false) => {
    const provider = await web3Modal.connect()

    const web3 = initWeb3(provider)
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.chainId()

    signMessage({ web3, address: accounts[0], chainId }, signup)
  }

  const signMessage = ({ web3, address, chainId }, signup) => {
    const data = JSON.stringify({
      domain: {
        chainId,
        name: 'Sign up',
        verifyingContract: 'http://localhost',
        version: '1',
      },
      message: {
        1: "Hi, sign this message to verify your identity!"
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
        if (signup) {
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
    </Web3Context.Provider>
  );
};