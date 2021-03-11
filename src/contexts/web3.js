import React, { createContext, useState, useEffect } from "react"
import Web3 from 'web3'
import Web3Modal from 'web3modal'

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
  const [web3, setWeb3] = useState()
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [chainId, setChainId] = useState(1)
  const [networkId, setNetworkId] = useState(1)
  const [provider, setProvider] = useState()

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [])

  const subscribeProvider = async (provider) => {
    if (!provider.on) {
      return
    }

    provider.on("accountsChanged", async (accounts) => {
      await setAddress(accounts[0])
    })
  
    provider.on("chainChanged", async (chainId) => {
      const networkId = await web3.eth.net.getId()
      await setChainId(chainId)
      await setNetworkId(networkId)
    })

    provider.on("networkChanged", async (networkId) => {
      const chainId = await web3.eth.chainId()
      await setChainId(chainId)
      await setNetworkId(networkId)
    });
  }

  const connect = async () => {
    const provider = await web3Modal.connect()

    subscribeProvider(provider)

    const web3 = initWeb3(provider)
    const accounts = await web3.eth.getAccounts()
    const networkId = await web3.eth.net.getId()
    const chainId = await web3.eth.chainId()

    setWeb3(web3)
    setAddress(accounts[0])
    setChainId(chainId)
    setNetworkId(networkId)
    setConnected(true)
    setProvider(provider)
  }

  const signup = async () => {
    if (!web3) {
      await connect()
    }

    const message = "Hi, join the contest and compete for a prize!"
    const hexMsg = convertUtf8ToHex(message);

    const result = await web3.eth.personal.sign(hexMsg, address);
    // // verify signature
    // const signer = recoverPersonalSignature(result, message);
    // const verified = signer.toLowerCase() === address.toLowerCase();

  }

  return (
    <Web3Context.Provider
      value={{
        web3,
        address,
        connect,
        signup
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};