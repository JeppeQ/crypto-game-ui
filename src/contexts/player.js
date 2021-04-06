import React, { createContext, useState, useEffect } from "react"

import { SignedUpDialog } from '../components/dialogs/signedUpDialog' 
import * as playerApi from '../api/player'
import * as holdingApi from '../api/holding'

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [info, setInfo] = useState({ cash: 0, rank: 0 })
  const [holdings, setHoldings] = useState([])
  const [assetValue, setAssetValue] = useState(0)
  const [assetsLoading, loadAssets] = useState(true)
  const [emailDialog, showEmailDialog] = useState(false)

  useEffect(() => {
    update()
    // eslint-disable-next-line
  }, [])

  const update = () => {
    getPlayerInfo()
    getHoldings()
  }

  const getPlayerInfo = async (jwt) => {
    const player = await playerApi.me(jwt)
    if (player) {
      setInfo({...info, ...player})
    }
  }

  const getHoldings = async () => {
    loadAssets(true)
    const holdings = await holdingApi.me()
    if (holdings) {
      setHoldings(holdings)
      setAssetValue(holdings.reduce((a, b) => a + (b.value || 0), 0))
    }
    loadAssets(false)
  }

  const signup = async (jwt) => {
    const player = await playerApi.signup(jwt)
    if (player) {
      setInfo(player)
      showEmailDialog(true)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        info,
        holdings,
        assetValue,
        signup,
        update,
        getPlayerInfo,
        getHoldings,
        assetsLoading
      }}
    >
      {children}
      <SignedUpDialog open={emailDialog} close={() => showEmailDialog(false)} />
    </PlayerContext.Provider>
  );
};